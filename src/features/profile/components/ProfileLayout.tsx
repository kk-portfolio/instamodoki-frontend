import { MouseOverPopoverProvider } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';
import { UserProfile } from '@/features/auth';
import React, { ReactNode } from 'react';
import { UpdateProfile, UpdateProfilePhoto } from '.';
import userPhotoPlaceholder from '@/assets/portrait-placeholder.png';
import { useNavigate } from 'react-router-dom';
import { ROUTER_BASENAME } from '@/config';
import { formatDateDistance } from '@/utils/format';

type EntryProps = {
  label: string;
  value: string;
};
const Entry = ({ label, value }: EntryProps) => (
  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      {value && value.split('\n').map((line, index) => <p key={index}>{line}</p>)}
    </dd>
  </div>
);

type ProfileLayoutProps = {
  pageTitle?: string;
  photoJSX: ReactNode;
  editOrFollowJSX: ReactNode;
  profile: UserProfile;
};

export const ProfileLayout = ({
  pageTitle = '',
  photoJSX,
  editOrFollowJSX,
  profile,
}: ProfileLayoutProps) => {
  const navigate = useNavigate();
  return (
    <ContentLayout title={pageTitle}>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex">
            {photoJSX}
            <div className="w-full ml-8">
              <div className="flex justify-between">
                <h3 className="text-3xl leading-8 font-medium text-gray-900">{profile.username}</h3>
                {editOrFollowJSX}
              </div>
              <div className="flex justify-start gap-8 mt-6">
                <div className="text-lg">投稿：{profile.posts.length}件</div>
                <div className="text-lg">フォロワー: {Object.keys(profile.followers).length}人</div>
                <div className="text-lg">フォロー中：{Object.keys(profile.following).length}人</div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <Entry label="自己紹介" value={profile.bio} />
            <Entry label="Webサイト" value={profile.website} />
          </dl>
        </div>
      </div>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-8">
        {profile.posts.map((post, index) => {
          return (
            <div className="my-1">
              <img
                key={index}
                src={post.image[0].url}
                className="shadow-xl rounded-lg cursor-pointer"
                onClick={() => {
                  navigate(`${ROUTER_BASENAME}app/post/${post.id}`);
                }}
              />
              <div className="text-gray-500 text-sm mt-2">
                {formatDateDistance(new Date(post.createdAt))}
              </div>
            </div>
          );
        })}
      </div>
    </ContentLayout>
  );
};
