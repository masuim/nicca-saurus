'use client';

import { useState } from 'react';
import { SignInForm } from '@/components/modules/auth/SignInForm';
import { SignUpForm } from '@/components/modules/auth/SignUpForm';
import Image from 'next/image';
import appLogo from '../../../public/images/app-name/app-name-2column.png';
import { Header } from '@/components/layout/Header';

export const AuthClient = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="lg:hidden">
        {/* TODO: 仮の対応、openRegisterModalには何を渡す？
         */}
        <Header openRegisterModal={() => {}} />
      </div>
      <div className="flex flex-1 items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center">
            <Image src={appLogo} alt="App Logo" className="h-24 w-56" priority />
          </div>
          <div className="mt-8 rounded-lg bg-white px-4 py-8 shadow sm:px-10">
            <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
              {isSignUp ? 'アカウント作成' : 'サインイン'}
            </h2>
            {isSignUp ? (
              <SignUpForm setIsSignUp={setIsSignUp} />
            ) : (
              <SignInForm setIsSignUp={setIsSignUp} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
