import { useState } from 'react';
import { VotingModel } from '../models/VotingModel';

export function useVotingController() {
  // Screen State: 'LIST' | 'DETAIL' | 'CONFIRMATION'
  const [screen, setScreen] = useState('LIST');

  // Filter State: 'ALL' | 'EVENT' | 'POLL'
  const [filter, setFilter] = useState('ALL');

  // Voting Dataset State
  const [votingItems, setVotingItems] = useState(() => VotingModel.getInitialItems());

  // Selected Poll State for Detail Screen
  const [selectedPoll, setSelectedPoll] = useState(null);

  // User Answers State map { [questionId]: value } — only for current session
  const [answers, setAnswers] = useState({});

  // Validation Error States
  const [errors, setErrors] = useState({});

  // Current Step in Wizard (0-indexed among UNANSWERED active questions)
  const [currentStep, setCurrentStep] = useState(0);

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Success bottom sheet modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Unit delegation bottom sheet modal state
  const [showDelegationModal, setShowDelegationModal] = useState(false);

  // Toast feedback state
  const [delegationToast, setDelegationToast] = useState(null);

  // Derived filtered items via Model
  const filteredItems = VotingModel.filterItems(votingItems, filter);

  // Derived active questions for selected poll
  const activeQuestions = selectedPoll ? VotingModel.getActiveQuestions(selectedPoll) : [];

  // Unanswered active questions (questions user still needs to answer this session)
  const unansweredQuestions = selectedPoll
    ? VotingModel.getUnansweredActiveQuestions(selectedPoll)
    : [];

  // Current question being shown (from unanswered list)
  const currentQuestion = unansweredQuestions[currentStep] || null;

  // Is this the last step among unanswered questions?
  const isLastStep = unansweredQuestions.length > 0
    ? currentStep === unansweredQuestions.length - 1
    : true;

  // Total steps = only unanswered active questions
  const totalSteps = unansweredQuestions.length;

  // Is current question answered in this session?
  const isCurrentAnswered = currentQuestion
    ? Boolean(
        Array.isArray(answers[currentQuestion.id])
          ? answers[currentQuestion.id].length > 0
          : answers[currentQuestion.id]
      )
    : false;

  // Controller Actions / Handlers

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSelectPoll = (poll) => {
    setSelectedPoll(poll);
    setAnswers(poll.userAnswers || {});
    setErrors({});
    setCurrentStep(0);
    setScreen('DETAIL');
  };

  const handleBackToList = () => {
    setSelectedPoll(null);
    setAnswers({});
    setErrors({});
    setCurrentStep(0);
    setScreen('LIST');
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    if (errors[questionId]) {
      setErrors((prev) => ({
        ...prev,
        [questionId]: false,
      }));
    }
  };

  // Navigate to next step — on last step open confirm modal
  const handleNextStep = () => {
    if (!currentQuestion) return;

    if (isLastStep) {
      setShowConfirmModal(true); // open review modal
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleCloseModal = () => setShowConfirmModal(false);

  // Navigate to previous step
  const handlePrevStep = () => {
    if (currentStep === 0) {
      handleBackToList();
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitVote = () => {
    if (!selectedPoll) return;
    if (selectedPoll.status !== 'ongoing' && selectedPoll.status !== 'OPEN') return;

    // Collect the IDs of questions answered this session
    const answeredIds = unansweredQuestions
      .filter((q) => {
        const val = answers[q.id];
        return Array.isArray(val) ? val.length > 0 : Boolean(val);
      })
      .map((q) => q.id);

    // Record vote with cumulative answeredQuestionIds & userAnswers
    const updatedItems = VotingModel.recordVote(votingItems, selectedPoll.id, answeredIds, answers);
    setVotingItems(updatedItems);

    // Reflect updated poll state locally
    const updatedPoll = updatedItems.find((i) => i.id === selectedPoll.id);
    setSelectedPoll(updatedPoll || selectedPoll);

    setErrors({});
    setShowConfirmModal(false);
    setShowSuccessModal(true);
    setScreen('DETAIL');
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseSuccessAndGoList = () => {
    setShowSuccessModal(false);
    handleBackToList();
  };

  // Delegation Handlers
  const handleOpenDelegationModal = () => {
    setShowDelegationModal(true);
  };

  const handleCloseDelegationModal = () => {
    setShowDelegationModal(false);
  };

  // Instant inline toggle per unit (Zero modal, 100% frictionless)
  const handleToggleUnitInline = (unitNo, representedBy) => {
    if (!selectedPoll) return;
    const currentUnits = VotingModel.getUnitsList(selectedPoll);
    const updatedUnits = currentUnits.map((u) => {
      if (u.unitNo === unitNo) {
        if (u.tenant?.relationType === 'SELF') {
          return { ...u, representedBy: 'OWNER' };
        }
        return { ...u, representedBy };
      }
      return u;
    });

    const updatedItems = VotingModel.setUnitsListForPoll(votingItems, selectedPoll.id, updatedUnits);
    setVotingItems(updatedItems);

    const updatedPoll = updatedItems.find((i) => i.id === selectedPoll.id);
    setSelectedPoll(updatedPoll || selectedPoll);
  };

  // Instant quick mode switcher (ALL_OWNER or ALL_DELEGATED)
  const handleSetModeInline = (mode) => {
    if (!selectedPoll) return;
    const targetRep = mode === 'ALL_OWNER' ? 'OWNER' : 'TENANT';
    const updatedItems = VotingModel.updateAllUnitsRepresentation(votingItems, selectedPoll.id, targetRep);
    setVotingItems(updatedItems);

    const updatedPoll = updatedItems.find((i) => i.id === selectedPoll.id);
    setSelectedPoll(updatedPoll || selectedPoll);
  };

  const handleSaveRepresentation = (updatedUnits, isFinalized = true) => {
    if (!selectedPoll) return;
    const updatedItems = VotingModel.setUnitsListForPoll(votingItems, selectedPoll.id, updatedUnits, isFinalized);
    setVotingItems(updatedItems);

    const updatedPoll = updatedItems.find((i) => i.id === selectedPoll.id);
    setSelectedPoll(updatedPoll || selectedPoll);

    setDelegationToast('Voting delegation finalized and confirmed for this session!');
  };

  const handleCloseDelegationToast = () => {
    setDelegationToast(null);
  };

  return {
    // State Values
    screen,
    filter,
    filteredItems,
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

    // Action Handlers
    handleFilterChange,
    handleSelectPoll,
    handleBackToList,
    handleAnswerChange,
    handleNextStep,
    handlePrevStep,
    handleSubmitVote,
    handleCloseModal,
    handleCloseSuccessModal,
    handleCloseSuccessAndGoList,
    handleOpenDelegationModal,
    handleCloseDelegationModal,
    handleToggleUnitInline,
    handleSetModeInline,
    handleSaveRepresentation,
    handleCloseDelegationToast,
  };
}
