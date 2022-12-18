import clsx from 'clsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ContentLayout } from '@/components/Layout';
import { ROUTER_BASENAME } from '@/config';
import { formatDateDistance } from '@/utils/format';

import { useFollowLikeNotification } from '../hooks';
import { FollowLikeNotification } from '../types';

type NotificationCardProps = {
  notification: FollowLikeNotification;
};

const NotificationCard = ({ notification }: NotificationCardProps) => {
  const navigate = useNavigate();

  const sender = (
    <span
      className="cursor-pointer font-bold text-pink-600"
      onClick={() => {
        navigate(`${ROUTER_BASENAME}app/profile/${notification.user.name}`);
      }}
    >
      {notification.user.username}
    </span>
  );

  const message =
    notification.type === 'Like'
      ? `さんがあなたの投稿をいいねしました`
      : `さんにフォローされました`;

  return (
    <div
      className={clsx(
        'flex justify-start bg-pink-200 text-gray-700 p-2 my-3 rounded-lg hover:opacity-80',
        'text-xs md:text-sm lg:text-base'
      )}
    >
      <div className="w-1/12 text-center text-pink-700 font-bold mr-4">
        {notification.seen ? '' : '[NEW]'}
      </div>
      <div className="w-1/6 px-2">{formatDateDistance(new Date(notification.createdAt))}</div>
      <div className="w-4/6">
        {sender} {message}
      </div>
    </div>
  );
};

export const Notification = () => {
  const { data: followLikeNotificationData, refetch } = useFollowLikeNotification(true);

  useEffect(() => {
    refetch;
  }, []);

  return (
    <ContentLayout title="Notification">
      <div className="mt-4">
        {followLikeNotificationData?.notifications.map((notification, index) => {
          return <NotificationCard notification={notification} key={index} />;
        })}
      </div>
    </ContentLayout>
  );
};
