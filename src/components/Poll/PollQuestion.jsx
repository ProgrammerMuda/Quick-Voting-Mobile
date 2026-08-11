import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
  LinearProgress,
} from '@mui/material';
import { CheckCircle, ChartBar } from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';

/**
 * Generate consistent mock live results for question options.
 */
function getQuestionResults(question) {
  const options = question.options || [];
  if (options.length === 0) return { totalVotes: 0, optionsWithResults: [] };

  const mockWeights = [52, 28, 14, 6, 4];
  const charCodeSum = (question.id || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const totalVotes = 180 + (charCodeSum % 65);

  const rawResults = options.map((opt, idx) => {
    const w = mockWeights[idx % mockWeights.length];
    return { text: opt, weight: w };
  });

  const totalWeight = rawResults.reduce((sum, item) => sum + item.weight, 0);
  let currentSumPct = 0;

  const optionsWithResults = rawResults.map((item, idx) => {
    let pct = Math.round((item.weight / totalWeight) * 100);
    if (idx === rawResults.length - 1) {
      pct = 100 - currentSumPct; // Ensure exact 100% total
    } else {
      currentSumPct += pct;
    }
    const count = Math.round((pct / 100) * totalVotes);
    return { text: item.text, percentage: pct, count };
  });

  return { totalVotes, optionsWithResults };
}

export default function PollQuestion({
  index,
  question,
  answer,
  onAnswerChange,
  hasError,
  disabled,
}) {
  // CRITICAL REQUIREMENT: Only active questions (isActive === true) should be rendered.
  if (!question.isActive) {
    return null;
  }

  const isSingle = question.type === 'single_choice';
  const answerText = Array.isArray(answer) ? answer.join(', ') : answer;
  const hasAnswer = Boolean(answerText);

  // Smooth entrance animation for progress bars when opening details
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (disabled) {
      const timer = setTimeout(() => setAnimated(true), 120);
      return () => clearTimeout(timer);
    }
  }, [disabled]);

  // Compute live vote count breakdown for read-only recorded view
  const { totalVotes, optionsWithResults } = getQuestionResults(question);

  return (
    <Box
      id={`question-box-${question.id}`}
      sx={{
        p: 2.25,
        mb: 2.5,
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: hasError ? `1.5px solid ${prelineColors.accent.rose}` : 'none',
        boxShadow: 'none',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Question Title */}
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          fontSize: '0.95rem',
          color: prelineColors.slate[700],
          lineHeight: 1.35,
          mb: 1.5,
        }}
      >
        {index + 1}. {question.question}
      </Typography>

      {/* READ-ONLY MODE (RECORDED VOTE): Selected answer + Live count progress bar */}
      {disabled ? (
        <Box sx={{ mt: 1 }}>
          {/* User's Selected Answer Badge — Top-aligned flex layout for long text */}
          <Box
            sx={{
              p: 1.5,
              mb: 2,
              borderRadius: '10px',
              backgroundColor: 'rgba(39, 178, 155, 0.06)',
              border: '1px solid #27b29b',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <CheckCircle size={24} color="#27b29b" weight="fill" style={{ flexShrink: 0 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontWeight: 500, fontSize: '0.7rem', display: 'block', mb: 0.25, lineHeight: 1.2 }}>
                Your Choice
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: prelineColors.slate[800],
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  lineHeight: 1.35,
                  wordBreak: 'break-word',
                }}
              >
                {hasAnswer ? answerText : 'Not answered'}
              </Typography>
            </Box>
          </Box>

          {/* Live Count Progress Bars for Options */}
          <Box sx={{ pt: 1.5, borderTop: `1px solid ${prelineColors.slate[100]}` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.75 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <ChartBar size={16} color="#3b82f6" weight="bold" />
                <Typography variant="caption" sx={{ fontWeight: 600, color: prelineColors.slate[700], fontSize: '0.775rem' }}>
                  {question.votingCategory === 'KEPEMILIKAN' || question.mechanism === 'NPP'
                    ? `Live Vote Results by NPP Weight (${totalVotes} Units)`
                    : `Live Vote Results (${totalVotes} Votes)`}
                </Typography>
              </Box>
              <Chip
                label={question.votingCategory === 'KEPEMILIKAN' || question.mechanism === 'NPP' ? "NPP Weighted" : "1 Man 1 Vote"}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  backgroundColor: question.votingCategory === 'KEPEMILIKAN' || question.mechanism === 'NPP' ? 'rgba(39, 178, 155, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                  color: question.votingCategory === 'KEPEMILIKAN' || question.mechanism === 'NPP' ? '#1e8f7c' : '#2563eb',
                  borderRadius: '4px',
                }}
              />
            </Box>

            {/* Progress Bar for each option — Animated from 0% on mount */}
            {optionsWithResults.map((opt, idx) => {
              const isUserChoice = opt.text === answerText;
              const isNpp = question.votingCategory === 'KEPEMILIKAN' || question.mechanism === 'NPP';
              return (
                <Box key={idx} sx={{ mb: 1.75, '&:last-child': { mb: 0 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 1,
                      mb: 0.75,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: isUserChoice ? 600 : 500,
                        color: isUserChoice ? '#1e8f7c' : prelineColors.slate[700],
                        fontSize: '0.775rem',
                        lineHeight: 1.4,
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      {opt.text}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: isUserChoice ? 700 : 600,
                        color: isUserChoice ? '#1e8f7c' : prelineColors.slate[600],
                        fontSize: '0.75rem',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        pt: 0.1,
                      }}
                    >
                      {opt.percentage}% {isNpp ? 'NPP' : ''} <span style={{ fontWeight: 400, color: prelineColors.slate[500] }}>({opt.count} {isNpp ? 'Units' : 'votes'})</span>
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={animated ? opt.percentage : 0}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: prelineColors.slate[100],
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: isUserChoice ? '#27b29b' : prelineColors.slate[300],
                        borderRadius: 4,
                        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      },
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      ) : (
        /* INTERACTIVE MODE: Render Radio Options for active voting */
        isSingle && (
          <RadioGroup
            value={answer || ''}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
          >
            {question.options.map((opt, idx) => (
              <FormControlLabel
                key={idx}
                value={opt}
                control={
                  <Radio
                    sx={{
                      color: prelineColors.slate[400],
                      '&.Mui-checked': { color: '#27b29b' },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: 500, color: prelineColors.slate[700] }}>
                    {opt}
                  </Typography>
                }
                sx={{
                  my: 0.5,
                  mx: 0,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: '8px',
                  border: `1px solid ${answer === opt ? '#27b29b' : prelineColors.slate[200]}`,
                  backgroundColor: answer === opt ? 'rgba(39, 178, 155, 0.04)' : '#ffffff',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    borderColor: '#27b29b',
                  },
                }}
              />
            ))}
          </RadioGroup>
        )
      )}

      {hasError && (
        <FormHelperText error sx={{ fontSize: '0.75rem', fontWeight: 600, mt: 1, m: 0 }}>
          Please select an answer to continue
        </FormHelperText>
      )}
    </Box>
  );
}
