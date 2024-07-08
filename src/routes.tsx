import DetailsPage from './pages/DetailsPage';
import ModuleListPage from './pages/ModuleListPage';

interface Route {
  path: string;
  element: JSX.Element;
}

export const ROUTES: Array<Route> = [
  {
    path: '/',
    element: <ModuleListPage />,
  },
  {
    path: '/:id',
    element: <DetailsPage />,
  },
  // {
  //   path: '/:id/history',
  //   element: <ModuleHistoricalDataPage />,
  // },
];
