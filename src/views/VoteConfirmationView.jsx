import React from 'react';
import VoteConfirmation from '../components/Poll/VoteConfirmation';

export default function VoteConfirmationView({ selectedPoll, onBackToVoting }) {
  return (
    <VoteConfirmation poll={selectedPoll} onBackToVoting={onBackToVoting} />
  );
}
