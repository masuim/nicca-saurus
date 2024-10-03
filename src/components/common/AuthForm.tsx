import { Button } from '@/components/ui/Button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
// eslint-disable-next-line import/named
import { FormProvider, Path, UseFormReturn } from 'react-hook-form';

type FormValues = Record<string, string>;

type AuthFormProps<T extends FormValues> = {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => Promise<void>;
  fields: Array<{
    name: Path<T>;
    label: string;
    type: string;
  }>;
  submitText: string;
  switchText: string;
  onSwitch: () => void;
};

export const AuthForm = <T extends FormValues>({
  form,
  onSubmit,
  fields,
  submitText,
  switchText,
  onSwitch,
}: AuthFormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: fieldProps }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input type={field.type} {...fieldProps} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {form.formState.errors.root && (
          <div className="text-red-500">{form.formState.errors.root.message}</div>
        )}
        <div className="flex justify-center pt-6">
          <Button type="submit" variant="main" disabled={form.formState.isSubmitting} size="lg">
            {form.formState.isSubmitting ? `${submitText}中...` : submitText}
          </Button>
        </div>
        <div className="text-muted-foreground mt-4 text-center text-[12px]">
          <span className="block">{switchText}</span>
          <span>
            こちらから
            <button
              className="mx-0.25 cursor-pointer rounded-md border-none p-1 font-extrabold text-blue-600"
              onClick={onSwitch}
            >
              {submitText === 'サインアップ' ? ' Sign In ' : ' Sign Up '}
            </button>
            してください
          </span>
        </div>
      </form>
    </FormProvider>
  );
};
