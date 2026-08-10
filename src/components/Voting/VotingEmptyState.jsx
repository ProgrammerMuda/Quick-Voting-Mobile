import React from 'react';
import { Box, Typography } from '@mui/material';
import { prelineColors } from '../../theme/theme';

export default function VotingEmptyState({ filter }) {
  const getFilterLabel = () => {
    if (filter === 'EVENT') return 'Event Voting';
    if (filter === 'POLL') return 'Quick Voting';
    return 'Voting';
  };

  const label = getFilterLabel();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        px: 3,
        py: 6,
        textAlign: 'center',
      }}
    >
      {/* Custom Empty State Illustration */}
      <Box
        component="img"
        src="/empty-voting.png"
        alt="No Voting Available"
        sx={{
          width: 280,
          height: 'auto',
          maxWidth: '95%',
          objectFit: 'contain',
          mb: 2.5,
          borderRadius: '16px',
        }}
      />

      {/* Title */}
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          color: prelineColors.slate[800],
          fontSize: '1rem',
          mb: 1,
        }}
      >
        No {label} Available Yet
      </Typography>

      {/* Subtext */}
      <Typography
        variant="body2"
        sx={{
          color: prelineColors.slate[500],
          fontSize: '0.825rem',
          lineHeight: 1.55,
          maxWidth: 280,
        }}
      >
        There are currently no items available in {label.toLowerCase()}. Please check back later or try selecting another category.
      </Typography>
    </Box>
  );
}
