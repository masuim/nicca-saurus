import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type Props = {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const LoginForm = ({ setIsSignUp }: Props) => {
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
        router.push('/dashboard');
      }
    } catch (err) {
      form.setError('root', {
        message: 'An unexpected error occurred during login',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <p className="text-red-500">{form.formState.errors.root.message}</p>
        )}
        <div className="flex justify-center">
          <Button type="submit" variant="main" disabled={form.formState.isSubmitting} size="lg">
            {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </div>

        <p className="text-center text-[10px]">
          アカウントをお持ちでない方は、こちらから
          <button
            className="font-inherit cursor-pointer border-none bg-transparent p-0 text-blue-500 hover:underline"
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
          してください
        </p>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
