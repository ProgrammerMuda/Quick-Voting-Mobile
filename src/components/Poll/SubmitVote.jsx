import React from 'react';
import { Box, Button, Typography, LinearProgress } from '@mui/material';
import { PaperPlaneRight } from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';

export default function SubmitVote({
  answeredCount,
  totalCount,
  onSubmit,
  disabled,
}) {
  const percentage = totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0;

  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        p: 2.25,
        backgroundColor: '#ffffff',
        borderTop: `1px solid ${prelineColors.slate[200]}`,
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.06)',
        zIndex: 20,
      }}
    >
      {/* Lightweight Progress Counter */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="caption" sx={{ color: prelineColors.slate[600], fontWeight: 600, fontSize: '0.775rem' }}>
          {answeredCount} of {totalCount} questions answered
        </Typography>
        <Typography variant="caption" sx={{ color: '#1e8f7c', fontWeight: 700, fontSize: '0.775rem' }}>
          {percentage}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 6,
          borderRadius: 3,
          mb: 1.75,
          backgroundColor: prelineColors.slate[100],
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#27b29b',
            borderRadius: 3,
          },
        }}
      />

      <Button
        variant="contained"
        fullWidth
        disabled={disabled}
        onClick={onSubmit}
        endIcon={<PaperPlaneRight size={18} weight="fill" />}
        sx={{
          py: 1.35,
          fontSize: '0.925rem',
          fontWeight: 700,
        }}
      >
        Submit Vote
      </Button>
    </Box>
  );
}
