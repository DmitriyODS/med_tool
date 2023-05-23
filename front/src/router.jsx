import React from 'react';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrPage from './components/errPage/ErrPage';
import { AuthUrl, BaseUrl, DiaryUrl, DiseaseUrl, StatisticsUrl } from './globals/urlPages';

const Home = lazy(() => import('./pages/home/Home'));
const Auth = lazy(() => import('./pages/auth/Auth'));
const Diary = lazy(() => import('./pages/diary/Diary'));
const Disease = lazy(() => import('./pages/disease/Disease'));
const Statistics = lazy(() => import('./pages/statistics/Statistics'));

const Routes = createBrowserRouter([
  {
    path: BaseUrl,
    element: <Home />,
    errorElement: <ErrPage />,
    children: [
      {
        path: DiaryUrl,
        element: <Diary />,
      },
      {
        path: DiseaseUrl,
        element: <Disease />,
      },
      {
        path: StatisticsUrl,
        element: <Statistics />,
      },
    ],
  },
  {
    path: AuthUrl,
    element: <Auth />,
  },
]);

export default Routes;
