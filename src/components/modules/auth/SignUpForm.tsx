import { AuthForm } from '@/components/modules/auth/AuthForm';
import { useFlashMessage } from '@/context/FlashMessageProvider';
import { useSignUpForm } from '@/hooks/use-auth-form';
import { SignUpFormData } from '@/schemas/auth/auth-schemas';
import { signUpUser } from '@/services/auth-service';
import { useRouter } from 'next/navigation';

type Props = {
  setIsSignUp: (isSignUp: boolean) => void;
};

export const SignUpForm = ({ setIsSignUp }: Props) => {
  const router = useRouter();
  const form = useSignUpForm();
  const { showFlashMessage } = useFlashMessage();

  const onSubmit = async (values: SignUpFormData) => {
    try {
      const result = await signUpUser(values);

      if (!result.success) {
        form.setError('root', { message: result.error });
        showFlashMessage(result.error, 'error');
        return;
      }

      showFlashMessage('サインアップに成功しました', 'success');
      router.push('/main');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'サインアップ中に予期せぬエラーが発生しました';
      form.setError('root', { message: errorMessage });
      showFlashMessage(errorMessage, 'error');
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
