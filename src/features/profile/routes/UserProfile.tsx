import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline';

import userPhotoPlaceholder from '@/assets/portrait-placeholder.png';
import { Button } from '@/components/Elements';
import { useAuth } from '@/lib/auth';

import { ProfileLayout } from '../components';
import { useUserProfile } from '../hooks';
import { useFollowUnfollowUser } from '../hooks/useFollowUnfollowUser';
import { FollowUnfollowUserDTO } from '../types';

type UserProfileProps = {
  name: string;
};

export const UserProfile = ({ name }: UserProfileProps) => {
  const { user: me } = useAuth();
  const { data } = useUserProfile(name);
  const followUnfollowMutation = useFollowUnfollowUser(name);

  if (!me) return <></>;
  if (!data?.data.profile) return <></>;

  const profile = data.data.profile;
  const userImgSrc = profile.photo?.secure_url ? profile.photo.secure_url : userPhotoPlaceholder;

  const photoJSX = (
    <img
      src={userImgSrc}
      alt={profile.username}
      className="h-32 w-32 rounded-full"
      style={{ maxWidth: 'none' }}
    />
  );

  const isFollowing = Object.keys(profile.followers).includes(me.name);
  const dto: FollowUnfollowUserDTO = { id: profile.id, name: profile.name };
  const FollowButton = (
    <Button
      startIcon={<PlusCircleIcon className="h-5 w-5" />}
      size="sm"
      onClick={() => {
        followUnfollowMutation.mutate({ data: dto, shouldFollow: true });
      }}
    >
      フォローする
    </Button>
  );
  const UnfollowButton = (
    <Button
      startIcon={<MinusCircleIcon className="h-5 w-5" />}
      size="sm"
      onClick={() => {
        followUnfollowMutation.mutate({ data: dto, shouldFollow: false });
      }}
    >
      フォロー解除する
    </Button>
  );
  const editOrFollowJSX = isFollowing ? UnfollowButton : FollowButton;

  return <ProfileLayout photoJSX={photoJSX} editOrFollowJSX={editOrFollowJSX} profile={profile} />;
};
