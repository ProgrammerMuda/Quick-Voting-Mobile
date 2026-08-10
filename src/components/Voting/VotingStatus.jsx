import React from 'react';
import { Chip, Box } from '@mui/material';
import { CheckCircle, CalendarBlank } from '@phosphor-icons/react';

export default function VotingStatus({ status }) {
  const normalizedStatus = (status || '').toLowerCase();

  switch (normalizedStatus) {
    case 'scheduled':
    case 'upcoming':
      return (
        <Chip
          icon={<CalendarBlank size={17} color="#ffffff" weight="fill" />}
          label="Scheduled"
          size="small"
          sx={{
            backgroundColor: '#8b5cf6',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.775rem',
            boxShadow: 'none',
            height: 30,
            px: 1,
            borderRadius: '100px',
            '& .MuiChip-icon': { color: '#ffffff', ml: 0.5 },
            '& .MuiChip-label': { px: 1.25 },
          }}
        />
      );

    case 'ongoing':
    case 'open':
      return (
        <Chip
          icon={
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.5, position: 'relative' }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.4)',
                  animation: 'pulse 1.6s infinite ease-in-out',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(0.9)',
                      boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)',
                    },
                    '70%': {
                      transform: 'scale(1)',
                      boxShadow: '0 0 0 6px rgba(255, 255, 255, 0)',
                    },
                    '100%': {
                      transform: 'scale(0.9)',
                      boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)',
                    },
                  },
                }}
              />
            </Box>
          }
          label="Ongoing"
          size="small"
          sx={{
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.775rem',
            boxShadow: 'none',
            height: 30,
            px: 1,
            borderRadius: '100px',
            '& .MuiChip-label': { px: 1.25 },
          }}
        />
      );

    case 'complete':
    case 'completed':
    case 'closed':
      return (
        <Chip
          icon={<CheckCircle size={17} color="#ffffff" weight="fill" />}
          label="Complete"
          size="small"
          sx={{
            backgroundColor: '#22c55e',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.775rem',
            boxShadow: 'none',
            height: 30,
            px: 1,
            borderRadius: '100px',
            '& .MuiChip-icon': { color: '#ffffff', ml: 0.5 },
            '& .MuiChip-label': { px: 1.25 },
          }}
        />
      );

    default:
      return null;
  }
}
