import { createTheme } from '@mui/material';
import { ruRU } from '@mui/x-date-pickers/locales';

const BaseTheme = createTheme(
  {
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
      MuiDialog: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(32,26,26,0.6)',
          },
          paper: {
            padding: '1rem',
            backgroundImage: 'none',
            boxShadow: 'none',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            padding: '0 0 0 2rem',
            color: '#daeeff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '2rem',
            fontWeight: 'lighter',
          },
        },
      },
    },
  },
  ruRU
);

export default BaseTheme;
