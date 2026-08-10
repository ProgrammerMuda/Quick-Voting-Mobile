import React from 'react';
import { Box, Card, Typography, Button, Chip } from '@mui/material';
import { CheckCircle, ShieldCheck, ArrowLeft, Lightning, CalendarCheck } from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';

export default function VoteConfirmation({ poll, onBackToVoting }) {
  const isEvent = poll?.itemType === 'EVENT';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        px: 3,
        py: 4,
        backgroundColor: prelineColors.slate[100],
        textAlign: 'center',
      }}
    >
      {/* Success Icon */}
      <Box
        sx={{
          width: 84,
          height: 84,
          borderRadius: '50%',
          backgroundColor: 'rgba(39, 178, 155, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          boxShadow: '0 8px 24px rgba(39, 178, 155, 0.25)',
        }}
      >
        <CheckCircle size={56} color="#27b29b" weight="fill" />
      </Box>

      {/* Screen Title & Subtitle */}
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          color: prelineColors.slate[700],
          fontSize: '1.35rem',
          mb: 1,
          lineHeight: 1.25,
        }}
      >
        Your vote has been submitted
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: prelineColors.slate[600],
          fontSize: '0.9rem',
          mb: 3.5,
          maxWidth: 320,
          lineHeight: 1.45,
        }}
      >
        Thank you for sharing your opinion.
      </Typography>

      {/* Poll Summary Card */}
      {poll && (
        <Card
          sx={{
            width: '100%',
            maxWidth: 360,
            mb: 4,
            p: 2.25,
            backgroundColor: '#ffffff',
            border: `1px solid ${prelineColors.slate[200]}`,
            borderRadius: '16px',
            textAlign: 'left',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
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
            <Chip
              icon={<ShieldCheck size={14} color="#059669" weight="fill" />}
              label="Recorded"
              size="small"
              sx={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: '#059669',
                fontWeight: 600,
                fontSize: '0.725rem',
              }}
            />
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: prelineColors.slate[700], mb: 0.5 }}>
            {poll.title}
          </Typography>

          <Typography variant="caption" sx={{ color: prelineColors.slate[500], display: 'block' }}>
            Submission timestamp: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Card>
      )}

      {/* Primary Action Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={onBackToVoting}
        startIcon={<ArrowLeft size={18} weight="bold" />}
        sx={{
          maxWidth: 360,
          py: 1.35,
          fontSize: '0.925rem',
          fontWeight: 600,
        }}
      >
        Back to Voting
      </Button>
    </Box>
  );
}
