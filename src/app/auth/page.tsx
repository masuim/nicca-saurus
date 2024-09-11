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
    <div className="flex h-screen">
      <div
        className="flex w-2/5 items-center justify-center"
        style={{
          backgroundColor: '#082F68',
        }}
      >
        <Image
          src={logo}
          alt="rex"
          width={300}
          height={300}
          className="h-auto w-3/4"
          style={{
            marginTop: '20%',
          }}
        />
      </div>
      <div className="flex w-3/5 items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader className="flex items-center justify-center">
            <CardTitle>{isSignUp ? 'Sign Up' : 'Login'}</CardTitle>
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
