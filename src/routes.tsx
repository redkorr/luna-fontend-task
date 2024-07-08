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
  // {
  //   path: '/:id',
  //   element: <ModuleDetailsPage />,
  // },
  // {
  //   path: '/:id/history',
  //   element: <ModuleHistoricalDataPage />,
  // },
];
