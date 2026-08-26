import React from 'react';
import { Box, Typography, Button, Slide, Backdrop, Chip } from '@mui/material';
import { CheckCircle, ShieldCheck, ArrowRight, Lightning, CalendarCheck } from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';

export default function VoteSuccessModal({ open, onClose, onViewResults, poll }) {
  if (!poll) return null;

  const isEvent = poll?.itemType === 'EVENT';

  return (
    <>
      {/* Backdrop */}
      <Backdrop
        open={open}
        onClick={onClose}
        sx={{
          zIndex: 35,
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
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
            zIndex: 40,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            px: 3,
            pt: 1.5,
            pb: 3.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 -8px 30px rgba(0,0,0,0.15)',
          }}
        >
          {/* Drag Handle Bar */}
          <Box
            sx={{
              width: 38,
              height: 4,
              borderRadius: 2,
              backgroundColor: prelineColors.slate[300],
              mb: 2,
            }}
          />

          {/* Success Illustration (Full width matching button row width) */}
          <Box
            component="img"
            src="/vote-success.png"
            alt="Vote Submitted Successfully"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '16px',
              mb: 2.5,
              display: 'block',
            }}
          />

          {/* Title & Subtitle */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: prelineColors.slate[900],
              fontSize: '1.25rem',
              mb: 0.5,
              lineHeight: 1.25,
            }}
          >
            Vote Successfully Submitted!
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: prelineColors.slate[500],
              fontSize: '0.85rem',
              mb: 2.25,
              lineHeight: 1.4,
              maxWidth: 340,
            }}
          >
            Thank you for participating. Your vote and NPP weight have been securely recorded.
          </Typography>

          {/* Summary Card */}
          {poll && (
            <Box
              sx={{
                width: '100%',
                p: 2,
                mb: 2.5,
                backgroundColor: prelineColors.slate[50],
                borderRadius: '14px',
                border: `1px solid ${prelineColors.slate[200]}`,
                textAlign: 'left',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                {isEvent ? (
                  <Chip
                    icon={<CalendarCheck size={15} color="#27b29b" weight="fill" />}
                    label="Event Voting"
                    size="small"
                    sx={{
                      backgroundColor: '#ffffff',
                      color: prelineColors.slate[700],
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: 24,
                      border: `1px solid ${prelineColors.slate[200]}`,
                    }}
                  />
                ) : (
                  <Chip
                    icon={<Lightning size={15} color="#27b29b" weight="fill" />}
                    label="Quick Voting"
                    size="small"
                    sx={{
                      backgroundColor: '#ffffff',
                      color: prelineColors.slate[700],
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: 24,
                      border: `1px solid ${prelineColors.slate[200]}`,
                    }}
                  />
                )}
                <Chip
                  icon={<ShieldCheck size={14} color="#059669" weight="fill" />}
                  label="Recorded"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#059669',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    height: 22,
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                  }}
                />
              </Box>

              <Typography variant="body2" sx={{ fontWeight: 700, color: prelineColors.slate[800], fontSize: '0.875rem', lineHeight: 1.3 }}>
                {poll.title}
              </Typography>
            </Box>
          )}

          {/* Action Buttons */}
          <Box sx={{ width: '100%', display: 'flex', gap: 1.25 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={onClose}
              sx={{
                flex: 1,
                py: 1.2,
                fontSize: '0.85rem',
                fontWeight: 600,
                borderRadius: '10px',
                border: `1px solid ${prelineColors.slate[300]}`,
                color: prelineColors.slate[700],
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: prelineColors.slate[400],
                  backgroundColor: prelineColors.slate[50],
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: prelineColors.slate[100],
                },
              }}
            >
              Back to List
            </Button>
            <Button
              variant="contained"
              disableElevation
              fullWidth
              onClick={onViewResults}
              endIcon={<ArrowRight size={18} weight="bold" />}
              sx={{
                flex: 1.2,
                py: 1.2,
                fontSize: '0.85rem',
                fontWeight: 700,
                borderRadius: '10px',
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
              View Results
            </Button>
          </Box>
        </Box>
      </Slide>
    </>
  );
}
