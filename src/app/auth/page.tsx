'use client';

import Image from 'next/image';
import { useState } from 'react';

import { LoginForm } from '@/components/login-form';
import { SignUpForm } from '@/components/signup-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import logo from '@/app/images/logos/bg-removed-logo.png';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <header className="flex h-12 items-center bg-primary px-4 md:hidden">
        <Image
          src={logo}
          alt="App Logo"
          width={100}
          height={24}
          className="mt-1 h-full w-auto object-contain"
        />
      </header>
      <div className="hidden w-full items-center justify-center bg-primary p-4 md:flex md:w-2/5 md:p-8">
        <Image
          src={logo}
          alt="rex"
          width={300}
          height={300}
          className="w-3/4 max-w-xs sm:max-w-sm"
        />
      </div>
      <div className="md: mt-8 flex w-full items-center justify-center p-4 md:mt-0 md:w-3/5 md:p-8">
        <Card className="w-full max-w-sm bg-white sm:max-w-md">
          <CardHeader className="flex items-center justify-center">
            <CardTitle className="text-xl sm:text-2xl">{isSignUp ? 'Sign Up' : 'Login'}</CardTitle>
          </CardHeader>
          <CardContent>
            {isSignUp ? (
              <SignUpForm setIsSignUp={setIsSignUp} />
            ) : (
              <LoginForm setIsSignUp={setIsSignUp} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
