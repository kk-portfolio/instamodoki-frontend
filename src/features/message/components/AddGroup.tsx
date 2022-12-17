import { Button, Modal, MouseOverPopoverProvider } from '@/components/Elements';
import { useSearchUser } from '@/features/search/hooks';
import { useAuth } from '@/lib/auth';
import clsx from 'clsx';
import React, { useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { useGroup } from '../hooks';
import { AddGroupCard } from './AddGroupCard';

export const AddGroup = () => {
  const { user: me } = useAuth();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { data } = useSearchUser(searchText);
  const { data: groupData } = useGroup();

  let groupExistsUsers = groupData?.groups
    .map((group) => {
      return group.users.map((user) => user.name).filter((name) => name !== me?.name);
    })
    .flat();
  groupExistsUsers = [...new Set(groupExistsUsers)]; // 重複を排除

  const myFollowingUsers = me?.following ? Object.keys(me?.following) : [];
  const foundUsers = data?.users.map((user) => user.name);

  const users = searchText.length === 0 ? myFollowingUsers : foundUsers;

  return (
    <>
      <MouseOverPopoverProvider
        message="宛先を追加"
        anchorOriginHorizontal="left"
        transformOriginHorizontal="right"
      >
        <BsPencilSquare
          className="w-10 h-10 p-2 my-1 mr-2 cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        />
      </MouseOverPopoverProvider>

      <Modal
        open={open}
        title="宛先を追加"
        onClickOutside={() => {
          setOpen(false);
        }}
      >
        <div className="flex h-8 my-4">
          <input
            type="text"
            className={clsx(
              'w-full bg-white border border-gray-300 text-gray-900',
              'focus:ring-blue-500 focus:border-blue-500 block  p-2.5 '
            )}
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

        <div style={{ height: '70vh' }} className="">
          {users ? (
            users
              .filter((user) => !groupExistsUsers?.includes(user))
              .map((user, index) => {
                return (
                  <div
                    onClick={() => {
                      setOpen(false);
                    }}
                    key={index}
                  >
                    <AddGroupCard name={user} />
                  </div>
                );
              })
          ) : (
            <></>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              setOpen(false);
            }}
          >
            閉じる
          </Button>
        </div>
      </Modal>
    </>
  );
};
