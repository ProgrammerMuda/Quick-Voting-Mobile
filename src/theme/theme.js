import { createTheme } from '@mui/material/styles';

// Preline.co Slate & Accent Color Tokens
export const prelineColors = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  accent: {
    indigo: '#6366f1',
    indigoDark: '#4f46e5',
    blue: '#3b82f6',
    emerald: '#10b981',
    amber: '#f59e0b',
    rose: '#f43f5e',
  }
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#27b29b',
      light: '#4dc4b0',
      dark: '#1e8f7c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: prelineColors.accent.indigo,
      light: '#818cf8',
      dark: prelineColors.accent.indigoDark,
      contrastText: '#ffffff',
    },
    background: {
      default: prelineColors.slate[50],
      paper: '#ffffff',
    },
    text: {
      primary: prelineColors.slate[700],
      secondary: prelineColors.slate[500],
      disabled: prelineColors.slate[400],
    },
    divider: prelineColors.slate[200],
    info: {
      main: prelineColors.accent.blue,
    },
    success: {
      main: prelineColors.accent.emerald,
    },
    warning: {
      main: prelineColors.accent.amber,
    },
    error: {
      main: prelineColors.accent.rose,
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: 'none',
          padding: '10px 20px',
          fontWeight: 600,
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          border: `1px solid ${prelineColors.slate[200]}`,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: '8px',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          backgroundColor: prelineColors.slate[100],
        },
        bar: {
          borderRadius: '6px',
        },
      },
    },
  },
});

export default theme;
