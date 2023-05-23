import { Suspense } from 'react';
import Fallback from './components/fallback/fallback';
import { RouterProvider } from 'react-router-dom';
import Routes from './router';

function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <RouterProvider router={Routes} fallbackElement={<Fallback />} />
    </Suspense>
  );
}

export default App;
