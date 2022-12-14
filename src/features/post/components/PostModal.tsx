import { useState } from 'react';
import * as React from 'react';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Modal } from '@/components/Elements/Modal/Modal';
import { MouseOverPopoverProvider } from '@/components/Elements/MouseOverPopover/MouseOverPopover';
import { convertBlob2Source } from '@/components/Elements/SelectImageWithCrop';
import { Form, TextAreaField } from '@/components/Form';
import { POSTCAPTION_MAX_LENGTH } from '@/config';
import { useAuth } from '@/lib/auth';

import { usePostImage } from '../hooks/usePostImage';
import { PostImageRequestDTO } from '../types';

import { SelectAndCropImage } from './SelectAndCropImage';

const schema = z.object({
  caption: z
    .string()
    .min(0)
    .max(POSTCAPTION_MAX_LENGTH, `${POSTCAPTION_MAX_LENGTH}文字以内で入力してください`),
});

type SubmitValues = {
  caption: string;
};

type PostModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostModal = ({ open, setOpen }: PostModalProps) => {
  const user = useAuth();

  const [croppedImgBlob, setCroppedImgBlob] = useState<Blob | null>(null);
  const postImageMutation = usePostImage();

  if (!user) {
    return <></>;
  }

  const previewJSX = croppedImgBlob ? (
    <MouseOverPopoverProvider message="写真を選択し直す">
      <div className="flex justify-center">
        <img src={convertBlob2Source(croppedImgBlob)} alt="プレビュー" width={256} />
      </div>
    </MouseOverPopoverProvider>
  ) : (
    <>写真を選択してください</>
  );

  return (
    <Modal open={open} title="写真を投稿">
      <Form<SubmitValues, typeof schema>
        onSubmit={async (values) => {
          if (!croppedImgBlob) {
            return;
          }
          const dto: PostImageRequestDTO = {
            caption: values.caption,
            image: croppedImgBlob,
          };
          postImageMutation.mutate(dto);
          setOpen(false);
          setCroppedImgBlob(null);
        }}
        schema={schema}
        mode="all"
      >
        {({ register, formState }) => {
          const validCaption = formState.errors.caption?.message ? false : true;
          const validImage = croppedImgBlob ? true : false;
          const enableSubmit = validCaption && validImage;
          return (
            <>
              <TextAreaField
                error={formState.errors['caption']}
                registration={register('caption')}
                label="テキスト"
              />

              <div className="text-sm font-medium text-gray-700">写真</div>
              <div className="flex justify-center">
                <SelectAndCropImage parentSetCroppedImgBlob={setCroppedImgBlob}>
                  {previewJSX}
                </SelectAndCropImage>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="inverse"
                  onClick={() => {
                    setOpen(false);
                    setCroppedImgBlob(null);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={!enableSubmit}>
                  投稿
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </Modal>
  );
};
