import { createTheme } from '@mui/material';

const BaseTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3AA464',
      light: '#3eac69',
      dark: '#2f8f56',
      contrastText: '#103A21',
    },
    secondary: {
      main: '#369dc9',
      light: '#41acda',
      dark: '#2e90bb',
      contrastText: '#093547',
    },
    background: {
      default: '#292C33',
      paper: '#343841',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
          padding: '1rem',
        },
      },
    },
  },
});

export default BaseTheme;
