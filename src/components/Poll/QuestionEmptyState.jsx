import React from 'react';
import { Box, Typography } from '@mui/material';
import { prelineColors } from '../../theme/theme';

export default function QuestionEmptyState() {
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
        src="/empty-question.jpg"
        alt="No Questions Available"
        sx={{
          width: 220,
          height: 'auto',
          maxWidth: '85%',
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
        No Questions Available Yet
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
        There are no questions for this voting yet. Please wait for management to create and publish the questions.
      </Typography>
    </Box>
  );
}
