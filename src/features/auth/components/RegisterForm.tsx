import { Switch } from '@headlessui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useAuth } from '@/lib/auth';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/config';

const schema = z
  .object({
    email: z.string().min(1, '入力が必須です'),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `${PASSWORD_MIN_LENGTH}文字以上必要です`)
      .max(PASSWORD_MAX_LENGTH, `${PASSWORD_MAX_LENGTH}文字以内で入力してください`),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });

type RegisterValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register, isRegistering } = useAuth();

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={async (values) => {
          await register(values);
          onSuccess();
        }}
        schema={schema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState, watch }) => (
          <>
            <InputField
              type="email"
              error={formState.errors['email']}
              registration={register('email')}
              placeholder="メールアドレス"
            />
            <InputField
              type="password"
              error={formState.errors['password']}
              registration={register('password')}
              placeholder="パスワード"
            />
            <InputField
              type="password"
              error={formState.errors['confirmPassword']}
              registration={register('confirmPassword')}
              placeholder="パスワード 再入力"
            />

            <div>
              <Button isLoading={isRegistering} type="submit" className="w-full">
                登録
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-8 flex items-center justify-end">
        <div className="text-sm">
          アカウントをお持ちですか？
          <Link to="../login" className="font-medium text-blue-600 hover:text-blue-500">
            ログインする
          </Link>
        </div>
      </div>
    </div>
  );
};
