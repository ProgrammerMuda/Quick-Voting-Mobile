import React from 'react';
import { Box, Button, Typography, LinearProgress } from '@mui/material';
import { CaretLeft, CaretRight, PaperPlaneRight } from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';

export default function StepNavigator({
  currentStep,
  totalSteps,
  isLastStep,
  isAnswered,
  onNext,
  onPrev,
}) {
  const progressValue = totalSteps > 0 ? Math.round(((currentStep + 1) / totalSteps) * 100) : 0;

  return (
    <Box
      sx={{
        p: 2.25,
        pb: 2.5,
        backgroundColor: '#ffffff',
        borderTop: `1px solid ${prelineColors.slate[200]}`,
        zIndex: 20,
      }}
    >
      {/* Progress indicator */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontWeight: 500, fontSize: '0.75rem' }}>
          Question {currentStep + 1} of {totalSteps}
        </Typography>
        <Typography variant="caption" sx={{ color: '#27b29b', fontWeight: 500, fontSize: '0.75rem' }}>
          {progressValue}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progressValue}
        sx={{
          height: 5,
          borderRadius: 3,
          mb: 2,
          backgroundColor: prelineColors.slate[100],
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#27b29b',
            borderRadius: 3,
            transition: 'transform 0.4s ease',
          },
        }}
      />

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {/* Back button — only shown on step 2+ */}
        {currentStep > 0 && (
          <Button
            variant="outlined"
            onClick={onPrev}
            sx={{
              minWidth: 48,
              width: 48,
              py: 1.3,
              px: 0,
              borderRadius: '8px',
              border: `1px solid ${prelineColors.slate[300]}`,
              color: prelineColors.slate[700],
              '&:hover': { border: `1px solid ${prelineColors.slate[300]}`, backgroundColor: 'transparent' },
            }}
          >
            <CaretLeft size={18} weight="bold" />
          </Button>
        )}

        {/* Next / Submit — disabled until answered */}
        <Button
          variant="contained"
          fullWidth
          disabled={!isAnswered}
          onClick={onNext}
          endIcon={
            isLastStep
              ? <PaperPlaneRight size={18} weight="fill" />
              : <CaretRight size={16} weight="bold" />
          }
          sx={{
            flex: 1,
            py: 1.3,
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: '8px',
            backgroundColor: '#27b29b',
            color: '#ffffff',
            boxShadow: 'none',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#27b29b', boxShadow: 'none' },
            '&.Mui-disabled': {
              backgroundColor: prelineColors.slate[200],
              color: prelineColors.slate[400],
            },
          }}
        >
          {isLastStep ? 'Submit Vote' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}
