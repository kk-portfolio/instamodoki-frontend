import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';

const { Home } = lazyImport(() => import('@/features/home'), 'Home');
const { Search } = lazyImport(() => import('@/features/search'), 'Search');
const { Message } = lazyImport(() => import('@/features/message'), 'Message');
const { Notification } = lazyImport(() => import('@/features/notification'), 'Notification');
const { Create } = lazyImport(() => import('@/features/create'), 'Create');

const { Profile } = lazyImport(() => import('@/features/profile'), 'Profile');

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'search', element: <Search /> },
      { path: 'message', element: <Message /> },
      { path: 'notification', element: <Notification /> },
      { path: 'create', element: <Create /> },
      { path: 'profile', element: <Profile /> },
      // { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
