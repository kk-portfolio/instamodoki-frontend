import React, { useState, useCallback, ReactNode, forwardRef, useRef } from 'react';
import { Area, MediaSize } from 'react-easy-crop';
// import "./styles.css";
import CropperModal from './CropperModal';
import getCroppedImg from './getCroppedImg';

type HiddenInputProps = {
  onFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HiddenInput = forwardRef<HTMLInputElement, HiddenInputProps>(
  ({ onFileInputChange }, inputRef) => {
    return (
      <input hidden ref={inputRef} type="file" accept="image/*" onChange={onFileInputChange} />
    );
  }
);

type MyAppProps = {
  aspectRatio: number;
  cropWidth: number;
  setCroppedImgBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
  children: ReactNode;
};

export const SelectImageWithCrop = ({
  aspectRatio,
  cropWidth,
  setCroppedImgBlob,
  children,
}: MyAppProps) => {
  const inputRef = useRef(null);

  /** Cropモーダルの開閉 */
  const [isOpen, setIsOpen] = useState(false);

  /** アップロードした画像URL */
  const [imgSrc, setImgSrc] = useState('');

  /** 画像の拡大縮小倍率 */
  const [zoom, setZoom] = useState(1);
  /** 画像拡大縮小の最小値 */
  const [minZoom, setMinZoom] = useState(1);

  /** 切り取る領域の情報 */
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  /** 切り取る領域の情報 */
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  /**
   * ファイルアップロード後
   * 画像ファイルのURLをセットしモーダルを表示する
   */
  const onFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (reader.result) {
          setImgSrc(reader.result.toString() || '');
          setIsOpen(true);
        }
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    e.target.value = '';
  }, []);

  const fileUpload = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    if (inputRef.current) {
      (inputRef.current as HTMLButtonElement).click();
    }
  };

  /**
   * Cropper側で画像データ読み込み完了
   * Zoomの最小値をセットしZoomの値も更新
   */
  const onMediaLoaded = useCallback((mediaSize: MediaSize) => {
    const { width, height } = mediaSize;
    const mediaAspectRadio = width / height;
    if (mediaAspectRadio > aspectRatio) {
      // 縦幅に合わせてZoomを指定
      const result = cropWidth / aspectRatio / height;
      setZoom(result);
      setMinZoom(result);
      return;
    }
    // 横幅に合わせてZoomを指定
    const result = cropWidth / width;
    setZoom(result);
    setMinZoom(result);
  }, []);

  /**
   * 切り取り完了後、切り取り領域の情報をセット
   */
  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  /**
   * 切り取り後の画像を生成し画面に表示
   */
  const showCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
      setCroppedImgBlob(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imgSrc]);

  return (
    <div>
      <div>
        <HiddenInput onFileInputChange={onFileChange} ref={inputRef} />
        <a href="#" onClick={fileUpload}>
          {children}
        </a>
      </div>

      <CropperModal
        crop={crop}
        setCrop={setCrop}
        zoom={zoom}
        setZoom={setZoom}
        onCropComplete={onCropComplete}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        imgSrc={imgSrc}
        showCroppedImage={showCroppedImage}
        onMediaLoaded={onMediaLoaded}
        minZoom={minZoom}
        aspectRatio={aspectRatio}
        cropWidth={cropWidth}
      />
    </div>
  );
};
