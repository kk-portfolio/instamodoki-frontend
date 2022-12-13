import { ROUTER_BASENAME } from '@/config';
import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <Layout title="ログイン">
      <LoginForm onSuccess={() => navigate(`${ROUTER_BASENAME}app/home`)} />
    </Layout>
  );
};
