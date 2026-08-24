import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Button,
  Slide,
  Backdrop,
} from '@mui/material';
import {
  X,
  User,
  Users,
  Check,
  ShieldCheck,
  HouseLine,
  Heart,
  Briefcase,
  Key,
  CheckCircle,
} from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';
import { VotingModel } from '../../models/VotingModel';

// Helper for occupant role badge styling (Owner & Tenant Members: Penyewa, Anak, Suami/Istri, Karyawan, Keluarga)
function getResidentBadge(tenant) {
  if (!tenant) return null;
  const rel = (tenant.relationType || '').toUpperCase();

  if (rel === 'SELF') {
    return {
      label: 'Dihuni Sendiri',
      category: 'Owner',
      bg: 'rgba(16, 185, 129, 0.1)',
      color: '#059669',
      border: 'rgba(16, 185, 129, 0.25)',
    };
  }

  let label = 'Penyewa';
  if (rel === 'CHILD' || rel === 'ANAK') label = 'Anak';
  else if (rel === 'SPOUSE' || rel === 'PASANGAN' || rel === 'SUAMI/ISTRI') label = 'Suami / Istri';
  else if (rel === 'EMPLOYEE' || rel === 'KARYAWAN') label = 'Karyawan';
  else if (rel === 'FAMILY' || rel === 'KELUARGA') label = 'Keluarga';
  else if (rel === 'RENTER' || rel === 'TENANT' || rel === 'PENYEWA') label = 'Penyewa';

  return {
    label,
    category: 'Tenant Member',
    bg: prelineColors.slate[100],
    color: prelineColors.slate[700],
    border: prelineColors.slate[200],
  };
}

export default function UnitDelegationModal({
  open,
  onClose,
  poll,
  onSaveRepresentation,
}) {
  const initialUnits = VotingModel.getUnitsList(poll);
  const [localUnits, setLocalUnits] = useState(initialUnits);

  // Sync state on modal open
  useEffect(() => {
    if (open) {
      setLocalUnits(VotingModel.getUnitsList(poll));
    }
  }, [open, poll]);

  // Toggle single unit representation (except self-occupied which is locked to Owner)
  const handleToggleUnit = (unitNo, representedBy) => {
    setLocalUnits((prev) =>
      prev.map((u) => {
        if (u.unitNo === unitNo) {
          if (u.tenant?.relationType === 'SELF') {
            return { ...u, representedBy: 'OWNER' };
          }
          return { ...u, representedBy };
        }
        return u;
      })
    );
  };

  // Bulk set all to Owner
  const handleSetAllOwner = () => {
    setLocalUnits((prev) => prev.map((u) => ({ ...u, representedBy: 'OWNER' })));
  };

  // Bulk set all to Tenant (except self-occupied units)
  const handleSetAllTenant = () => {
    setLocalUnits((prev) =>
      prev.map((u) => ({
        ...u,
        representedBy: u.tenant?.relationType === 'SELF' ? 'OWNER' : 'TENANT',
      }))
    );
  };

  // Calculate live summary
  const totalUnits = localUnits.length;
  const ownerUnits = localUnits.filter((u) => u.representedBy === 'OWNER');
  const tenantUnits = localUnits.filter((u) => u.representedBy === 'TENANT');

  const ownerNpp = ownerUnits.reduce((acc, u) => acc + (parseFloat(u.npp) || 0), 0).toFixed(2);
  const tenantNpp = tenantUnits.reduce((acc, u) => acc + (parseFloat(u.npp) || 0), 0).toFixed(2);

  const handleSave = () => {
    if (onSaveRepresentation) {
      onSaveRepresentation(localUnits);
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <Backdrop
        open={open}
        onClick={onClose}
        sx={{
          zIndex: 55,
          backgroundColor: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Slide-Up Bottom Sheet */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%) !important',
            width: '100%',
            maxWidth: 480,
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 60,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            boxShadow: '0 -10px 40px rgba(0,0,0,0.2)',
            overflow: 'hidden',
          }}
        >
          {/* Top Drag Handle */}
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.5, pb: 0.5 }}>
            <Box
              sx={{
                width: 44,
                height: 5,
                borderRadius: 3,
                backgroundColor: prelineColors.slate[300],
              }}
            />
          </Box>

          {/* Modal Header */}
          <Box
            sx={{
              px: 2.5,
              pt: 1,
              pb: 1.75,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: `1px solid ${prelineColors.slate[100]}`,
            }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: prelineColors.slate[800],
                  lineHeight: 1.2,
                }}
              >
                Unit Voting Representation
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: prelineColors.slate[500], fontSize: '0.75rem', display: 'block', mt: 0.25 }}
              >
                Configure voting representation for each of your units
              </Typography>
            </Box>

            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                color: prelineColors.slate[400],
                '&:hover': { color: prelineColors.slate[700], backgroundColor: prelineColors.slate[100] },
              }}
            >
              <X size={20} weight="bold" />
            </IconButton>
          </Box>

          {/* Scrollable Content */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 2.5,
              py: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {/* Live Summary Metric Tiles */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 1.5,
              }}
            >
              {/* Owner Metric Box */}
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: '12px',
                  backgroundColor: prelineColors.slate[50],
                  border: `1px solid ${prelineColors.slate[200]}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <User size={16} color="#0d9488" weight="bold" />
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 600, color: prelineColors.slate[700], fontSize: '0.75rem' }}
                    >
                      Owner Vote
                    </Typography>
                  </Box>
                  <Chip
                    label={`${ownerUnits.length} ${ownerUnits.length > 1 ? 'Units' : 'Unit'}`}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      backgroundColor: prelineColors.slate[200],
                      color: prelineColors.slate[700],
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: prelineColors.slate[500], fontSize: '0.725rem' }}
                >
                  NPP Weight: <strong>{ownerNpp}%</strong>
                </Typography>
              </Box>

              {/* Resident Metric Box */}
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: '12px',
                  backgroundColor: prelineColors.slate[50],
                  border: `1px solid ${prelineColors.slate[200]}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Users size={16} color="#2563eb" weight="bold" />
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 600, color: prelineColors.slate[700], fontSize: '0.75rem' }}
                    >
                      Resident Vote
                    </Typography>
                  </Box>
                  <Chip
                    label={`${tenantUnits.length} ${tenantUnits.length > 1 ? 'Units' : 'Unit'}`}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      backgroundColor: prelineColors.slate[200],
                      color: prelineColors.slate[700],
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: prelineColors.slate[500], fontSize: '0.725rem' }}
                >
                  NPP Weight: <strong>{tenantNpp}%</strong>
                </Typography>
              </Box>
            </Box>

            {/* Quick Action Shortcut Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="caption"
                sx={{ color: prelineColors.slate[500], fontWeight: 600, fontSize: '0.75rem' }}
              >
                Quick Actions:
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={handleSetAllOwner}
                startIcon={<User size={14} weight="bold" />}
                sx={{
                  py: 0.5,
                  px: 1.25,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '100px',
                  border: `1px solid ${prelineColors.slate[300]}`,
                  color: prelineColors.slate[700],
                  backgroundColor: '#ffffff',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#27b29b',
                    color: '#1e8f7c',
                    backgroundColor: 'rgba(39, 178, 155, 0.05)',
                  },
                }}
              >
                All Owner
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleSetAllTenant}
                startIcon={<Users size={14} weight="bold" />}
                sx={{
                  py: 0.5,
                  px: 1.25,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '100px',
                  border: `1px solid ${prelineColors.slate[300]}`,
                  color: prelineColors.slate[700],
                  backgroundColor: '#ffffff',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#2563eb',
                    color: '#2563eb',
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                  },
                }}
              >
                All Residents
              </Button>
            </Box>

            {/* Unit List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: prelineColors.slate[500],
                }}
              >
                Select Voting Representative for Each Unit ({totalUnits} Units):
              </Typography>

              {localUnits.map((u, idx) => {
                const isOwner = u.representedBy === 'OWNER';
                const isSelfOccupied = u.tenant?.relationType === 'SELF';
                const residentBadge = getResidentBadge(u.tenant);
                const shortName = u.tenant?.name ? u.tenant.name.split(' ')[0] : 'Resident';

                return (
                  <Box
                    key={u.id || u.unitNo || idx}
                    sx={{
                      p: 1.75,
                      borderRadius: '16px',
                      backgroundColor: '#ffffff',
                      border: `1.5px solid ${isOwner ? 'rgba(39, 178, 155, 0.35)' : 'rgba(59, 130, 246, 0.35)'}`,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.25,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {/* Unit Info Row */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: '10px',
                            backgroundColor: isOwner ? 'rgba(39, 178, 155, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                            border: `1px solid ${isOwner ? 'rgba(39, 178, 155, 0.25)' : 'rgba(59, 130, 246, 0.25)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <HouseLine size={18} color={isOwner ? '#0d9488' : '#2563eb'} weight="fill" />
                        </Box>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 700,
                                color: prelineColors.slate[800],
                                fontSize: '0.9rem',
                              }}
                            >
                              Unit {u.unitNo}
                            </Typography>
                            <Chip
                              label={`${u.npp}% NPP`}
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                backgroundColor: isOwner ? 'rgba(39, 178, 155, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                color: isOwner ? '#0d9488' : '#2563eb',
                              }}
                            />
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{ color: prelineColors.slate[500], fontSize: '0.75rem' }}
                          >
                            {u.tower} • {u.floor}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Current Status Pill */}
                      <Chip
                        icon={
                          isOwner ? (
                            <User size={13} color="#0d9488" weight="bold" />
                          ) : (
                            <Users size={13} color="#2563eb" weight="bold" />
                          )
                        }
                        label={isOwner ? 'Owner Vote' : 'Resident Vote'}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: '0.675rem',
                          fontWeight: 600,
                          backgroundColor: isOwner ? 'rgba(39, 178, 155, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                          color: isOwner ? '#0d9488' : '#2563eb',
                          border: `1px solid ${isOwner ? 'rgba(39, 178, 155, 0.25)' : 'rgba(59, 130, 246, 0.25)'}`,
                          '& .MuiChip-label': { px: 0.75 },
                        }}
                      />
                    </Box>

                    {/* Voter Representative Box */}
                    {u.tenant && (() => {
                      const voterName = isOwner ? 'Rian Pratama' : u.tenant.name;
                      const voterStatus = isOwner
                        ? isSelfOccupied
                          ? 'Owner & Resident'
                          : 'Owner'
                        : (u.tenant.status || 'Resident');
                      const voterBadge = isOwner
                        ? {
                            label: isSelfOccupied ? 'Dihuni Sendiri' : 'Owner',
                            bg: 'rgba(16, 185, 129, 0.1)',
                            color: '#059669',
                            border: 'rgba(16, 185, 129, 0.25)',
                          }
                        : residentBadge;
                      const voterInitial = isOwner ? 'R' : u.tenant.name.charAt(0);

                      return (
                        <Box
                          sx={{
                            px: 1.25,
                            py: 0.9,
                            borderRadius: '10px',
                            backgroundColor: isOwner ? 'rgba(16, 185, 129, 0.04)' : prelineColors.slate[50],
                            border: `1px solid ${isOwner ? 'rgba(16, 185, 129, 0.2)' : prelineColors.slate[200]}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 1,
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 700, color: prelineColors.slate[800], fontSize: '0.825rem', lineHeight: 1.2 }}
                            >
                              {voterName}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: prelineColors.slate[500], fontSize: '0.7rem' }}
                            >
                              {voterStatus}
                            </Typography>
                          </Box>

                          {voterBadge && (
                            <Chip
                              label={voterBadge.label}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: '0.675rem',
                                fontWeight: 600,
                                backgroundColor: voterBadge.bg,
                                color: voterBadge.color,
                                border: `1px solid ${voterBadge.border}`,
                                '& .MuiChip-label': { px: 0.8 },
                              }}
                            />
                          )}
                        </Box>
                      );
                    })()}

                    {/* CASE 1: SELF-OCCUPIED UNIT */}
                    {isSelfOccupied ? (
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#059669',
                          fontSize: '0.725rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          px: 0.5,
                        }}
                      >
                        <CheckCircle size={14} color="#059669" weight="fill" />
                        Automatically voted by you as owner and resident.
                      </Typography>
                    ) : (
                      /* CASE 2: DELEGABLE UNITS */
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            p: 0.5,
                            backgroundColor: prelineColors.slate[100],
                            borderRadius: '10px',
                            gap: 0.5,
                          }}
                        >
                          {/* Option 1: Owner */}
                          <Box
                            onClick={() => handleToggleUnit(u.unitNo, 'OWNER')}
                            sx={{
                              py: 0.85,
                              px: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 0.6,
                              borderRadius: '8px',
                              cursor: 'pointer',
                              backgroundColor: isOwner ? '#ffffff' : 'transparent',
                              boxShadow: isOwner ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                              color: isOwner ? '#0d9488' : prelineColors.slate[500],
                              fontWeight: isOwner ? 700 : 500,
                              transition: 'all 0.15s ease',
                              '&:active': {
                                transform: 'scale(0.98)',
                              },
                            }}
                          >
                            <User size={15} weight={isOwner ? 'fill' : 'bold'} />
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: isOwner ? 700 : 500,
                                fontSize: '0.75rem',
                              }}
                            >
                              Owner Vote
                            </Typography>
                          </Box>

                          {/* Option 2: Resident */}
                          <Box
                            onClick={() => handleToggleUnit(u.unitNo, 'TENANT')}
                            sx={{
                              py: 0.85,
                              px: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 0.6,
                              borderRadius: '8px',
                              cursor: 'pointer',
                              backgroundColor: !isOwner ? '#ffffff' : 'transparent',
                              boxShadow: !isOwner ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                              color: !isOwner ? '#2563eb' : prelineColors.slate[500],
                              fontWeight: !isOwner ? 700 : 500,
                              transition: 'all 0.15s ease',
                              '&:active': {
                                transform: 'scale(0.98)',
                              },
                            }}
                          >
                            <Users size={15} weight={!isOwner ? 'fill' : 'bold'} />
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: !isOwner ? 700 : 500,
                                fontSize: '0.75rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              Resident Vote
                            </Typography>
                          </Box>
                        </Box>

                        <Typography
                          variant="caption"
                          sx={{
                            color: isOwner ? '#0d9488' : '#2563eb',
                            fontSize: '0.7rem',
                            fontWeight: 500,
                            px: 0.5,
                          }}
                        >
                          {isOwner
                            ? `✓ Vote will be cast by Rian Pratama (Owner).`
                            : `✓ Vote will be cast by ${u.tenant.name} (${residentBadge ? residentBadge.label : 'Resident'}).`}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>

            {/* Governance Info Alert */}
            <Box
              sx={{
                p: 1.5,
                backgroundColor: 'rgba(59, 130, 246, 0.06)',
                border: '1px solid rgba(59, 130, 246, 0.18)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.25,
              }}
            >
              <ShieldCheck size={22} color="#2563eb" weight="fill" style={{ flexShrink: 0, marginTop: 1 }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: '#1e40af',
                    fontSize: '0.75rem',
                    display: 'block',
                    mb: 0.25,
                  }}
                >
                  Voting Rights Rule: 1 Unit = 1 Representative
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: '#1d4ed8', fontSize: '0.72rem', lineHeight: 1.4 }}
                >
                  Self-occupied units are automatically voted by you. For other units, you can choose whether the vote is cast directly by you (Owner) or delegated to the respective resident.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Bottom Action Footer */}
          <Box
            sx={{
              p: 2,
              px: 2.5,
              borderTop: `1px solid ${prelineColors.slate[200]}`,
              backgroundColor: '#ffffff',
              display: 'flex',
              gap: 1.25,
            }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                flex: 1,
                py: 1.2,
                borderRadius: '10px',
                borderColor: prelineColors.slate[300],
                color: prelineColors.slate[700],
                fontWeight: 600,
                fontSize: '0.85rem',
                textTransform: 'none',
                '&:active': {
                  backgroundColor: prelineColors.slate[100],
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSave}
              startIcon={<Check size={18} weight="bold" />}
              sx={{
                flex: 2,
                py: 1.2,
                borderRadius: '10px',
                backgroundColor: '#27b29b',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.85rem',
                textTransform: 'none',
                boxShadow: '0 2px 8px rgba(39, 178, 155, 0.3)',
                '&:active': {
                  backgroundColor: '#1e8f7c',
                },
              }}
            >
              Save Representation
            </Button>
          </Box>
        </Box>
      </Slide>
    </>
  );
}
