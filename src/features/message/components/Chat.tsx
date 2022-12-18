import React, { useContext, useState } from 'react';
import { FiSend } from 'react-icons/fi';

import userPhotoPlaceholder from '@/assets/portrait-placeholder.png';
import { UserProfile } from '@/features/auth';
import { useAuth } from '@/lib/auth';
import { formatDateDistance } from '@/utils/format';

import { useGroup, usePostMessage } from '../hooks';
import { useMessage } from '../hooks/useMessage';
import { MessageContext } from '../providers';
import { Message } from '../types';

const NotSelected = () => {
  return (
    <>
      <div className="w-full h-full border border-gray-300 flex justify-center items-center text-pink-600">
        <div>
          <div className="w-fit mx-auto mb-2">
            <FiSend className="w-16 h-16" />
          </div>
          メッセージの宛先を選択してください
        </div>
      </div>
    </>
  );
};

type MessageBaloonProps = {
  message: Message;
  destinationUser: UserProfile;
};

const MessageBaloon = ({ message, destinationUser }: MessageBaloonProps) => {
  const { user: me } = useAuth();

  if (!me) return <></>;

  const destinationUserPhotoURL = destinationUser.photo.secure_url
    ? destinationUser.photo.secure_url
    : userPhotoPlaceholder;

  return message.sender === me.id ? (
    <div className="w-full flex justify-end items-center p-2 mt-2">
      <div className="w-2/12 text-xs text-right m-1">
        {formatDateDistance(new Date(message.createdAt))}
      </div>
      <div className="w-3/5  bg-pink-200 p-1 rounded-xl">{message.message}</div>
    </div>
  ) : (
    <div className="w-full flex justify-start items-center p-2">
      <div className="w-1/12">
        <img src={destinationUserPhotoURL} className="rounded-full" />
      </div>
      <div className="w-7/12  bg-pink-300 p-1 rounded-xl">{message.message}</div>
      <div className="w-2/12 text-xs m-1">{formatDateDistance(new Date(message.createdAt))}</div>
    </div>
  );
};

export const Chat = () => {
  const { activeGroupId } = useContext(MessageContext);
  const { user: me } = useAuth();
  const { data: groupData } = useGroup();
  const { data: messageData } = useMessage(activeGroupId, true);
  const postMessageMutate = usePostMessage(activeGroupId);
  const [newMessage, setNewMessage] = useState('');

  const groups = groupData?.groups;
  if (!groups) return <NotSelected />;

  const messages = messageData?.messages ? messageData?.messages : [];
  if (!messages) return <NotSelected />;

  const activeGroup = groups.filter((group) => group._id === activeGroupId)[0];
  if (!activeGroup) return <NotSelected />;

  const destinationUser = activeGroup.users.filter((user) => user.name !== me?.name)[0];

  const handleSubmit = () => {
    postMessageMutate.mutate({
      groupId: activeGroupId,
      destinationUserId: destinationUser.id,
      message: newMessage,
    });
    setNewMessage('');
  };

  const destinationUserPhotoURL = destinationUser.photo.secure_url
    ? destinationUser.photo.secure_url
    : userPhotoPlaceholder;

  return (
    <>
      <div className="flex justify-between items-center w-full h-12 border border-gray-300">
        <div className="w-1/6 flex justify-center">
          <img src={destinationUserPhotoURL} className="w-10 h-10 rounded-full" />
        </div>
        <div className="w-5/6 text-center text-xl">{destinationUser.username}</div>
      </div>

      <div
        className="w-full  border border-gray-300 bg-pink-50"
        style={{ height: 'calc(100% - 96px)' }}
      >
        <div>
          {messages?.map((message, index) => (
            <MessageBaloon message={message} destinationUser={destinationUser} key={index} />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center w-full h-12 border border-gray-300">
        <div className="h-full" style={{ width: 'calc(100% - 14px )' }}>
          <input
            type="text"
            placeholder="メッセージ"
            className="h-full w-full"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing || e.key !== 'Enter') return;
              handleSubmit();
            }}
          />
        </div>
        <FiSend
          className={`w-10 h-10 p-2 my-1 mr-2 ${
            newMessage.length > 0 ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};
