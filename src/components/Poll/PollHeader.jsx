import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import {
  CaretLeft,
  Clock,
  Lightning,
  CalendarCheck,
  HouseLine,
  CaretRight,
  SlidersHorizontal,
  Info,
  Lock,
} from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';
import VotingStatus from '../Voting/VotingStatus';
import { VotingModel } from '../../models/VotingModel';

export default function PollHeader({
  poll,
  onBack,
  onOpenDelegationModal,
}) {
  if (!poll) return null;
  const isEvent = poll.itemType === 'EVENT';
  const statusLower = (poll.status || '').toLowerCase();
  const isClosed = statusLower === 'closed' || statusLower === 'ended' || statusLower === 'cancelled' || statusLower === 'complete';
  // Delegation is available starting from scheduled / upcoming status up through ongoing / open status
  const canManageDelegation = !isClosed;
  const isReadOnly = !canManageDelegation;
  const isDelegationFinalized = Boolean(poll.isDelegationFinalized);

  const unitsList = VotingModel.getUnitsList(poll);
  const summary = VotingModel.getRepresentationSummary(unitsList);

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: `1px solid ${prelineColors.slate[200]}`,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* 1. CLEAN TITLE BAR (EXACT 1:1 MATCH WITH VOTINGHEADER) */}
      <Box
        sx={{
          height: 80,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        <IconButton
          onClick={onBack}
          size="small"
          disableRipple
          sx={{
            position: 'absolute',
            left: 16,
            color: prelineColors.slate[700],
            backgroundColor: 'transparent',
            p: 0.5,
            '&:active': {
              opacity: 0.7,
            },
          }}
        >
          <CaretLeft size={24} weight="bold" />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '1.25rem',
            color: prelineColors.slate[800],
            letterSpacing: '-0.02em',
            textAlign: 'center',
          }}
        >
          Voting Details
        </Typography>
      </Box>

      {/* 2. HEADER BODY */}
      <Box sx={{ px: 2.5, pt: 0, pb: 2.25 }}>
        {/* Badges Row (Type Pill + Status Pill) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, flexWrap: 'nowrap' }}>
          {isEvent ? (
            <Chip
              icon={<CalendarCheck size={18} color="#27b29b" weight="fill" />}
              label="Event Voting"
              size="small"
              sx={{
                backgroundColor: prelineColors.slate[100],
                color: prelineColors.slate[700],
                fontWeight: 600,
                fontSize: '0.75rem',
                borderRadius: '100px',
                px: 1,
                height: 30,
                border: `1px solid ${prelineColors.slate[200]}`,
                '& .MuiChip-label': { px: 1 },
              }}
            />
          ) : (
            <Chip
              icon={<Lightning size={18} color="#27b29b" weight="fill" />}
              label="Quick Voting"
              size="small"
              sx={{
                backgroundColor: prelineColors.slate[100],
                color: prelineColors.slate[700],
                fontWeight: 600,
                fontSize: '0.75rem',
                borderRadius: '100px',
                px: 1,
                height: 30,
                border: `1px solid ${prelineColors.slate[200]}`,
                '& .MuiChip-label': { px: 1 },
              }}
            />
          )}

          <VotingStatus status={poll.status} deadline={poll.deadline} />
        </Box>

        {/* Poll Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: prelineColors.slate[800],
            fontSize: '1.2rem',
            mb: 0.75,
            lineHeight: 1.3,
          }}
        >
          {poll.title}
        </Typography>

        {/* Poll Description */}
        {poll.description && (
          <Typography
            variant="body2"
            sx={{
              color: prelineColors.slate[600],
              fontSize: '0.85rem',
              mb: 1.5,
              lineHeight: 1.45,
            }}
          >
            {poll.description}
          </Typography>
        )}

        {/* Dedicated Deadline Row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1.75,
          }}
        >
          <Clock size={16} color="#d97706" weight="bold" />
          <Typography
            variant="caption"
            sx={{
              color: '#d97706',
              fontWeight: 600,
              fontSize: '0.75rem',
              backgroundColor: 'rgba(217, 119, 6, 0.1)',
              px: 0.75,
              py: 0.2,
              borderRadius: '6px',
            }}
          >
            {poll.deadline}
          </Typography>
        </Box>

        {/* ========================================================================= */}
        {/* CLEAN WHITE VOTING REPRESENTATION CARD (SLATE OUTLINE) */}
        {/* ========================================================================= */}
        <Box
          onClick={!isReadOnly && onOpenDelegationModal ? onOpenDelegationModal : undefined}
          sx={{
            p: 1.5,
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            border: `1px solid ${prelineColors.slate[200]}`,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            cursor: !isReadOnly ? 'pointer' : 'default',
            userSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.25,
            transition: 'all 0.15s ease',
            '&:active': !isReadOnly
              ? {
                  transform: 'scale(0.985)',
                  backgroundColor: prelineColors.slate[50],
                  borderColor: prelineColors.slate[300],
                }
              : {},
          }}
        >
          {/* Left: Icon + Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0, flex: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                backgroundColor: 'rgba(39, 178, 155, 0.1)',
                border: '1px solid rgba(39, 178, 155, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <HouseLine size={19} color="#27b29b" weight="fill" />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: prelineColors.slate[800],
                    fontSize: '0.875rem',
                    lineHeight: 1.2,
                  }}
                >
                  {summary.totalUnits} Units • {summary.totalNpp}% NPP
                </Typography>
              </Box>

              <Typography
                variant="caption"
                sx={{
                  color: prelineColors.slate[500],
                  fontSize: '0.725rem',
                  display: 'block',
                  lineHeight: 1.2,
                }}
              >
                {summary.ownerUnits === summary.totalUnits
                  ? 'All Owner Votes'
                  : summary.ownerUnits === 0
                  ? 'All Resident Votes'
                  : `${summary.ownerUnits} Owner • ${summary.tenantUnits} Resident`}
              </Typography>
            </Box>
          </Box>

          {/* Right: Action Button */}
          {!isReadOnly && (
            isDelegationFinalized ? (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.4,
                  px: 1.1,
                  py: 0.55,
                  borderRadius: '8px',
                  backgroundColor: prelineColors.slate[100],
                  border: `1px solid ${prelineColors.slate[200]}`,
                  color: prelineColors.slate[600],
                  flexShrink: 0,
                }}
              >
                <Lock size={12} weight="bold" color={prelineColors.slate[600]} />
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.725rem',
                    lineHeight: 1,
                    color: prelineColors.slate[600],
                  }}
                >
                  Finalized
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.35,
                  px: 1.25,
                  py: 0.6,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(39, 178, 155, 0.08)',
                  border: '1px solid rgba(39, 178, 155, 0.25)',
                  color: '#1e8f7c',
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    lineHeight: 1,
                    color: '#1e8f7c',
                  }}
                >
                  Manage
                </Typography>
                <CaretRight size={13} weight="bold" color="#1e8f7c" />
              </Box>
            )
          )}
        </Box>

        {/* Smart Hint Bar */}
        {!isReadOnly && (
          isDelegationFinalized ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
                mt: 1.25,
                py: 1.1,
                px: 1.5,
                borderRadius: '10px',
                backgroundColor: prelineColors.slate[100],
                border: `1px solid ${prelineColors.slate[200]}`,
              }}
            >
              <Lock size={16} color={prelineColors.slate[600]} weight="bold" style={{ flexShrink: 0, marginTop: 2 }} />
              <Typography
                variant="caption"
                sx={{
                  color: prelineColors.slate[600],
                  fontSize: '0.75rem',
                  lineHeight: 1.4,
                  fontWeight: 500,
                }}
              >
                Voting delegation is <strong>finalized</strong> for this session. Tap card to review representation.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
                mt: 1.25,
                py: 1.1,
                px: 1.5,
                borderRadius: '10px',
                backgroundColor: 'rgba(39, 178, 155, 0.08)',
                border: '1px solid rgba(39, 178, 155, 0.22)',
              }}
            >
              <Info size={18} color="#0d9488" weight="fill" style={{ flexShrink: 0, marginTop: 2 }} />
              <Typography
                variant="caption"
                sx={{
                  color: '#0f766e',
                  fontSize: '0.75rem',
                  lineHeight: 1.4,
                  fontWeight: 500,
                }}
              >
                Want your residents to vote? Tap <strong>Manage</strong> to delegate voting rights per unit, giving each resident a chance to participate.
              </Typography>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
}
