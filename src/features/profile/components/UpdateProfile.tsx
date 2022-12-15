import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';

import { Button, Spinner } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { useAuth } from '@/lib/auth';

import userPhotoPlaceholder from '@/assets/portrait-placeholder.png';
import { useMyProfile, useUpdateProfile } from '../hooks';
import { UpdateProfileDTO } from '../types';
import { UpdateProfilePhoto } from './UpdateProfilePhoto';

const schema = z.object({
  username: z.string().min(1, 'Required'),
  bio: z.string(),
  website: z.string().url().optional().or(z.literal('')),
});

export const UpdateProfile = () => {
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfile();
  const { data } = useMyProfile();

  if (!user) return null;

  if (updateProfileMutation.isLoading) {
    <div className="w-full h-48 flex justify-center items-center">
      <Spinner size="lg" />
    </div>;
  }

  const userImgSrc = data?.profile?.photo?.secure_url
    ? data?.profile?.photo?.secure_url
    : userPhotoPlaceholder;

  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <Button startIcon={<PencilIcon className="h-5 w-5" />} size="sm">
          プロフィールを編集
        </Button>
      }
      title="プロフィールを編集"
      submitButton={
        <Button
          form="update-profile"
          type="submit"
          size="sm"
          isLoading={updateProfileMutation.isLoading}
        >
          送信する
        </Button>
      }
    >
      <>
        <UpdateProfilePhoto>
          <div className="flex items-center gap-4 ml-2 mb-8">
            <img src={userImgSrc} alt="プロフィール画像" className="h-16 w-16 rounded-full" />
            <div className="text-blue-500 text-sm">プロフィール写真を変更</div>
          </div>
        </UpdateProfilePhoto>

        <Form<UpdateProfileDTO['data'], typeof schema>
          id="update-profile"
          onSubmit={async (values) => {
            await updateProfileMutation.mutateAsync({ data: values });
          }}
          options={{
            defaultValues: {
              username: user?.username,
              bio: user?.bio,
              website: user?.website,
            },
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="ユーザー名"
                error={formState.errors['username']}
                registration={register('username')}
              />

              <TextAreaField
                label="Bio"
                error={formState.errors['bio']}
                registration={register('bio')}
              />

              <InputField
                label="Webサイト"
                error={formState.errors['website']}
                registration={register('website')}
              />
            </>
          )}
        </Form>
      </>
    </FormDrawer>
  );
};
