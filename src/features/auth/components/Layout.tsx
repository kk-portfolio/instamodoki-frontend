import * as React from 'react';
import logo from '@/assets/logo-pink-700.png';
import { Link } from '@/components/Elements';
import { Head } from '@/components/Head';
import { APPLICATION_NAME } from '@/config';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="min-h-screen bg-pink-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link className="flex justify-center items-center" to="/">
              <img className="h-16 mr-2 pb-1 w-auto" src={logo} alt={APPLICATION_NAME} />
              <span className="text-4xl  text-pink-700 font-semibold logo">{APPLICATION_NAME}</span>
            </Link>
          </div>

          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">{title}</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">{children}</div>
        </div>
      </div>
    </>
  );
};
