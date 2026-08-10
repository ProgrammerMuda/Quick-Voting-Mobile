import React from 'react';
import { Box, Typography, IconButton, Badge, Avatar } from '@mui/material';
import { Bell, MagnifyingGlass, Sparkle } from '@phosphor-icons/react';
import { prelineColors } from '../theme/theme';

export default function Header({ user = { name: 'Rian Pratama', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' } }) {
  return (
    <Box
      sx={{
        p: 2.5,
        pb: 2,
        backgroundColor: '#ffffff',
        borderBottom: `1px solid ${prelineColors.slate[200]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{
            width: 44,
            height: 44,
            border: `2px solid #27b29b`,
            boxShadow: '0 2px 8px rgba(39, 178, 155, 0.2)',
          }}
        />
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: prelineColors.slate[500], fontSize: '0.75rem', fontWeight: 500 }}>
              Welcome
            </Typography>
            <Sparkle size={14} color="#27b29b" weight="fill" />
          </Box>
          <Typography variant="subtitle1" sx={{ color: prelineColors.slate[900], fontWeight: 700, lineHeight: 1.2 }}>
            {user.name}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <IconButton
          sx={{
            backgroundColor: prelineColors.slate[100],
            color: prelineColors.slate[700],
            '&:hover': { backgroundColor: prelineColors.slate[200] },
          }}
        >
          <MagnifyingGlass size={20} weight="bold" />
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: prelineColors.slate[100],
            color: prelineColors.slate[700],
            '&:hover': { backgroundColor: prelineColors.slate[200] },
          }}
        >
          <Badge badgeContent={3} color="primary">
            <Bell size={20} weight="bold" />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
}
