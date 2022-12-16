import { ROUTER_BASENAME } from '@/config';
import { useUserProfile } from '@/features/profile/hooks';
import { useFollowUnfollowUser } from '@/features/profile/hooks/useFollowUnfollowUser';
import { FollowUnfollowUserDTO } from '@/features/profile/types';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import userPhotoPlaceholder from '@/assets/portrait-placeholder.png';
import { IconButton } from '.';
import { MouseOverPopoverProvider } from '@/components/Elements';

type UserCardProps = {
  name: string;
};

export const UserCard = ({ name }: UserCardProps) => {
  const navigate = useNavigate();
  const { user: me } = useAuth();
  const { data } = useUserProfile(name);
  const profile = data?.data.profile;
  const followUnfollowMutation = useFollowUnfollowUser(name);

  if (!me) return <></>;
  if (!profile) return <></>;
  if (me.name === profile.name) return <></>;

  const imageSource = profile.photo.secure_url ? profile.photo.secure_url : userPhotoPlaceholder;

  const isFollowing = Object.keys(profile.followers).includes(me.name);
  const dto: FollowUnfollowUserDTO = { id: profile.id, name: profile.name };
  const FollowButton = (
    <div className="p-2">
      <MouseOverPopoverProvider
        message="フォロー"
        anchorOriginHorizontal="right"
        transformOriginHorizontal="left"
      >
        <IconButton
          heroIconName="PlusCircleIcon"
          onClick={() => {
            followUnfollowMutation.mutate({ data: dto, shouldFollow: true });
          }}
        />
      </MouseOverPopoverProvider>
    </div>
  );
  const UnfollowButton = (
    <div className="p-2">
      <MouseOverPopoverProvider
        message="フォロー解除"
        anchorOriginHorizontal="right"
        transformOriginHorizontal="left"
      >
        <IconButton
          heroIconName="MinusCircleIcon"
          onClick={() => {
            followUnfollowMutation.mutate({ data: dto, shouldFollow: false });
          }}
        />
      </MouseOverPopoverProvider>
    </div>
  );

  return (
    <>
      <div className=" rounded-lg overflow-hidden shadow-lg bg-gray-50">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-2 pl-2 pt-2 cursor-pointer"
            onClick={() => {
              navigate(`${ROUTER_BASENAME}app/profile/${profile.name}`);
            }}
          >
            <img src={imageSource} alt="" className="w-10 h-10 rounded-full" />
            <span className="text-xl">{profile.username}</span>
          </div>
          {isFollowing ? UnfollowButton : FollowButton}
        </div>
        <div className="flex justify-center gap-4 text-gray-600 text-sm">
          <div>投稿：{profile.posts.length}件</div>
          <div>フォロワー: {Object.keys(profile.followers).length}人</div>
          <div>フォロー中：{Object.keys(profile.following).length}人</div>
        </div>
        <div className="text-gray-600 text-sm px-2 py-3">{profile.bio}</div>
      </div>
    </>
  );
};
