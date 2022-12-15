import { useNavigate } from 'react-router';

import logo from '@/assets/logo-pink-700.png';
import mainImage from '@/assets/landing.jpg';

import { Button } from '@/components/Elements';
import { Head } from '@/components/Head';
import { useAuth } from '@/lib/auth';
import { APPLICATION_NAME, GITHUB_REPO_URI, ROUTER_BASENAME } from '@/config';

export const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStart = () => {
    if (user) {
      console.log('testtest');
      navigate(`${ROUTER_BASENAME}app/`);
    } else {
      console.log('testtesttest');
      navigate(`${ROUTER_BASENAME}auth/login`);
    }
  };

  return (
    <>
      <Head description={`Welcome to ${APPLICATION_NAME}`} />
      <div className="bg-white h-[100vh] flex items-center">
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="flex justify-center items-center">
            <img className="h-16 mr-2 pb-1 w-auto" src={logo} alt={APPLICATION_NAME} />
            <span className="text-4xl  text-pink-700 font-semibold logo">{APPLICATION_NAME}</span>
          </h2>
          <img src={mainImage} alt={APPLICATION_NAME} className="shadow-xl m-2 w-4/5 mx-auto" />
          <p>Instagramの基本機能を模倣したWebアプリケーションです</p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Button
                onClick={handleStart}
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                }
              >
                Get started
              </Button>
            </div>
            <div className="ml-3 inline-flex">
              <a href={GITHUB_REPO_URI} target="_blank" rel="noreferrer">
                <Button
                  variant="inverse"
                  startIcon={
                    <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                >
                  Github Repo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};