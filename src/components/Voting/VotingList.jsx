import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import VotingHeader from './VotingHeader';
import VotingFilter from './VotingFilter';
import VotingCard from './VotingCard';
import { prelineColors } from '../../theme/theme';

export default function VotingList({ items, onSelectPoll }) {
  const [filter, setFilter] = useState('ALL');

  const filteredItems = items.filter((item) => {
    if (filter === 'ALL') return true;
    if (filter === 'EVENT') return item.itemType === 'EVENT';
    if (filter === 'POLL') return item.itemType === 'POLL';
    return true;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1, minHeight: 0 }}>
      {/* Screen 1 Header */}
      <VotingHeader />

      {/* Filter Bar (All | Event | Poll) */}
      <VotingFilter activeFilter={filter} onFilterChange={setFilter} />

      {/* Scrollable Voting Feed */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2.5,
          py: 2.5,
          backgroundColor: prelineColors.slate[50],
        }}
      >
        {filteredItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: prelineColors.slate[700], mb: 0.5 }}>
              No Voting Items Found
            </Typography>
            <Typography variant="body2" sx={{ color: prelineColors.slate[500] }}>
              There are no items currently matching the selected filter.
            </Typography>
          </Box>
        ) : (
          filteredItems.map((item) => (
            <VotingCard key={item.id} item={item} onSelectPoll={onSelectPoll} />
          ))
        )}
      </Box>
    </Box>
  );
}
