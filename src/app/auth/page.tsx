'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Header } from '@/components/layout/header';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import logo from '../../../public/images/logos/bg-removed-logo.png';
import { SignInForm } from '@/components/auth/sign-in-form';
import { SignUpForm } from '@/components/auth/sign-up-form';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="lg:hidden">
        {/* TODO: 仮の対応、openRegisterModalには何を渡す？ */}
        <Header openRegisterModal={() => {}} />
      </div>
      <div className="hidden w-full items-center justify-center bg-primary p-4 lg:flex lg:w-2/5 lg:p-8">
        <Image
          src={logo}
          alt="rex"
          width={300}
          height={300}
          className="w-3/4 max-w-xs sm:max-w-sm"
          priority
        />
      </div>
      <div className="mt-8 flex w-full items-center justify-center p-4 pt-12 lg:mt-0 lg:w-3/5 lg:p-8">
        <Card className="w-full max-w-xs bg-white/90 px-2 sm:max-w-sm">
          <CardHeader className="flex items-center justify-center pb-2">
            <CardTitle className="text-xl sm:text-2xl">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSignUp ? (
              <SignUpForm setIsSignUp={setIsSignUp} />
            ) : (
              <SignInForm setIsSignUp={setIsSignUp} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
