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
    <div className="flex min-h-screen flex-col lg:flex-row">
      <header className="flex h-16 items-center bg-primary px-4 lg:hidden">
        <Image
          src={logo}
          alt="App Logo"
          width={100}
          height={24}
          className="mt-1 h-full w-auto object-contain"
        />
      </header>
      <div className="hidden w-full items-center justify-center bg-primary p-4 lg:flex lg:w-2/5 lg:p-8">
        <Image
          src={logo}
          alt="rex"
          width={300}
          height={300}
          className="w-3/4 max-w-xs sm:max-w-sm"
        />
      </div>
      <div className="lg: mt-8 flex w-full items-center justify-center p-4 lg:mt-0 lg:w-3/5 lg:p-8">
        <Card className="w-full max-w-xs bg-white/90 px-2 sm:max-w-sm">
          <CardHeader className="flex items-center justify-center pb-2">
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
