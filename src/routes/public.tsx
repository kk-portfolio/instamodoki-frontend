import { ROUTER_BASENAME } from '@/config';
import { lazyImport } from '@/utils/lazyImport';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

export const publicRoutes = [
  {
    path: `${ROUTER_BASENAME}auth/*`,
    element: <AuthRoutes />,
  },
];
