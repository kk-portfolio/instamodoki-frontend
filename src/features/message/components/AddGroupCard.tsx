import userPhotoPlaceholder from '@/assets/portrait-placeholder.png';
import { useUserProfile } from '@/features/profile/hooks';
import { useAuth } from '@/lib/auth';

import { useCreateGroup } from '../hooks';

type UserCardProps = {
  name: string;
};

export const AddGroupCard = ({ name }: UserCardProps) => {
  const { user: me } = useAuth();
  const { data } = useUserProfile(name);
  const profile = data?.data.profile;
  const createGroupMutate = useCreateGroup();

  if (!me) return <></>;
  if (!profile) return <></>;
  if (me.name === profile.name) return <></>;

  const imageSource = profile.photo.secure_url ? profile.photo.secure_url : userPhotoPlaceholder;
  const isFollowing = Object.keys(profile.followers).includes(me.name);

  return (
    <>
      <div
        className="overflow-hidden shadow-lg bg-gray-100 hover:opacity-80 my-1 cursor-pointer"
        onClick={() => {
          createGroupMutate.mutate({ userId: profile.id });
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 pl-2 pt-2">
            <img src={imageSource} alt="" className="w-10 h-10 rounded-full" />
            <span className="text-xl">{profile.username}</span>
          </div>

          {isFollowing && <div className="p-1 mr-3 text-blue-700">フォロー中</div>}
        </div>
        <div className="text-gray-600 text-sm px-2 py-1">{profile.bio}</div>
      </div>
    </>
  );
};
