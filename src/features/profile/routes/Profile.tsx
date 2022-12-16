import { useAuth } from '@/lib/auth';
import { useUserProfile } from '../hooks';
import { useParams } from 'react-router-dom';
import { NotFound, UserProfile } from './';
import { MyProfile } from './MyProfile';

type ProfileParamsType = {
  name?: string;
};

export const Profile = () => {
  const { user: me } = useAuth();
  const myName = me?.name ? me.name : '';

  const params: ProfileParamsType = useParams<ProfileParamsType>();
  const targetName = params.name ? params.name : myName;

  const { data } = useUserProfile(targetName);

  if (!me) return null;

  if (!data?.data?.profile) {
    return <NotFound />;
  }
  if (targetName === myName) {
    return <MyProfile />;
  }
  return <UserProfile name={targetName} />;
};
