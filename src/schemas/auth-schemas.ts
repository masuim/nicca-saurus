import { z } from 'zod';
export const signInFormSchema = z.object({
  email: z.string().min(1, 'メールアドレスは必須です').email('無効なメールアドレスです'),
  password: z.string().min(1, 'パスワードは必須です'),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(1, '名前は必須です'),
    email: z.string().min(1, 'メールアドレスは必須です').email('無効なメールアドレスです'),
    password: z.string().min(6, 'パスワードは6文字以上である必要があります'),
    confirmPassword: z.string().min(1, 'パスワード（確認）は必須です'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });

export type SignInFormData = z.infer<typeof signInFormSchema>;
export type SignUpFormData = z.infer<typeof signUpFormSchema>;
