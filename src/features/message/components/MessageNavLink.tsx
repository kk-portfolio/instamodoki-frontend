import { Badge } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { SideNavigationItem } from '@/components/Layout';
import { useAuth } from '@/lib/auth';

import { useMessageNotification } from '../hooks';

type NotificationNavLinkProps = {
  navConfig: SideNavigationItem;
  className: string;
  activeClassName: string;
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MessageNavLink = ({
  navConfig,
  className,
  activeClassName,
  setSidebarOpen,
}: NotificationNavLinkProps) => {
  const { user: me } = useAuth();
  const { data } = useMessageNotification();

  let badgeContent = 0;
  data?.notifications.forEach((notification) => {
    notification.message.forEach((msg) => {
      if (!msg.seen.includes(me?.id)) {
        badgeContent++;
      }
    });
  });

  return (
    <NavLink
      key={navConfig.name}
      to={navConfig.to}
      className={({ isActive }) => (isActive ? activeClassName : className)}
      onClick={() => {
        if (!setSidebarOpen) return;
        setSidebarOpen(false);
      }}
    >
      <Badge badgeContent={badgeContent} color="primary">
        <navConfig.icon className={clsx('mr-4 flex-shrink-0 h-6 w-6')} aria-hidden="true" />
        {navConfig.name}
      </Badge>
    </NavLink>
  );
};
