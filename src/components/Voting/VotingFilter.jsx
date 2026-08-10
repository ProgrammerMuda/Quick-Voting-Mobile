import React from 'react';
import { Box, Button } from '@mui/material';
import { prelineColors } from '../../theme/theme';

export default function VotingFilter({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'ALL', label: 'All' },
    { id: 'EVENT', label: 'Event Voting' },
    { id: 'POLL', label: 'Quick Voting' },
  ];

  return (
    <Box
      sx={{
        px: 2.5,
        pt: 0,
        pb: 2,
        backgroundColor: '#ffffff',
        borderBottom: `1px solid ${prelineColors.slate[200]}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          p: 0.5,
          borderRadius: '12px',
          backgroundColor: prelineColors.slate[100],
          gap: 0.5,
        }}
      >
        {filters.map((filter) => {
          const isSelected = activeFilter === filter.id;
          return (
            <Button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              disableRipple
              sx={{
                flex: 1,
                py: 0.8,
                px: 1.5,
                borderRadius: '9px',
                fontSize: '0.825rem',
                fontWeight: 500,
                color: isSelected ? prelineColors.slate[700] : prelineColors.slate[500],
                backgroundColor: isSelected ? '#ffffff' : 'transparent',
                boxShadow: isSelected
                  ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                  : 'none',
                '&:hover': {
                  backgroundColor: isSelected ? '#ffffff' : 'transparent',
                },
              }}
            >
              {filter.label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
