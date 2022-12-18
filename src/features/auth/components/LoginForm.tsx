import { Link } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/config';
import { useAuth } from '@/lib/auth';

const schema = z.object({
  email: z.string().min(1, '入力が必須です'),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, `${PASSWORD_MIN_LENGTH}文字以上必要です`)
    .max(PASSWORD_MAX_LENGTH, `${PASSWORD_MAX_LENGTH}文字以内で入力してください`),
});

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth();

  return (
    <div>
      <Form<LoginValues, typeof schema>
        onSubmit={async (values) => {
          await login(values);
          onSuccess();
        }}
        schema={schema}
      >
        {({ register, formState }) => (
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
            <div>
              <Button isLoading={isLoggingIn} type="submit" className="w-full">
                ログイン
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-8 flex items-center justify-end">
        <div className="text-sm">
          アカウントをお持ちでないですか？
          <Link to="../register" className="font-medium text-blue-600 hover:text-blue-500">
            登録する
          </Link>
        </div>
      </div>
    </div>
  );
};
