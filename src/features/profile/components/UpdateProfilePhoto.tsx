import React, { ReactNode, useEffect, useState } from 'react';

import { useAuth } from '@/lib/auth';
import { SelectImageWithCrop } from '@/components/Elements/SelectImageWithCrop';
import { useUpdateProfilePhoto } from '../hooks/useUpdateProfilePhoto';

type UpdateProfilePhotoProps = {
  parentSetCroppedImgBlob?: React.Dispatch<React.SetStateAction<Blob | null>>;
  children: ReactNode;
};

export const UpdateProfilePhoto = ({
  parentSetCroppedImgBlob,
  children,
}: UpdateProfilePhotoProps) => {
  const [croppedImgBlob, setCroppedImgBlob] = useState<Blob | null>(null);
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfilePhoto();

  useEffect(() => {
    if (!croppedImgBlob) {
      return;
    }
    updateProfileMutation.mutate(croppedImgBlob);

    if (parentSetCroppedImgBlob) {
      parentSetCroppedImgBlob(croppedImgBlob);
    }
  }, [croppedImgBlob]);

  if (!user) return null;

  return (
    <>
      <SelectImageWithCrop aspectRatio={1} cropWidth={360} setCroppedImgBlob={setCroppedImgBlob}>
        {children}
      </SelectImageWithCrop>
    </>
  );
};
