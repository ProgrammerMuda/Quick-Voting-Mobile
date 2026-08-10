import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { CaretLeft } from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';

export default function VotingHeader({ onBack }) {
  return (
    <Box
      sx={{
        height: 80,
        px: 2,
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Back button pinned to the left */}
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

      {/* Title bar text: Bold (700) */}
      <Typography
        variant="h6"
        component="h1"
        sx={{
          fontWeight: 700,
          color: prelineColors.slate[800],
          letterSpacing: '-0.02em',
          fontSize: '1.25rem',
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        Voting
      </Typography>
    </Box>
  );
}
