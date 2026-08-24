import React from 'react';
import { Box, Typography, Button, Slide, Backdrop, Divider, Chip } from '@mui/material';
import { House, Info, X, User, Users, HouseLine } from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';
import { DEFAULT_USER_UNITS } from '../../mock/votingData';

export default function NppDetailModal({ open, onClose, userUnit }) {
  const units = userUnit?.unitsList || DEFAULT_USER_UNITS;

  const totalNpp = units.reduce((sum, u) => sum + (parseFloat(u.npp) || 0.14), 0).toFixed(2);
  const totalUnits = units.length;

  const ownerUnits = units.filter((u) => u.representedBy === 'OWNER');
  const tenantUnits = units.filter((u) => u.representedBy === 'TENANT');

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

      {/* Bottom Sheet Slide */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%) !important',
            width: '100%',
            maxWidth: 480,
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 60,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            px: 3,
            pt: 1.5,
            pb: 4,
            boxShadow: '0 -8px 30px rgba(0,0,0,0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Top Drag Handle */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 5,
                borderRadius: 3,
                backgroundColor: prelineColors.slate[300],
              }}
            />
          </Box>

          {/* Header Title & Close Button */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: prelineColors.slate[800], lineHeight: 1.25 }}>
                Unit Details & Voting Weight (NPP)
              </Typography>
              <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontSize: '0.75rem' }}>
                Ownership Status, Tenant Member Representation & NPP
              </Typography>
            </Box>

            <Button
              onClick={onClose}
              sx={{
                minWidth: 'auto',
                p: 0.75,
                color: prelineColors.slate[400],
                borderRadius: '50%',
                '&:hover': { backgroundColor: prelineColors.slate[100] },
              }}
            >
              <X size={20} weight="bold" />
            </Button>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', pr: 0.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Total Summary Banner */}
            <Box
              sx={{
                p: 2,
                backgroundColor: 'rgba(39, 178, 155, 0.08)',
                border: '1px solid rgba(39, 178, 155, 0.2)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontWeight: 500, fontSize: '0.725rem', display: 'block', mb: 0.25 }}>
                  Total Registered Units
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: prelineColors.slate[800], fontSize: '1rem' }}>
                  {totalUnits} {totalUnits > 1 ? 'Units' : 'Unit'}
                </Typography>
              </Box>

              <Divider orientation="vertical" flexItem sx={{ my: 0.5, borderColor: 'rgba(39, 178, 155, 0.2)' }} />

              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontWeight: 500, fontSize: '0.725rem', display: 'block', mb: 0.25 }}>
                  Total NPP Weight
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#27b29b', fontSize: '1.05rem' }}>
                  {totalNpp}% NPP
                </Typography>
              </Box>
            </Box>

            {/* Units Breakdown List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: prelineColors.slate[600], fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Registered Units Breakdown:
              </Typography>

              {units.map((u, idx) => {
                const isOwner = u.representedBy === 'OWNER';
                return (
                  <Box
                    key={idx}
                    sx={{
                      p: 1.5,
                      backgroundColor: prelineColors.slate[50],
                      border: `1px solid ${prelineColors.slate[200]}`,
                      borderRadius: '12px',
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
                          borderRadius: '8px',
                          backgroundColor: '#ffffff',
                          border: `1px solid ${prelineColors.slate[200]}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <HouseLine size={18} color="#27b29b" weight="fill" />
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: prelineColors.slate[800], fontSize: '0.875rem' }}>
                            Unit {u.unitNo}
                          </Typography>
                          <Chip
                            icon={isOwner ? <User size={12} color="#1e8f7c" /> : <Users size={12} color="#2563eb" />}
                            label={isOwner ? 'Owner' : `Tenant Member: ${u.tenant?.name || 'Resident'} (${u.tenant?.roleLabel || 'Resident'})`}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: '0.65rem',
                              fontWeight: 600,
                              backgroundColor: isOwner ? 'rgba(39, 178, 155, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                              color: isOwner ? '#1e8f7c' : '#2563eb',
                            }}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontSize: '0.75rem' }}>
                          {u.tower} • {u.floor}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#27b29b', fontSize: '0.9rem' }}>
                        {u.npp}% NPP
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', color: prelineColors.slate[400], fontSize: '0.7rem' }}>
                        Voting Weight
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Info Note */}
            <Box
              sx={{
                p: 1.5,
                backgroundColor: 'rgba(59, 130, 246, 0.07)',
                border: '1px solid rgba(59, 130, 246, 0.18)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
              }}
            >
              <Info size={20} color="#2563eb" weight="fill" style={{ flexShrink: 0, marginTop: 1 }} />
              <Typography variant="caption" sx={{ color: '#1d4ed8', fontSize: '0.725rem', lineHeight: 1.4 }}>
                In ownership-weighted voting (NPP), your voting power is calculated from the cumulative percentage of NPP across all units you directly represent as the owner.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Slide>
    </>
  );
}
