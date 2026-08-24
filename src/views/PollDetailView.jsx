import React from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import { CheckCircle, CalendarBlank, User, Users, ArrowsLeftRight, Info } from '@phosphor-icons/react';
import PollHeader from '../components/Poll/PollHeader';
import PollQuestion from '../components/Poll/PollQuestion';
import StepNavigator from '../components/Poll/StepNavigator';
import QuestionEmptyState from '../components/Poll/QuestionEmptyState';
import VoteConfirmModal from '../components/Poll/VoteConfirmModal';
import VoteSuccessModal from '../components/Poll/VoteSuccessModal';
import UnitDelegationModal from '../components/Poll/UnitDelegationModal';
import { prelineColors } from '../theme/theme';
import { VotingModel } from '../models/VotingModel';

export default function PollDetailView({
  selectedPoll,
  activeQuestions,
  unansweredQuestions,
  currentQuestion,
  currentStep,
  totalSteps,
  isLastStep,
  isCurrentAnswered,
  answers,
  errors,
  showConfirmModal,
  showSuccessModal,
  showDelegationModal,
  delegationToast,
  onBack,
  onAnswerChange,
  onNextStep,
  onPrevStep,
  onConfirmSubmit,
  onCloseModal,
  onCloseSuccessModal,
  onCloseSuccessAndGoList,
  onOpenDelegationModal,
  onCloseDelegationModal,
  onToggleUnitInline,
  onSetModeInline,
  onSaveRepresentation,
  onCloseDelegationToast,
}) {
  const isScheduled = (selectedPoll.status || '').toLowerCase() === 'scheduled' || (selectedPoll.status || '').toLowerCase() === 'upcoming';
  const isReadOnlyStatus = selectedPoll.status !== 'ongoing' && selectedPoll.status !== 'OPEN';
  const isAllAnswered = selectedPoll.userVoted && unansweredQuestions.length === 0;
  const isCompletedView = (!isScheduled && isReadOnlyStatus) || isAllAnswered;
  const hasQuestions = activeQuestions.length > 0;
  const showEmptyState = isScheduled || !hasQuestions;

  const unitsList = VotingModel.getUnitsList(selectedPoll);
  const summary = VotingModel.getRepresentationSummary(unitsList);

  // Default fallback answers for completed polls if userAnswers not set
  const defaultAnswersForCompleted = {};
  if (isCompletedView) {
    activeQuestions.forEach((q) => {
      if (q.options && q.options.length > 0) {
        defaultAnswersForCompleted[q.id] = q.options[0];
      }
    });
  }

  // Answers to display (merged session answers + saved userAnswers)
  const displayAnswers = {
    ...defaultAnswersForCompleted,
    ...(selectedPoll.userAnswers || {}),
    ...answers,
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden' }}>
      {/* Poll Header with Tenant / Owner Switcher */}
      <PollHeader
        poll={selectedPoll}
        onBack={onBack}
        onToggleUnitInline={onToggleUnitInline}
        onSetModeInline={onSetModeInline}
        onOpenDelegationModal={onOpenDelegationModal}
      />

      {/* Question Body */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2.5,
          py: 2.5,
          backgroundColor: prelineColors.slate[100],
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {showEmptyState ? (
          /* Empty State */
          <QuestionEmptyState />
        ) : isCompletedView ? (
          /* Read-Only Summary View: All active questions with saved answers, disabled */
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                p: 1.5,
                mb: 2.5,
                backgroundColor: '#059669',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
              }}
            >
              <CheckCircle size={22} color="#ffffff" weight="fill" />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#ffffff', fontSize: '0.85rem' }}>
                  Vote Recorded
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>
                  Your vote ({summary.ownerUnits} Owner {summary.ownerUnits > 1 ? 'Units' : 'Unit'}, {summary.ownerNpp}% NPP) has been recorded.
                </Typography>
              </Box>
            </Box>

            {activeQuestions.map((q, idx) => (
              <PollQuestion
                key={q.id}
                index={idx}
                question={{
                  ...q,
                  votingCategory: q.votingCategory || selectedPoll.votingCategory,
                  mechanism: q.mechanism || selectedPoll.mechanism,
                  userUnit: q.userUnit || selectedPoll.userUnit,
                }}
                answer={displayAnswers[q.id]}
                onAnswerChange={onAnswerChange}
                hasError={false}
                disabled={true}
              />
            ))}
          </Box>
        ) : (
          /* Wizard View: Single current question */
          currentQuestion && (
            <PollQuestion
              key={currentQuestion.id}
              index={currentStep}
              question={{
                ...currentQuestion,
                votingCategory: currentQuestion.votingCategory || selectedPoll.votingCategory,
                mechanism: currentQuestion.mechanism || selectedPoll.mechanism,
                userUnit: currentQuestion.userUnit || selectedPoll.userUnit,
              }}
              answer={displayAnswers[currentQuestion.id]}
              onAnswerChange={onAnswerChange}
              hasError={Boolean(errors[currentQuestion.id])}
              disabled={false}
            />
          )
        )}
      </Box>

      {/* Step Navigator (Only shown during active voting wizard) */}
      {!isCompletedView && !showEmptyState && hasQuestions && (
        <StepNavigator
          currentStep={currentStep}
          totalSteps={totalSteps}
          isLastStep={isLastStep}
          isAnswered={isCurrentAnswered}
          onNext={onNextStep}
          onPrev={onPrevStep}
        />
      )}

      {/* Footer for Scheduled Polls */}
      {isScheduled && (
        <Box
          sx={{
            p: 2,
            backgroundColor: '#ffffff',
            borderTop: `1px solid ${prelineColors.slate[200]}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.25,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <CalendarBlank size={22} color="#8b5cf6" weight="fill" />
            <Typography variant="body2" sx={{ color: prelineColors.slate[700], fontWeight: 600, fontSize: '0.85rem' }}>
              Voting opens on {selectedPoll.startDate || 'Scheduled Period'}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            fullWidth
            onClick={onBack}
            sx={{
              py: 1.25,
              fontSize: '0.875rem',
              fontWeight: 600,
              borderRadius: '10px',
              border: `1px solid ${prelineColors.slate[300]}`,
              color: prelineColors.slate[700],
              textTransform: 'none',
              '&:hover': {
                border: `1px solid ${prelineColors.slate[300]}`,
                backgroundColor: 'transparent',
              },
            }}
          >
            Back to Voting List
          </Button>
        </Box>
      )}

      {/* Confirmation Review Modal */}
      <VoteConfirmModal
        open={showConfirmModal}
        onClose={onCloseModal}
        onConfirm={onConfirmSubmit}
        unansweredQuestions={unansweredQuestions}
        answers={answers}
        pollTitle={selectedPoll.title}
      />

      {/* Success Bottom Sheet Modal */}
      <VoteSuccessModal
        open={showSuccessModal}
        onClose={onCloseSuccessAndGoList}
        onViewResults={onCloseSuccessModal}
        poll={selectedPoll}
      />

      {/* Unit & Tenant Delegation Bottom Sheet Modal */}
      <UnitDelegationModal
        open={Boolean(showDelegationModal)}
        onClose={onCloseDelegationModal}
        poll={selectedPoll}
        onSaveRepresentation={onSaveRepresentation}
      />

      {/* Toast Feedback Notification */}
      <Snackbar
        open={Boolean(delegationToast)}
        autoHideDuration={3000}
        onClose={onCloseDelegationToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ bottom: { xs: 80, sm: 80 } }}
      >
        <Alert
          onClose={onCloseDelegationToast}
          severity="success"
          variant="filled"
          icon={<CheckCircle size={20} weight="fill" />}
          sx={{
            width: '100%',
            backgroundColor: '#059669',
            color: '#ffffff',
            fontWeight: 600,
            borderRadius: '10px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
          }}
        >
          {delegationToast}
        </Alert>
      </Snackbar>
    </Box>
  );
}
