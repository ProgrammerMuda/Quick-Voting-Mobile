import React from 'react';
import { Box, Paper, BottomNavigation, BottomNavigationAction, Fab } from '@mui/material';
import { House, CheckSquare, ChartBar, User, Plus } from '@phosphor-icons/react';
import { prelineColors } from '../theme/theme';

export default function BottomNav({ activeTab, onChangeTab, onOpenCreateModal }) {
  return (
    <Paper
      elevation={8}
      sx={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#ffffff',
        borderTop: `1px solid ${prelineColors.slate[200]}`,
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {/* Center Floating Action Button for Creating Poll */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={onOpenCreateModal}
          sx={{
            position: 'absolute',
            top: -24,
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 6px 16px rgba(39, 178, 155, 0.4)',
            '&:hover': {
              backgroundColor: '#1e8f7c',
            },
          }}
        >
          <Plus size={24} color="#ffffff" weight="bold" />
        </Fab>

        <BottomNavigation
          value={activeTab}
          onChange={(event, newValue) => {
            onChangeTab(newValue);
          }}
          showLabels
          sx={{
            height: 64,
            '& .MuiBottomNavigationAction-root': {
              color: prelineColors.slate[500],
              minWidth: 'auto',
              padding: '6px 0',
              '&.Mui-selected': {
                color: '#27b29b',
                fontWeight: 700,
              },
            },
          }}
        >
          <BottomNavigationAction
            label="Beranda"
            value="home"
            icon={<House size={22} weight={activeTab === 'home' ? 'fill' : 'regular'} />}
          />
          <BottomNavigationAction
            label="Polls"
            value="polls"
            icon={<CheckSquare size={22} weight={activeTab === 'polls' ? 'fill' : 'regular'} />}
          />
          
          {/* Dummy action for FAB spacing */}
          <BottomNavigationAction
            disabled
            sx={{ opacity: 0 }}
          />

          <BottomNavigationAction
            label="Statistik"
            value="stats"
            icon={<ChartBar size={22} weight={activeTab === 'stats' ? 'fill' : 'regular'} />}
          />
          <BottomNavigationAction
            label="Profil"
            value="profile"
            icon={<User size={22} weight={activeTab === 'profile' ? 'fill' : 'regular'} />}
          />
        </BottomNavigation>
      </Box>
    </Paper>
  );
}
