import * as z from 'zod';
import { Modal } from '@/components/Elements/Modal/Modal';
import { convertBlob2Source } from '@/components/Elements/SelectImageWithCrop';
import { Form, TextAreaField } from '@/components/Form';
import { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { usePostImage } from '../hooks/usePostImage';
import { SelectAndCropImage } from './SelectAndCropImage';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/Elements';
import { PostImageRequestDTO } from '../types';
import { POSTCAPTION_MAX_LENGTH } from '@/config';
import { MouseOverPopoverProvider } from '@/components/Elements/MouseOverPopover/MouseOverPopover';

const schema = z.object({
  caption: z
    .string()
    .min(0)
    .max(POSTCAPTION_MAX_LENGTH, `${POSTCAPTION_MAX_LENGTH}文字以内で入力してください`),
});

type SubmitValues = {
  caption: string;
};

type PostNavLinkProps = {
  className: string;
  activeClassName: string;
  children: ReactNode;
};

export const PostNavLink = ({ className, activeClassName, children }: PostNavLinkProps) => {
  const user = useAuth();
  const [open, setOpen] = useState(false);
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
    <>
      <NavLink
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        to=".dummy"
        className={({ isActive }) => (isActive ? activeClassName : className)}
      >
        {children}
      </NavLink>

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
          {({ register, formState, getValues }) => {
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
    </>
  );
};
