import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthForm } from './common/auth-form';

const formSchema = z
  .object({
    name: z.string().min(1, '名前は必須です'),
    email: z.string().email('無効なメールアドレスです'),
    password: z.string().min(6, 'パスワードは6文字以上である必要があります'),
    confirmPassword: z.string().min(1, 'パスワード（確認）は必須です'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });

export const SignUpForm = ({
  setIsSignUp,
}: {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
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
      } else {
        const error = await response.json();
        form.setError('root', { message: error.message });
      }
    } catch (err) {
      form.setError('root', {
        message: 'サインアップ中に予期せぬエラーが発生しました',
      });
    }
  };

  return (
    <AuthForm
      form={form}
      onSubmit={onSubmit}
      fields={[
        { name: 'name', label: '名前', type: 'text' },
        { name: 'email', label: 'メールアドレス', type: 'email' },
        { name: 'password', label: 'パスワード', type: 'password' },
        { name: 'confirmPassword', label: 'パスワード（確認）', type: 'password' },
      ]}
      submitText="サインアップ"
      switchText="すでにアカウントをお持ちの方は、"
      onSwitch={() => setIsSignUp(false)}
    />
  );
};
