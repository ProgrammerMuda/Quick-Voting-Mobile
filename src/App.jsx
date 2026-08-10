import React from 'react';
import { ThemeProvider, Box } from '@mui/material';
import theme from './theme/theme';
import { useVotingController } from './controllers/useVotingController';
import VotingListView from './views/VotingListView';
import PollDetailView from './views/PollDetailView';
import VoteConfirmationView from './views/VoteConfirmationView';

export default function App() {
  // Call Controller Hook
  const controller = useVotingController();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f8fafc',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* VIEW 1: Voting List */}
        {controller.screen === 'LIST' && (
          <VotingListView
            filteredItems={controller.filteredItems}
            filter={controller.filter}
            onFilterChange={controller.handleFilterChange}
            onSelectPoll={controller.handleSelectPoll}
          />
        )}

        {/* VIEW 2: Poll Detail */}
        {controller.screen === 'DETAIL' && controller.selectedPoll && (
          <PollDetailView
            selectedPoll={controller.selectedPoll}
            activeQuestions={controller.activeQuestions}
            unansweredQuestions={controller.unansweredQuestions}
            currentQuestion={controller.currentQuestion}
            currentStep={controller.currentStep}
            totalSteps={controller.totalSteps}
            isLastStep={controller.isLastStep}
            isCurrentAnswered={controller.isCurrentAnswered}
            answers={controller.answers}
            errors={controller.errors}
            showConfirmModal={controller.showConfirmModal}
            showSuccessModal={controller.showSuccessModal}
            onBack={controller.handleBackToList}
            onAnswerChange={controller.handleAnswerChange}
            onNextStep={controller.handleNextStep}
            onPrevStep={controller.handlePrevStep}
            onConfirmSubmit={controller.handleSubmitVote}
            onCloseModal={controller.handleCloseModal}
            onCloseSuccessModal={controller.handleCloseSuccessModal}
            onCloseSuccessAndGoList={controller.handleCloseSuccessAndGoList}
          />
        )}

        {/* VIEW 3: Confirmation */}
        {controller.screen === 'CONFIRMATION' && (
          <VoteConfirmationView
            selectedPoll={controller.selectedPoll}
            onBackToVoting={controller.handleBackToList}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}
