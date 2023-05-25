import React from 'react';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrPage from './components/errPage/ErrPage';
import { UrlPages } from './globals/consts';

const Home = lazy(() => import('./pages/home/Home'));
const Auth = lazy(() => import('./pages/auth/Auth'));
const Diary = lazy(() => import('./pages/diary/Diary'));
const Disease = lazy(() => import('./pages/disease/Disease'));
const Statistics = lazy(() => import('./pages/statistics/Statistics'));

const Routes = createBrowserRouter([
  {
    path: UrlPages.Base,
    element: <Home />,
    errorElement: <ErrPage />,
    children: [
      {
        path: UrlPages.Diary,
        element: <Diary />,
      },
      {
        path: UrlPages.Disease,
        element: <Disease />,
      },
      {
        path: UrlPages.Statistics,
        element: <Statistics />,
      },
    ],
  },
  {
    path: UrlPages.Auth,
    element: <Auth />,
  },
]);

export default Routes;
