import React from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import { CaretLeft, Clock, Lightning, CalendarCheck, Key, House, Buildings } from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';
import VotingStatus from '../Voting/VotingStatus';

export default function PollHeader({ poll, onBack }) {
  const isEvent = poll.itemType === 'EVENT';

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
      {/* Top Title Bar: Height 80px (Exact 1:1 match with VotingHeader) */}
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
            '&:hover': {
              backgroundColor: 'transparent',
              opacity: 0.75,
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
          Details Voting
        </Typography>
      </Box>

      {/* Header Body: pt: 0 (Exact 1:1 match with VotingFilter spacing) */}
      <Box sx={{ px: 2.5, pt: 0, pb: 2.5 }}>
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
              mb: 1,
              lineHeight: 1.45,
            }}
          >
            {poll.description}
          </Typography>
        )}

        {/* Dedicated Deadline / Period Row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            pt: 0.5,
            mt: 0,
          }}
        >
          <Clock size={19} color="#27b29b" weight="bold" />
          <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontWeight: 500, fontSize: '0.825rem' }}>
            Deadline:
          </Typography>
          <Typography variant="body2" sx={{ color: prelineColors.slate[700], fontWeight: 600, fontSize: '0.85rem' }}>
            {poll.deadline}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
