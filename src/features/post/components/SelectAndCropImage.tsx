import React, { ReactNode, useEffect, useState } from 'react';

import { SelectImageWithCrop } from '@/components/Elements/SelectImageWithCrop';
import { useAuth } from '@/lib/auth';

type SelectAndCropImageProps = {
  parentSetCroppedImgBlob?: React.Dispatch<React.SetStateAction<Blob | null>>;
  children: ReactNode;
};

export const SelectAndCropImage = ({
  parentSetCroppedImgBlob,
  children,
}: SelectAndCropImageProps) => {
  const [croppedImgBlob, setCroppedImgBlob] = useState<Blob | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!croppedImgBlob) {
      return;
    }
    if (parentSetCroppedImgBlob) {
      parentSetCroppedImgBlob(croppedImgBlob);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
