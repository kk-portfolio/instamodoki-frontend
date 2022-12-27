import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { Button } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';
import storage from '@/utils/storage';

import { UserCard } from '../components';
import { useSearchUser } from '../hooks';

export const Search = () => {
  const [searchText, setSearchText] = useState<string>(storage.getValue('UserSearchQuery'));

  const { data } = useSearchUser(searchText);

  useEffect(() => {
    storage.setValue('UserSearchQuery', searchText);
  }, [searchText]);

  return (
    <ContentLayout title="Search">
      <div className="mt-4 w-full sm:w-4/5 mx-auto">
        <div className="flex ">
          <input
            type="text"
            className={clsx(
              'w-full bg-white border border-gray-300 text-gray-900 text-xs sm:text-sm md:text-base lg:text-lg ',
              'focus:ring-blue-500 focus:border-blue-500 block  p-2.5 '
            )}
            defaultValue={''}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="検索したいユーザー名を入力"
          />
          <Button
            size="sm"
            variant="inverse"
            className="w-10 rounded-none"
            onClick={() => {
              setSearchText('');
            }}
          >
            ×
          </Button>
        </div>
        <div className="grid gap-4 grid-cols-1 mt-8">
          {data?.users.map((user, index) => {
            return <UserCard name={user.name} key={index} />;
          })}
        </div>
      </div>
    </ContentLayout>
  );
};
