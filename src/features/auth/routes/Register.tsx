import { useNavigate } from 'react-router-dom';

import { ROUTER_BASENAME } from '@/config';

import { Layout } from '../components/Layout';
import { RegisterForm } from '../components/RegisterForm';

export const Register = () => {
  const navigate = useNavigate();

  return (
    <Layout title="アカウントを登録">
      <RegisterForm onSuccess={() => navigate(`${ROUTER_BASENAME}app/home`)} />
    </Layout>
  );
};
