import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Warning, ArrowClockwise } from '@phosphor-icons/react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            p: 3,
            textAlign: 'center',
            backgroundColor: '#ffffff',
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Warning size={32} color="#ef4444" weight="fill" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
            Something went wrong
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mb: 2.5, maxWidth: 320, fontSize: '0.85rem' }}>
            {this.state.error?.message || 'The application encountered an unexpected error while loading.'}
          </Typography>
          <Button
            variant="contained"
            onClick={this.handleReset}
            startIcon={<ArrowClockwise size={18} weight="bold" />}
            sx={{
              backgroundColor: '#27b29b',
              color: '#ffffff',
              fontWeight: 600,
              borderRadius: '10px',
              textTransform: 'none',
              px: 3,
              py: 1,
            }}
          >
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
