'use client';

import { useState } from 'react';
import { SignInForm } from '@/components/modules/auth/SignInForm';
import { SignUpForm } from '@/components/modules/auth/SignUpForm';

export const AuthClient = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <main className="flex min-h-screen">
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
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
    </main>
  );
};
