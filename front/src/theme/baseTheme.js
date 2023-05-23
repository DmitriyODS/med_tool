import { createTheme } from '@mui/material';

const BaseTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3AA464',
      light: '#50b779',
      dark: '#1c7740',
      contrastText: '#103A21'
    },
    secondary: {
      main: '#388CB0',
      light: '#4fa2c5',
      dark: '#216886',
      contrastText: '#093547'
    },
    background: {
      default: '#292C33',
      paper: '#3C414B',
    },
  },
});

export default BaseTheme;
