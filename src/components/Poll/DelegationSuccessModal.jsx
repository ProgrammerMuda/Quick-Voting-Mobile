import React from 'react';
import { Box, Typography, Button, Slide, Backdrop } from '@mui/material';
import { ArrowRight } from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';

export default function DelegationSuccessModal({
  open,
  onClose,
  title = 'Success Update Delegation',
  description = 'Your unit voting representation has been successfully updated and finalized.',
}) {
  return (
    <>
      {/* Backdrop */}
      <Backdrop
        open={open}
        onClick={onClose}
        sx={{
          zIndex: 60,
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
            maxHeight: '92vh',
            overflowY: 'auto',
            zIndex: 65,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            p: 3,
            pt: 1.5,
            pb: 3.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* Top Drag Handle Bar */}
          <Box
            sx={{
              width: 38,
              height: 4,
              borderRadius: 2,
              backgroundColor: prelineColors.slate[300],
              mb: 2,
            }}
          />

          {/* Success Illustration (Full width exactly matching button width) */}
          <Box
            component="img"
            src="/vote-success.png"
            alt="Success Update Delegation"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '16px',
              mb: 2.5,
              display: 'block',
            }}
          />

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: prelineColors.slate[800],
              fontSize: '1.2rem',
              mb: 0.75,
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>

          {/* Subtitle / Description */}
          <Typography
            variant="body2"
            sx={{
              color: prelineColors.slate[500],
              fontSize: '0.875rem',
              mb: 3,
              lineHeight: 1.45,
              maxWidth: 340,
            }}
          >
            {description}
          </Typography>

          {/* Action CTA Button (Matching Screenshot) */}
          <Button
            variant="contained"
            disableElevation
            fullWidth
            onClick={onClose}
            endIcon={<ArrowRight size={18} weight="bold" />}
            sx={{
              py: 1.35,
              fontSize: '0.9rem',
              fontWeight: 700,
              borderRadius: '12px',
              backgroundColor: '#27b29b',
              color: '#ffffff',
              boxShadow: 'none',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#27b29b',
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: '#1e8f7c',
              },
            }}
          >
            View Detail
          </Button>
        </Box>
      </Slide>
    </>
  );
}
