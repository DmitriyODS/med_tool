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
      main: '#369dc9',
      light: '#4fa2c5',
      dark: '#216886',
      contrastText: '#093547'
    },
    background: {
      default: '#292C33',
      paper: '#343841',
    },
  },
});

export default BaseTheme;
