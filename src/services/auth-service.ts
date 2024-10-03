import { useFlashMessage } from '@/context/FlashMessageProvider';
import { SignInFormData, SignUpFormData } from '@/schemas/auth/auth-schemas';
import { ApiResult } from '@/types/api-types';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const signInUser = async (data: SignInFormData): Promise<ApiResult<SignInFormData>> => {
  const result = await signIn('credentials', {
    redirect: false,
    email: data.email,
    password: data.password,
  });

  if (result?.error) {
    return { success: false, error: result.error, status: 401 };
  }

  return { success: true, data: data, status: 200 };
};

export const signUpUser = async (
  data: SignUpFormData,
): Promise<ApiResult<{ id: string; name: string; email: string }>> => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result: ApiResult<{ id: string; name: string; email: string }> = await response.json();

  if (!result.success) {
    throw new Error(result.error);
  }

  await signIn('credentials', {
    redirect: false,
    email: data.email,
    password: data.password,
  });

  return result;
};

export const useSignOut = () => {
  const router = useRouter();
  const { showFlashMessage } = useFlashMessage();

  const signOutUser = async () => {
    try {
      await signOut({ redirect: false });
      showFlashMessage('サインアウトしました', 'success');
      router.push('/auth');
    } catch (error) {
      showFlashMessage('サインアウト中にエラーが発生しました', 'error');
    }
  };

  return signOutUser;
};
