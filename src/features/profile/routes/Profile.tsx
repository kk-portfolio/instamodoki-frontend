import { Spinner } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
import { ArchiveIcon } from '@heroicons/react/outline';
import { useProfile } from '../hooks';
import { UpdateProfile } from '../components';
import userPhotoPlaceholder from '@/assets/portrait-placeholder.png';

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

export const Profile = () => {
  const { user } = useAuth();
  const { isLoading, data } = useProfile({});

  if (!user) return null;

  if (isLoading) {
    <div className="w-full h-48 flex justify-center items-center">
      <Spinner size="lg" />
    </div>;
  }

  if (!data?.profile)
    return (
      <div
        role="list"
        aria-label="comments"
        className="bg-white text-gray-500 h-40 flex justify-center items-center flex-col"
      >
        <ArchiveIcon className="h-10 w-10" />
        <h4>No Data</h4>
      </div>
    );

  const profile = data.profile;
  const userImgSrc = profile.photo?.secure_url ? profile.photo.secure_url : userPhotoPlaceholder;

  return (
    <ContentLayout title="プロフィール">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex">
            <img src={userImgSrc} alt={profile.username} className="h-32 w-32 rounded-full" />
            <div className="w-full ml-8">
              <div className="flex justify-between">
                <h3 className="text-3xl leading-8 font-medium text-gray-900">{profile.username}</h3>
                <UpdateProfile />
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
            {/* <Entry label="ユーザー名" value={user.username} /> */}
            <Entry label="自己紹介" value={profile.bio} />
            <Entry label="Webサイト" value={profile.website} />
          </dl>
        </div>
      </div>
    </ContentLayout>
  );
};
