import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Flame, CalendarBlank } from '@phosphor-icons/react';
import VotingHeader from '../components/Voting/VotingHeader';
import VotingFilter from '../components/Voting/VotingFilter';
import VotingCard from '../components/Voting/VotingCard';
import { prelineColors } from '../theme/theme';

import VotingEmptyState from '../components/Voting/VotingEmptyState';

export default function VotingListView({
  filteredItems,
  filter,
  onFilterChange,
  onSelectPoll,
}) {
  // Separate ongoing items from other items for clear UX structure
  const ongoingItems = filteredItems.filter(
    (item) => item.status === 'ongoing' || item.status === 'open'
  );
  const otherItems = filteredItems.filter(
    (item) => item.status !== 'ongoing' && item.status !== 'open'
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1, minHeight: 0 }}>
      {/* Screen 1 Header */}
      <VotingHeader />

      {/* Segmented Filter (All | Event Voting | Quick Voting) */}
      <VotingFilter activeFilter={filter} onFilterChange={onFilterChange} />

      {/* Scrollable Voting Feed */}
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
        {filteredItems.length === 0 ? (
          <VotingEmptyState filter={filter} />
        ) : (
          <>
            {/* SECTION 1: ONGOING NOW (If any ongoing items exist) */}
            {ongoingItems.length > 0 && (
              <Box sx={{ mb: 1.5 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1.75,
                    px: 0.5,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '8px',
                        backgroundColor: 'rgba(249, 115, 22, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Flame size={19} color="#f97316" weight="fill" />
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: prelineColors.slate[700],
                        fontSize: '0.925rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Ongoing Now
                    </Typography>
                  </Box>

                  <Chip
                    label={`${ongoingItems.length} Active`}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(59, 130, 246, 0.12)',
                      color: '#2563eb',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      height: 26,
                      px: 0.5,
                      borderRadius: '100px',
                    }}
                  />
                </Box>

                {ongoingItems.map((item) => (
                  <VotingCard key={item.id} item={item} onSelectPoll={onSelectPoll} />
                ))}
              </Box>
            )}

            {/* SECTION 2: SCHEDULED & COMPLETED (If any other items exist) */}
            {otherItems.length > 0 && (
              <Box>
                {ongoingItems.length > 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1.75,
                      mt: 0.5,
                      px: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '8px',
                        backgroundColor: prelineColors.slate[200],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CalendarBlank size={18} color={prelineColors.slate[600]} weight="fill" />
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: prelineColors.slate[600],
                        fontSize: '0.925rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Scheduled & Completed
                    </Typography>
                  </Box>
                )}

                {otherItems.map((item) => (
                  <VotingCard key={item.id} item={item} onSelectPoll={onSelectPoll} />
                ))}
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
