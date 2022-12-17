import { SideNavigationItem } from '@/components/Layout';
import { Badge } from '@mui/material';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { useFollowLikeNotification } from '../hooks';

type NotificationNavLinkProps = {
  navConfig: SideNavigationItem;
  className: string;
  activeClassName: string;
};

export const NotificationNavLink = ({
  navConfig,
  className,
  activeClassName,
}: NotificationNavLinkProps) => {
  const { data } = useFollowLikeNotification();
  const badgeContent = data?.notifications.filter((notification) => !notification.seen).length;
  return (
    <NavLink
      key={navConfig.name}
      to={navConfig.to}
      className={({ isActive }) => (isActive ? activeClassName : className)}
    >
      <Badge badgeContent={badgeContent} color="primary">
        <navConfig.icon className={clsx('mr-4 flex-shrink-0 h-6 w-6')} aria-hidden="true" />
        {navConfig.name}
      </Badge>
    </NavLink>
  );
};
