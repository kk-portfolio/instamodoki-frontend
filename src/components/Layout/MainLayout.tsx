import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  PlusIcon,
  HomeIcon,
  SearchIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuAlt2Icon,
  XIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import * as React from 'react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import logo from '@/assets/logo.png';
import userPhotoPlaceholder from '@/assets/portrait-placeholder.png';
import { APPLICATION_NAME } from '@/config';
import { MessageNavLink } from '@/features/message/components/MessageNavLink';
import { NotificationNavLink } from '@/features/notification/components/NotificationNavLink';
import { PostNavLink } from '@/features/post';
import { PostModal } from '@/features/post/components/PostModal';
import { useMyProfile } from '@/features/profile/hooks';
import { useAuth } from '@/lib/auth';

export type SideNavigationItem = {
  name: string;
  to: string;
  // eslint-disable-next-line no-unused-vars, no-undef
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

type SideNavigationProps = {
  setPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideNavigation = ({ setPostModalOpen, setSidebarOpen }: SideNavigationProps) => {
  const navigation = [
    { name: 'ホーム', to: './home', icon: HomeIcon },
    { name: '検索', to: './search', icon: SearchIcon },
  ].filter(Boolean) as SideNavigationItem[];

  const linkClass = clsx(
    'text-gray-300 hover:bg-pink-700 hover:text-white',
    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
  );
  const linkActiveClass = clsx(linkClass, 'bg-pink-900 text-white');

  return (
    <>
      {navigation.map((item, index) => (
        <NavLink
          end={index === 0}
          key={item.name}
          to={item.to}
          className={({ isActive }) => (isActive ? linkActiveClass : linkClass)}
          onClick={() => {
            if (!setSidebarOpen) return;
            setSidebarOpen(false);
          }}
        >
          <item.icon className={clsx('mr-4 flex-shrink-0 h-6 w-6')} aria-hidden="true" />
          {item.name}
        </NavLink>
      ))}

      <MessageNavLink
        navConfig={{ name: 'メッセージ', to: './message', icon: PaperAirplaneIcon }}
        className={linkClass}
        activeClassName={linkActiveClass}
        setSidebarOpen={setSidebarOpen}
      />

      <NotificationNavLink
        navConfig={{ name: 'お知らせ', to: './notification', icon: HeartIcon }}
        className={linkClass}
        activeClassName={linkActiveClass}
        setSidebarOpen={setSidebarOpen}
      />

      <PostNavLink
        navConfig={{ name: '投稿', to: './dummy', icon: PlusIcon }}
        className={linkClass}
        activeClassName={linkActiveClass}
        setPostModalOpen={setPostModalOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </>
  );
};

type UserNavigationItem = {
  name: string;
  to: string;
  onClick?: () => void;
};

const UserNavigation = () => {
  const { logout } = useAuth();
  const { data } = useMyProfile();

  const userImgSrc = data?.profile?.photo?.secure_url
    ? data.profile.photo.secure_url
    : userPhotoPlaceholder;

  const userNavigation = [
    { name: 'プロフィール', to: './profile' },
    {
      name: 'ログアウト',
      to: '',
      onClick: () => {
        logout();
      },
    },
  ].filter(Boolean) as UserNavigationItem[];

  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="max-w-xs  bg-pink-200 p-0.5 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">Open user menu</span>
              <img src={userImgSrc} alt="" className="h-10 w-10 rounded-full" />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      onClick={item.onClick}
                      to={item.to}
                      className={clsx(
                        active ? 'bg-pink-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

type MobileSidebarProps = {
  sidebarOpen: boolean;
  setPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileSidebar = ({ sidebarOpen, setPostModalOpen, setSidebarOpen }: MobileSidebarProps) => {
  return (
    <Transition.Root show={sidebarOpen} as={React.Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 flex z-40 md:hidden"
        open={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-pink-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-pink-800">
            <Transition.Child
              as={React.Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 flex items-center px-4">
              <Logo />
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1">
                <SideNavigation
                  setPostModalOpen={setPostModalOpen}
                  setSidebarOpen={setSidebarOpen}
                />
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </Dialog>
    </Transition.Root>
  );
};

type SidebarProps = {
  setPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ setPostModalOpen }: SidebarProps) => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-pink-900">
            <Logo />
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-pink-800 space-y-1">
              <SideNavigation setPostModalOpen={setPostModalOpen} />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <Link className="flex items-center text-white" to="./home">
      <img className="h-8 mr-3 w-auto" src={logo} alt={APPLICATION_NAME} />
      <span className="text-2xl text-white font-semibold logo">{APPLICATION_NAME}</span>
    </Link>
  );
};

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);

  return (
    <>
      <div className="h-screen flex overflow-hidden bg-pink-100">
        <MobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setPostModalOpen={setPostModalOpen}
        />
        <Sidebar setPostModalOpen={setPostModalOpen} />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-end">
              <div className="ml-4 flex items-center md:ml-6">
                <UserNavigation />
              </div>
            </div>
          </div>
          <main className="flex-1 relative overflow-y-auto focus:outline-none">{children}</main>
        </div>
      </div>

      <PostModal open={postModalOpen} setOpen={setPostModalOpen} />
    </>
  );
};
