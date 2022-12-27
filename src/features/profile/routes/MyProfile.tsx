import userPhotoPlaceholder from '@/assets/portrait-placeholder.png';
import { MouseOverPopoverProvider } from '@/components/Elements';

import { ProfileLayout, UpdateProfile, UpdateProfilePhoto } from '../components';
import { useMyProfile } from '../hooks';

export const MyProfile = () => {
  const { data } = useMyProfile();

  if (!data?.profile) return <></>;

  const profile = data.profile;
  const userImgSrc = profile.photo?.secure_url ? profile.photo.secure_url : userPhotoPlaceholder;

  const photoJSX = (
    <UpdateProfilePhoto>
      <MouseOverPopoverProvider message="プロフィール写真を変更">
        <img
          src={userImgSrc}
          alt={profile.username}
          className="w-12 h-12 md:w-20 md:h-20 lg:w-32 lg:h-32 rounded-full"
          style={{ maxWidth: 'none' }}
        />
      </MouseOverPopoverProvider>
    </UpdateProfilePhoto>
  );

  const editOrFollowJSX = <UpdateProfile />;

  return (
    <ProfileLayout
      pageTitle="Myプロフィール"
      photoJSX={photoJSX}
      editOrFollowJSX={editOrFollowJSX}
      profile={profile}
    />
  );
};
