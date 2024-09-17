import { SignInFormData, SignUpFormData } from '@/schemas/auth-schemas';
import { signIn } from 'next-auth/react';

export const signInUser = async (data: SignInFormData) => {
  return signIn('credentials', {
    redirect: false,
    email: data.email,
    password: data.password,
  });
};

export const signUpUser = async (data: SignUpFormData) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return signInUser(data);
};
