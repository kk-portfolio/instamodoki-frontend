import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { ROUTER_BASENAME } from '@/config';
import { lazyImport } from '@/utils/lazyImport';

const { Home } = lazyImport(() => import('@/features/home'), 'Home');
const { Search } = lazyImport(() => import('@/features/search'), 'Search');
const { Message } = lazyImport(() => import('@/features/message'), 'Message');
const { Notification } = lazyImport(() => import('@/features/notification'), 'Notification');
const { Profile } = lazyImport(() => import('@/features/profile'), 'Profile');
const { PostDetail } = lazyImport(() => import('@/features/post'), 'PostDetail');

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
    path: `${ROUTER_BASENAME}app`,
    element: <App />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'search', element: <Search /> },
      { path: 'message', element: <Message /> },
      { path: 'notification', element: <Notification /> },
      {
        path: 'profile',
        element: <Profile />,
        children: [{ path: ':name', element: <Profile /> }],
      },
      {
        path: 'post/:id',
        element: <PostDetail />,
      },
      // { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
