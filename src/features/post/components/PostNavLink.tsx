import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { SideNavigationItem } from '@/components/Layout';
import { useAuth } from '@/lib/auth';

type PostNavLinkProps = {
  navConfig: SideNavigationItem;
  className: string;
  activeClassName: string;
  setPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostNavLink = ({
  navConfig,
  className,
  activeClassName,
  setPostModalOpen,
  setSidebarOpen,
}: PostNavLinkProps) => {
  const user = useAuth();
  if (!user) {
    return <></>;
  }

  return (
    <>
      <NavLink
        onClick={(e) => {
          e.preventDefault();
          if (setSidebarOpen) {
            setSidebarOpen(false);
          }
          setPostModalOpen(true);
        }}
        key={navConfig.name}
        to={navConfig.to}
        className={({ isActive }) => (isActive ? activeClassName : className)}
      >
        <navConfig.icon className={clsx('mr-4 flex-shrink-0 h-6 w-6')} aria-hidden="true" />
        {navConfig.name}
      </NavLink>
    </>
  );
};
