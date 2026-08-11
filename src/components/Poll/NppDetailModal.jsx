import React from 'react';
import { Box, Typography, Button, Slide, Backdrop, Divider } from '@mui/material';
import { House, Info, X } from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';

export default function NppDetailModal({ open, onClose, userUnit }) {
  const units = userUnit?.unitsList || [
    { unitNo: 'A0101', tower: 'Tower A', floor: 'Floor 1', npp: 0.14 },
    { unitNo: 'A0102', tower: 'Tower A', floor: 'Floor 1', npp: 0.14 },
  ];

  const totalNpp = units.reduce((sum, u) => sum + (u.npp || 0.14), 0).toFixed(2);
  const totalUnits = units.length;

  return (
    <>
      {/* Backdrop */}
      <Backdrop
        open={open}
        onClick={onClose}
        sx={{
          zIndex: 45,
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          backdropFilter: 'blur(3px)',
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
            zIndex: 50,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            px: 3,
            pt: 1.5,
            pb: 3.5,
            boxShadow: '0 -8px 30px rgba(0,0,0,0.15)',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top Drag Handle */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: prelineColors.slate[300],
              }}
            />
          </Box>

          {/* Header Title & Close Button */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.05rem', color: prelineColors.slate[800], lineHeight: 1.25 }}>
                Unit & NPP Weight Breakdown
              </Typography>
              <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontSize: '0.75rem' }}>
                Proportional Ownership Voting Weight Detail
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

          {/* Total Summary Banner */}
          <Box
            sx={{
              p: 2,
              mb: 2.5,
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
                Registered Units
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: prelineColors.slate[800], fontSize: '1rem' }}>
                {totalUnits} Unit(s)
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ my: 0.5, borderColor: 'rgba(39, 178, 155, 0.2)' }} />

            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontWeight: 500, fontSize: '0.725rem', display: 'block', mb: 0.25 }}>
                Total NPP Voting Weight
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e8f7c', fontSize: '1.05rem' }}>
                {totalNpp}% NPP
              </Typography>
            </Box>
          </Box>

          {/* Scrollable Unit Breakdown List */}
          <Typography variant="caption" sx={{ fontWeight: 600, color: prelineColors.slate[600], fontSize: '0.775rem', mb: 1, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Units Represented:
          </Typography>

          <Box sx={{ overflowY: 'auto', flex: 1, maxHeight: 220, mb: 2.5, pr: 0.5 }}>
            {units.map((u, idx) => (
              <Box
                key={idx}
                sx={{
                  p: 1.5,
                  mb: 1.25,
                  backgroundColor: prelineColors.slate[50],
                  border: `1px solid ${prelineColors.slate[200]}`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:last-child': { mb: 0 },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      border: `1px solid ${prelineColors.slate[200]}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <House size={18} color="#27b29b" weight="fill" />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: prelineColors.slate[800], fontSize: '0.85rem' }}>
                      Unit No. {u.unitNo}
                    </Typography>
                    <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontSize: '0.725rem' }}>
                      {u.tower} • {u.floor}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#1e8f7c', fontSize: '0.825rem' }}>
                    {u.npp}% NPP
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: prelineColors.slate[400], fontSize: '0.675rem' }}>
                    Voting Weight
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Info Note */}
          <Box
            sx={{
              p: 1.25,
              mb: 2.5,
              backgroundColor: prelineColors.slate[100],
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            <Info size={18} color={prelineColors.slate[500]} weight="fill" style={{ flexShrink: 0, marginTop: 1 }} />
            <Typography variant="caption" sx={{ color: prelineColors.slate[600], fontSize: '0.725rem', lineHeight: 1.4 }}>
              In ownership-based voting, each vote is weighted proportionally based on the NPP percentage of units registered under the voter's name.
            </Typography>
          </Box>


        </Box>
      </Slide>
    </>
  );
}
