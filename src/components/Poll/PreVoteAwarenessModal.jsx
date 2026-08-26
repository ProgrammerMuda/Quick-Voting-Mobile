import React from 'react';
import { Box, Typography, Button, Slide, Backdrop, IconButton, Chip } from '@mui/material';
import { X, Users, User, Info, ArrowRight, Key } from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';
import { VotingModel } from '../../models/VotingModel';

export default function PreVoteAwarenessModal({
  open,
  onClose,
  onOpenDelegation,
  onContinueAsOwner,
  poll,
}) {
  if (!poll) return null;

  const unitsList = VotingModel.getUnitsList(poll);
  const summary = VotingModel.getRepresentationSummary(unitsList);
  const delegableUnits = unitsList.filter(
    (u) => u.tenant && u.tenant.relationType !== 'SELF' && !u.hasVoted
  );
  const selfOccupiedCount = unitsList.filter(
    (u) => u.tenant?.relationType === 'SELF'
  ).length;

  return (
    <>
      {/* Backdrop */}
      <Backdrop
        open={open}
        onClick={onClose}
        sx={{
          zIndex: 55,
          backgroundColor: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(3px)',
        }}
      />

      {/* Bottom Sheet Slide Container */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            maxWidth: 480,
            mx: 'auto',
            maxHeight: '90vh',
            overflowY: 'auto',
            zIndex: 60,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            p: 3,
            pt: 1.5,
            pb: 3.5,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* Top Drag Handle */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.25 }}>
            <Box
              sx={{
                width: 38,
                height: 4,
                borderRadius: 2,
                backgroundColor: prelineColors.slate[300],
              }}
            />
          </Box>

          {/* Header Row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pb: 1.5,
              mb: 2,
              borderBottom: `1px solid ${prelineColors.slate[100]}`,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: prelineColors.slate[800],
                fontSize: '1rem',
              }}
            >
              Voting Representation Notice
            </Typography>

            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                color: prelineColors.slate[400],
                p: 0.5,
                '&:hover': { color: prelineColors.slate[700] },
              }}
            >
              <X size={18} weight="bold" />
            </IconButton>
          </Box>

          {/* Notice Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                backgroundColor: 'rgba(39, 178, 155, 0.1)',
                border: '1px solid rgba(39, 178, 155, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Users size={24} color="#0d9488" weight="fill" />
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: prelineColors.slate[800],
                  fontSize: '0.95rem',
                  lineHeight: 1.25,
                }}
              >
                Want Your Residents to Vote?
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: prelineColors.slate[500],
                  fontSize: '0.75rem',
                  display: 'block',
                  mt: 0.25,
                }}
              >
                You can delegate voting rights per unit or vote for all units yourself.
              </Typography>
            </Box>
          </Box>

          {/* Scalable 2-Column Summary Cards (Clean for any number of units) */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 1.25,
              mb: 2,
            }}
          >
            {/* Total Units Owned */}
            <Box
              sx={{
                p: 1.5,
                borderRadius: '12px',
                backgroundColor: prelineColors.slate[50],
                border: `1px solid ${prelineColors.slate[200]}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.25,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                <User size={15} color="#0d9488" weight="bold" />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: prelineColors.slate[600], fontSize: '0.725rem' }}
                >
                  Total Owned
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: prelineColors.slate[800], fontSize: '0.95rem' }}
              >
                {summary.totalUnits} Units
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: prelineColors.slate[500], fontSize: '0.675rem' }}
              >
                {summary.totalNpp}% NPP Total
              </Typography>
            </Box>

            {/* Units with Residents */}
            <Box
              sx={{
                p: 1.5,
                borderRadius: '12px',
                backgroundColor: prelineColors.slate[50],
                border: `1px solid ${prelineColors.slate[200]}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.25,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                <Users size={15} color="#0d9488" weight="bold" />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: prelineColors.slate[600], fontSize: '0.725rem' }}
                >
                  Unit Residents
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: prelineColors.slate[800], fontSize: '0.95rem' }}
              >
                {delegableUnits.length} Units
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: prelineColors.slate[500], fontSize: '0.675rem' }}
              >
                Eligible to delegate
              </Typography>
            </Box>
          </Box>

          {/* Informational Guidance Box */}
          <Box
            sx={{
              p: 1.5,
              backgroundColor: 'rgba(39, 178, 155, 0.06)',
              border: '1px solid rgba(39, 178, 155, 0.2)',
              borderRadius: '12px',
              mb: 2.5,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            <Info size={18} color="#0d9488" weight="fill" style={{ flexShrink: 0, marginTop: 1 }} />
            <Typography
              variant="caption"
              sx={{
                color: '#0f766e',
                fontSize: '0.75rem',
                lineHeight: 1.45,
              }}
            >
              By default, all your units are voted by you as the <strong>Owner</strong>. You can choose to delegate representation now, or change it anytime via the <strong>Manage</strong> button before submitting.
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="contained"
              disableElevation
              fullWidth
              onClick={onOpenDelegation}
              startIcon={<Users size={18} weight="bold" />}
              sx={{
                py: 1.25,
                borderRadius: '12px',
                backgroundColor: '#27b29b',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.875rem',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#27b29b',
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: '#1e8f7c',
                },
              }}
            >
              Manage Delegation
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={onContinueAsOwner}
              startIcon={<Key size={17} weight="bold" />}
              sx={{
                py: 1.15,
                borderRadius: '12px',
                borderColor: prelineColors.slate[300],
                color: prelineColors.slate[700],
                fontWeight: 600,
                fontSize: '0.85rem',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: prelineColors.slate[50],
                  borderColor: prelineColors.slate[400],
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: prelineColors.slate[100],
                },
              }}
            >
              Continue as Owner (All Units)
            </Button>
          </Box>
        </Box>
      </Slide>
    </>
  );
}

