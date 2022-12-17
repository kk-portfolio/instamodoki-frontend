import { useAuth } from '@/lib/auth';
import { useContext } from 'react';
import { useGroup } from '../hooks';
import { MessageContext } from '../providers';
import { AddGroup } from './AddGroup';
import userPhotoPlaceholder from '@/assets/portrait-placeholder.png';

export const GroupSelector = () => {
  const { user: me } = useAuth();
  const { data } = useGroup();
  const { activeGroupId, setActiveGroupId } = useContext(MessageContext);

  const groups = data?.groups;

  if (!me) return <></>;
  if (!groups) return <></>;

  return (
    <>
      <div className="w-full h-12 flex justify-end items-center border border-gray-300">
        <AddGroup />
      </div>

      <div className="w-full border border-gray-300" style={{ height: 'calc(100% - 48px)' }}>
        {groups.map((group, index) => {
          const destinationUser = group.users.filter((user) => user.name !== me?.name)[0];
          const destinationUserPhotoURL = destinationUser.photo.secure_url
            ? destinationUser.photo.secure_url
            : userPhotoPlaceholder;

          return (
            <div
              onClick={() => {
                setActiveGroupId(group._id);
              }}
              className={`p-2 cursor-pointer flex justify-start items-center ${
                activeGroupId === group._id ? 'bg-pink-100' : 'bg-gray-100'
              } hover:opacity-80`}
              key={index}
            >
              <img src={destinationUserPhotoURL} className="w-10 h-10 rounded-full" />
              <div>{group.users.filter((user) => user.id !== me.id)[0].username}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
