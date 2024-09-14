import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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

export function AuthForm<T extends FormValues>({
  form,
  onSubmit,
  fields,
  submitText,
  switchText,
  onSwitch,
}: AuthFormProps<T>) {
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
          <p className="text-red-500">{form.formState.errors.root.message}</p>
        )}
        <div className="flex justify-center pt-6">
          <Button type="submit" variant="main" disabled={form.formState.isSubmitting} size="lg">
            {form.formState.isSubmitting ? `${submitText}中...` : submitText}
          </Button>
        </div>
        <p className="text-muted-foreground mt-4 text-center text-[12px]">
          <span className="block">{switchText}</span>
          <span>
            こちらから
            <button
              className="font-inherit cursor-pointer border-none bg-transparent p-0 text-blue-500 hover:underline"
              onClick={onSwitch}
            >
              {submitText === 'Login' ? 'Sign Up' : 'Login'}
            </button>
            してください
          </span>
        </p>
      </form>
    </FormProvider>
  );
}
