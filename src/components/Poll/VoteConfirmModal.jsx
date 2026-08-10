import React from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Chip,
  Slide,
} from '@mui/material';
import { CheckCircle, PaperPlaneRight } from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';

function formatAnswer(answer) {
  if (!answer) return '-';
  if (Array.isArray(answer)) return answer.join(', ');
  return String(answer);
}

export default function VoteConfirmModal({
  open,
  onClose,
  onConfirm,
  unansweredQuestions,
  answers,
  pollTitle,
}) {
  return (
    <>
      {/* Backdrop — scoped inside the mobile frame */}
      {open && (
        <Box
          onClick={onClose}
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            zIndex: 30,
          }}
        />
      )}

      {/* Bottom Sheet */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 40,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            maxHeight: '75%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Drag Handle */}
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.5, pb: 0.5 }}>
            <Box
              sx={{
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: prelineColors.slate[300],
              }}
            />
          </Box>

          {/* Header: SemiBold (600) */}
          <Box sx={{ px: 2.5, pt: 1, pb: 1.5 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: prelineColors.slate[700], fontSize: '1.05rem', lineHeight: 1.3 }}
            >
              Review Your Answers
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: prelineColors.slate[500], fontSize: '0.8rem', mt: 0.25 }}
            >
              {pollTitle}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: prelineColors.slate[200] }} />

          {/* Scrollable review area (Hug Content) */}
          <Box sx={{ maxHeight: '50vh', overflowY: 'auto', px: 2.5, py: 2 }}>
            {unansweredQuestions.map((q, idx) => {
              const answer = answers[q.id];
              const answerText = formatAnswer(answer);
              const isEmpty = !answer || (Array.isArray(answer) && answer.length === 0);

              return (
                <Box
                  key={q.id}
                  sx={{
                    mb: 1.5,
                    p: 1.75,
                    borderRadius: '12px',
                    backgroundColor: prelineColors.slate[50],
                    border: `1px solid ${prelineColors.slate[200]}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: prelineColors.slate[500], fontWeight: 600, fontSize: '0.7rem', display: 'block', mb: 0.4 }}
                  >
                    Question {idx + 1}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: prelineColors.slate[700], fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.4, mb: 1 }}
                  >
                    {q.question}
                  </Typography>

                  {isEmpty ? (
                    <Chip
                      label="Not answered"
                      size="small"
                      sx={{
                        backgroundColor: prelineColors.slate[100],
                        color: prelineColors.slate[400],
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        borderRadius: '6px',
                        height: 22,
                      }}
                    />
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle size={20} color="#27b29b" weight="fill" style={{ flexShrink: 0 }} />
                      <Typography
                        variant="body2"
                        sx={{ color: '#27b29b', fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.4 }}
                      >
                        {answerText}
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>

          <Divider sx={{ borderColor: prelineColors.slate[200] }} />

          {/* Actions: SemiBold (600) */}
          <Box sx={{ px: 2.5, py: 2, pb: 2.5, display: 'flex', gap: 1.5 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                flex: 1,
                py: 1.25,
                fontSize: '0.875rem',
                fontWeight: 600,
                borderRadius: '10px',
                border: `1px solid ${prelineColors.slate[300]}`,
                color: prelineColors.slate[700],
                textTransform: 'none',
                '&:hover': { border: `1px solid ${prelineColors.slate[300]}`, backgroundColor: 'transparent' },
              }}
            >
              Edit Answers
            </Button>
            <Button
              variant="contained"
              onClick={onConfirm}
              endIcon={<PaperPlaneRight size={16} weight="fill" />}
              sx={{
                flex: 1,
                py: 1.25,
                fontSize: '0.875rem',
                fontWeight: 600,
                borderRadius: '10px',
                backgroundColor: '#27b29b',
                color: '#ffffff',
                boxShadow: 'none',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#27b29b', boxShadow: 'none' },
              }}
            >
              Submit Vote
            </Button>
          </Box>
        </Box>
      </Slide>
    </>
  );
}
