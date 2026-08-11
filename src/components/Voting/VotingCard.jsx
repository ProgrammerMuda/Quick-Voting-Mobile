import React from 'react';
import { Card, Box, Typography, Chip, Button } from '@mui/material';
import { CalendarCheck, Lightning, Buildings, Clock, MapPin, ArrowRight, CaretRight, CalendarBlank, Key, House } from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';
import VotingStatus from './VotingStatus';
import { VotingModel } from '../../models/VotingModel';

export default function VotingCard({ item, onSelectPoll }) {
  const isEvent = item.itemType === 'EVENT';
  const isOngoing = item.status === 'ongoing' || item.status === 'open';
  const hasNewUnansweredQuestions = VotingModel.hasNewUnansweredQuestions(item);

  return (
    <Card
      sx={{
        mb: 2.5,
        backgroundColor: '#ffffff',
        border: 'none',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'none',
      }}
    >
      <Box sx={{ p: 2.5 }}>
        {/* Header Row: Type Pill Badge (Left) & Solid Status Pill (Right) */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          {/* JENIS VOTING BADGE */}
          {item.votingCategory === 'KEPEMILIKAN' ? (
            <Chip
              icon={<Key size={17} color="#27b29b" weight="fill" />}
              label="Kepemilikan (NPP)"
              size="small"
              sx={{
                backgroundColor: 'rgba(39, 178, 155, 0.08)',
                color: '#1e8f7c',
                fontWeight: 600,
                fontSize: '0.75rem',
                borderRadius: '100px',
                px: 1,
                height: 30,
                border: '1px solid rgba(39, 178, 155, 0.25)',
                '& .MuiChip-label': { px: 0.75 },
              }}
            />
          ) : item.votingCategory === 'PENGELOLAAN' ? (
            <Chip
              icon={<Buildings size={17} color="#27b29b" weight="fill" />}
              label="Pengelolaan (1 Man 1 Vote)"
              size="small"
              sx={{
                backgroundColor: prelineColors.slate[100],
                color: prelineColors.slate[700],
                fontWeight: 600,
                fontSize: '0.75rem',
                borderRadius: '100px',
                px: 1,
                height: 30,
                border: `1px solid ${prelineColors.slate[200]}`,
                '& .MuiChip-label': { px: 0.75 },
              }}
            />
          ) : item.votingCategory === 'PENGHUNIAN' ? (
            <Chip
              icon={<House size={17} color="#27b29b" weight="fill" />}
              label="Penghunian (1 Man 1 Vote)"
              size="small"
              sx={{
                backgroundColor: prelineColors.slate[100],
                color: prelineColors.slate[700],
                fontWeight: 600,
                fontSize: '0.75rem',
                borderRadius: '100px',
                px: 1,
                height: 30,
                border: `1px solid ${prelineColors.slate[200]}`,
                '& .MuiChip-label': { px: 0.75 },
              }}
            />
          ) : isEvent ? (
            <Chip
              icon={<CalendarCheck size={18} color="#27b29b" weight="fill" />}
              label="Event Voting"
              size="small"
              sx={{
                backgroundColor: prelineColors.slate[100],
                color: prelineColors.slate[700],
                fontWeight: 600,
                fontSize: '0.75rem',
                borderRadius: '100px',
                px: 1,
                height: 30,
                border: `1px solid ${prelineColors.slate[200]}`,
                '& .MuiChip-label': { px: 1 },
              }}
            />
          ) : (
            <Chip
              icon={<Lightning size={18} color="#27b29b" weight="fill" />}
              label="Quick Voting"
              size="small"
              sx={{
                backgroundColor: prelineColors.slate[100],
                color: prelineColors.slate[700],
                fontWeight: 600,
                fontSize: '0.75rem',
                borderRadius: '100px',
                px: 1,
                height: 30,
                border: `1px solid ${prelineColors.slate[200]}`,
                '& .MuiChip-label': { px: 1 },
              }}
            />
          )}

          {/* STATUS BADGE */}
          <VotingStatus status={item.status} />
        </Box>

        {/* Card Title: SemiBold (600) */}
        <Typography
          variant="h6"
          sx={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: prelineColors.slate[700],
            mb: 0.75,
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
          }}
        >
          {item.title}
        </Typography>

        {/* Description */}
        {item.description && (
          <Typography
            variant="body2"
            sx={{
              color: prelineColors.slate[600],
              fontSize: '0.85rem',
              mb: 2.25,
              lineHeight: 1.45,
            }}
          >
            {item.description}
          </Typography>
        )}

        {/* Dual-Tile Metadata Box */}
        <Box
          sx={{
            backgroundColor: prelineColors.slate[50],
            borderRadius: '8px',
            p: 2,
            mb: 2.25,
            border: `1px solid ${prelineColors.slate[200]}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {isEvent ? (
            <>
              {/* Event Waktu Acara */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    flexShrink: 0,
                  }}
                >
                  <CalendarBlank size={18} color="#27b29b" weight="bold" />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontSize: '0.7rem', display: 'block', fontWeight: 500, lineHeight: 1.2 }}>
                    Event Date
                  </Typography>
                  <Typography variant="body2" sx={{ color: prelineColors.slate[700], fontWeight: 600, fontSize: '0.825rem' }}>
                    {item.eventDate}
                  </Typography>
                </Box>
              </Box>

              {item.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={18} color="#27b29b" weight="bold" />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontSize: '0.7rem', display: 'block', fontWeight: 500, lineHeight: 1.2 }}>
                      Location
                    </Typography>
                    <Typography variant="body2" sx={{ color: prelineColors.slate[700], fontWeight: 600, fontSize: '0.825rem' }}>
                      {item.location}
                    </Typography>
                  </Box>
                </Box>
              )}
            </>
          ) : (
            <>
              {/* Quick Voting Start Date */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    flexShrink: 0,
                  }}
                >
                  <CalendarBlank size={18} color="#27b29b" weight="bold" />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontSize: '0.7rem', display: 'block', fontWeight: 500, lineHeight: 1.2 }}>
                    Start Date
                  </Typography>
                  <Typography variant="body2" sx={{ color: prelineColors.slate[700], fontWeight: 600, fontSize: '0.825rem' }}>
                    {item.startDate}
                  </Typography>
                </Box>
              </Box>

              {/* Quick Voting Deadline */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    flexShrink: 0,
                  }}
                >
                  <Clock size={18} color="#27b29b" weight="bold" />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontSize: '0.7rem', display: 'block', fontWeight: 500, lineHeight: 1.2 }}>
                    Deadline
                  </Typography>
                  <Typography variant="body2" sx={{ color: prelineColors.slate[700], fontWeight: 600, fontSize: '0.825rem' }}>
                    {item.deadline}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>

        {/* Action Button: SemiBold (600) */}
        {isEvent ? (
          <Button
            variant="outlined"
            fullWidth
            endIcon={<CaretRight size={16} weight="bold" />}
            sx={{
              border: `1px solid ${prelineColors.slate[300]}`,
              color: prelineColors.slate[700],
              fontWeight: 600,
              fontSize: '0.875rem',
              py: 1.25,
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                border: `1px solid ${prelineColors.slate[300]}`,
                backgroundColor: 'transparent',
              },
            }}
          >
            View Details
          </Button>
        ) : (
          <>
            {(item.status === 'ongoing' || item.status === 'OPEN') && (
              item.userVoted && !hasNewUnansweredQuestions ? (
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => onSelectPoll(item)}
                  endIcon={<CaretRight size={16} weight="bold" />}
                  sx={{
                    border: `1px solid ${prelineColors.slate[300]}`,
                    color: prelineColors.slate[700],
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    py: 1.25,
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': {
                      border: `1px solid ${prelineColors.slate[300]}`,
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  View Details
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => onSelectPoll(item)}
                  endIcon={<ArrowRight size={18} weight="bold" />}
                  sx={{
                    py: 1.3,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    backgroundColor: '#27b29b',
                    color: '#ffffff',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: '#27b29b',
                      boxShadow: 'none',
                    },
                  }}
                >
                  {hasNewUnansweredQuestions ? 'Continue' : 'Vote Now'}
                </Button>
              )
            )}

            {(item.status === 'scheduled' || item.status === 'UPCOMING') && (
              <Button
                variant="outlined"
                fullWidth
                onClick={() => onSelectPoll(item)}
                endIcon={<CaretRight size={16} weight="bold" />}
                sx={{
                  border: `1px solid ${prelineColors.slate[300]}`,
                  color: prelineColors.slate[700],
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  py: 1.25,
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': {
                    border: `1px solid ${prelineColors.slate[300]}`,
                    backgroundColor: 'transparent',
                  },
                }}
              >
                View Details
              </Button>
            )}

            {(item.status === 'complete' || item.status === 'COMPLETED' || item.status === 'CLOSED') && (
              <Button
                variant="outlined"
                fullWidth
                onClick={() => onSelectPoll(item)}
                endIcon={<CaretRight size={16} weight="bold" />}
                sx={{
                  border: `1px solid ${prelineColors.slate[300]}`,
                  color: prelineColors.slate[700],
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  py: 1.25,
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': {
                    border: `1px solid ${prelineColors.slate[300]}`,
                    backgroundColor: 'transparent',
                  },
                }}
              >
                View Details
              </Button>
            )}
          </>
        )}
      </Box>
    </Card>
  );
}
