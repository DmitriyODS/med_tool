import { Suspense } from 'react';
import Fallback from './components/fallback/fallback';
import { RouterProvider } from 'react-router-dom';
import Routes from './router';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
        <RouterProvider router={Routes} fallbackElement={<Fallback />} />
      </LocalizationProvider>
    </Suspense>
  );
}

export default App;
