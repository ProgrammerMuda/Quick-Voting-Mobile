import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Button,
  LinearProgress,
  AvatarGroup,
  Avatar,
  IconButton,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Clock,
  Users,
  ShareNetwork,
  LockKey,
  ShieldCheck,
  Tag,
} from '@phosphor-icons/react';
import { prelineColors } from '../theme/theme';

export default function PollCard({ poll, onVote }) {
  const [selectedOption, setSelectedOption] = useState(poll.userVotedOptionId || null);
  const [hasVoted, setHasVoted] = useState(Boolean(poll.userVotedOptionId));

  const totalVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0) + (hasVoted && !poll.userVotedOptionId ? 1 : 0);

  const handleSelectOption = (optionId) => {
    if (poll.isClosed || hasVoted) return;
    setSelectedOption(optionId);
  };

  const handleConfirmVote = () => {
    if (!selectedOption || hasVoted) return;
    setHasVoted(true);
    if (onVote) {
      onVote(poll.id, selectedOption);
    }
  };

  return (
    <Card
      sx={{
        mb: 2.5,
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
        },
      }}
    >
      {/* Category & Status Bar */}
      <CardContent sx={{ p: 2.5, pb: '16px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Chip
            icon={<Tag size={14} color={prelineColors.slate[600]} weight="bold" />}
            label={poll.category}
            size="small"
            sx={{
              backgroundColor: prelineColors.slate[100],
              color: prelineColors.slate[700],
              fontSize: '0.75rem',
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {poll.isClosed ? (
              <Chip
                icon={<LockKey size={14} weight="fill" />}
                label="Selesai"
                size="small"
                color="default"
                sx={{ backgroundColor: prelineColors.slate[200], color: prelineColors.slate[700], fontSize: '0.75rem' }}
              />
            ) : (
              <Chip
                icon={<Clock size={14} weight="fill" />}
                label={poll.timeLeft}
                size="small"
                sx={{
                  backgroundColor: 'rgba(39, 178, 155, 0.12)',
                  color: '#1e8f7c',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              />
            )}
          </Box>
        </Box>

        {/* Poll Title & Description */}
        <Typography variant="h6" sx={{ fontSize: '1rem', color: prelineColors.slate[900], mb: 0.5, lineHeight: 1.35 }}>
          {poll.title}
        </Typography>
        <Typography variant="body2" sx={{ color: prelineColors.slate[500], fontSize: '0.825rem', mb: 2 }}>
          {poll.description}
        </Typography>

        {/* Poll Options List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 2 }}>
          {poll.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const currentVotes = option.votes + (hasVoted && option.id === selectedOption && !poll.userVotedOptionId ? 1 : 0);
            const percentage = totalVotes > 0 ? Math.round((currentVotes / totalVotes) * 100) : 0;

            return (
              <Box
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                sx={{
                  position: 'relative',
                  p: 1.5,
                  borderRadius: '12px',
                  border: `1.5px solid ${
                    isSelected ? '#27b29b' : prelineColors.slate[200]
                  }`,
                  backgroundColor: isSelected ? 'rgba(39, 178, 155, 0.04)' : '#ffffff',
                  cursor: hasVoted || poll.isClosed ? 'default' : 'pointer',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden',
                  '&:hover': {
                    borderColor: hasVoted || poll.isClosed ? undefined : '#27b29b',
                  },
                }}
              >
                {/* Background Progress Fill when voted */}
                {hasVoted && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      width: `${percentage}%`,
                      backgroundColor: isSelected ? 'rgba(39, 178, 155, 0.15)' : prelineColors.slate[100],
                      transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: 0,
                    }}
                  />
                )}

                <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        border: `2px solid ${isSelected ? '#27b29b' : prelineColors.slate[300]}`,
                        backgroundColor: isSelected ? '#27b29b' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {isSelected && <CheckCircle size={16} color="#ffffff" weight="fill" />}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: isSelected ? 600 : 500,
                        color: isSelected ? prelineColors.slate[900] : prelineColors.slate[700],
                        fontSize: '0.875rem',
                      }}
                    >
                      {option.text}
                    </Typography>
                  </Box>

                  {hasVoted && (
                    <Typography variant="body2" sx={{ fontWeight: 700, color: isSelected ? '#1e8f7c' : prelineColors.slate[600], fontSize: '0.85rem' }}>
                      {percentage}%
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Submit Vote Button if not yet voted */}
        {!hasVoted && !poll.isClosed && (
          <Button
            variant="contained"
            fullWidth
            disabled={!selectedOption}
            onClick={handleConfirmVote}
            startIcon={<ShieldCheck size={18} weight="bold" />}
            sx={{ mb: 2, py: 1.2 }}
          >
            Kirim Suara Anda
          </Button>
        )}

        <Divider sx={{ my: 1.5, borderColor: prelineColors.slate[100] }} />

        {/* Card Footer Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Users size={16} color={prelineColors.slate[500]} weight="bold" />
            <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontWeight: 600 }}>
              {totalVotes.toLocaleString()} Total Suara
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 22, height: 22, fontSize: '0.65rem' } }}>
              <Avatar alt="User A" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80" />
              <Avatar alt="User B" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80" />
              <Avatar alt="User C" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80" />
            </AvatarGroup>
            <IconButton size="small" sx={{ color: prelineColors.slate[500] }}>
              <ShareNetwork size={18} weight="bold" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
