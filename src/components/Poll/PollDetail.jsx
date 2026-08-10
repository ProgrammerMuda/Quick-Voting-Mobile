import React, { useState } from 'react';
import { Box, Alert } from '@mui/material';
import { WarningCircle } from '@phosphor-icons/react';
import PollHeader from './PollHeader';
import PollQuestion from './PollQuestion';
import SubmitVote from './SubmitVote';
import { prelineColors } from '../../theme/theme';

export default function PollDetail({ poll, onBack, onSubmitVote }) {
  // Filter active questions ONLY
  const activeQuestions = poll.questions ? poll.questions.filter((q) => q.isActive) : [];

  // Local state for answers
  const [answers, setAnswers] = useState({});
  // Errors state map { [questionId]: boolean }
  const [errors, setErrors] = useState({});
  const [validationAlert, setValidationAlert] = useState(false);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Clear error for this question when answered
    if (errors[questionId]) {
      setErrors((prev) => ({
        ...prev,
        [questionId]: false,
      }));
    }
  };

  // Calculate answered active count
  const answeredCount = activeQuestions.filter((q) => {
    const val = answers[q.id];
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === 'string') return val.trim().length > 0;
    return Boolean(val);
  }).length;

  const handleSubmit = () => {
    if (poll.status !== 'ongoing' && poll.status !== 'OPEN') return;

    const newErrors = {};
    let firstErrorId = null;

    activeQuestions.forEach((q) => {
      if (q.isRequired) {
        const val = answers[q.id];
        const isAnswered =
          (Array.isArray(val) && val.length > 0) ||
          (typeof val === 'string' && val.trim().length > 0) ||
          Boolean(val);

        if (!isAnswered) {
          newErrors[q.id] = true;
          if (!firstErrorId) {
            firstErrorId = q.id;
          }
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setValidationAlert(true);

      // Scroll to the first unanswered required question
      if (firstErrorId) {
        const element = document.getElementById(`question-box-${firstErrorId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    // Clear errors & submit
    setErrors({});
    setValidationAlert(false);
    onSubmitVote(poll.id, answers);
  };

  const isReadOnly = poll.status !== 'ongoing' && poll.status !== 'OPEN';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1, minHeight: 0 }}>
      {/* Header */}
      <PollHeader poll={poll} onBack={onBack} />

      {/* Questions Scrollable Body */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2.5,
          py: 2.5,
          backgroundColor: prelineColors.slate[50],
        }}
      >
        {validationAlert && (
          <Alert
            severity="error"
            icon={<WarningCircle size={20} weight="fill" />}
            onClose={() => setValidationAlert(false)}
            sx={{
              mb: 2.5,
              borderRadius: '14px',
              fontWeight: 600,
              fontSize: '0.825rem',
            }}
          >
            Please answer all required questions before submitting.
          </Alert>
        )}

        {activeQuestions.map((q, idx) => (
          <PollQuestion
            key={q.id}
            index={idx}
            question={q}
            answer={answers[q.id]}
            onAnswerChange={handleAnswerChange}
            hasError={Boolean(errors[q.id])}
            disabled={isReadOnly}
          />
        ))}
      </Box>

      {/* Sticky Bottom Action Bar */}
      {!isReadOnly && (
        <SubmitVote
          answeredCount={answeredCount}
          totalCount={activeQuestions.length}
          onSubmit={handleSubmit}
          disabled={activeQuestions.length === 0}
        />
      )}
    </Box>
  );
}
