import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthForm } from './common/auth-form';

const formSchema = z.object({
  email: z.string().email('無効なメールアドレスです'),
  password: z.string().min(1, 'パスワードは必須です'),
});

export const SignInForm = ({
  setIsSignUp,
}: {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

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
