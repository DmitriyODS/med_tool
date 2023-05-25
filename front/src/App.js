import { Suspense } from 'react';
import Fallback from './components/fallback/fallback';
import { RouterProvider } from 'react-router-dom';
import Routes from './router';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
        <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
          <RouterProvider router={Routes} fallbackElement={<Fallback />} />
        </SnackbarProvider>
      </LocalizationProvider>
    </Suspense>
  );
}

export default App;
