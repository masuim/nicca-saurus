'use client';

import { useFlashMessage } from '@/contexts/flash-message-context';
import { useSignInForm } from '@/hooks/use-auth-form';
import { SignInFormData } from '@/schemas/auth-schemas';
import { signInUser } from '@/services/auth-service';
import { useRouter } from 'next/navigation';
import { AuthForm } from '../common/auth-form';

type Props = {
  setIsSignUp: (isSignUp: boolean) => void;
};

export const SignInForm = ({ setIsSignUp }: Props) => {
  const router = useRouter();
  const form = useSignInForm();
  const { showFlashMessage } = useFlashMessage();

  const onSubmit = async (values: SignInFormData) => {
    try {
      const result = await signInUser(values);

      if (!result.success) {
        form.setError('root', { message: result.error });
        showFlashMessage(result.error, 'error');
        return;
      }

      showFlashMessage('サインインに成功しました', 'success');
      router.push('/');
    } catch (err) {
      const errorMessage = 'サインイン中に予期せぬエラーが発生しました';
      form.setError('root', { message: errorMessage });
      showFlashMessage(errorMessage, 'error');
    }
  };

  return (
    <AuthForm
      form={form}
      onSubmit={onSubmit}
      fields={[
        { name: 'email', label: 'メールアドレス', type: 'email' },
        { name: 'password', label: 'パスワード', type: 'password' },
      ]}
      submitText="サインイン"
      switchText="アカウントをお持ちでない方は、"
      onSwitch={() => setIsSignUp(true)}
    />
  );
};
