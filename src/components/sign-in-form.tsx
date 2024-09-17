import { useSignInForm } from '@/hooks/use-auth-form';
import { SignInFormData } from '@/schemas/auth-schemas';
import { signInUser } from '@/services/auth-service';
import { useRouter } from 'next/navigation';
import { AuthForm } from './common/auth-form';

type Props = {
  setIsSignUp: (isSignUp: boolean) => void;
};

export const SignInForm = ({ setIsSignUp }: Props) => {
  const router = useRouter();
  const form = useSignInForm();

  const onSubmit = async (values: SignInFormData) => {
    try {
      const result = await signInUser(values);

      if (result?.error) {
        form.setError('root', { message: result.error });
      } else {
        router.push('/');
      }
    } catch (err) {
      form.setError('root', {
        message: 'サインイン中に予期せぬエラーが発生しました',
      });
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
