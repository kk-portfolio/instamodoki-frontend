/* eslint-disable no-unused-vars */
import { makeStyles, Modal, Slider } from '@material-ui/core';
import React from 'react';
import Cropper, { Area, MediaSize } from 'react-easy-crop';

import { Button } from '../Button';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: 420,
    height: 500,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
    '& .crop-container': {
      height: 400,
      borderRadius: '10px 10px 0px 0px',
      backgroundColor: '#f4f7fb',
      position: 'relative',
      '& .container': {},
      '& .crop-area': {
        border: '3px solid #00A0FF',
      },
      '& .media': {},
    },
    '& .controls': {
      height: 40,
      marginLeft: 50,
      marginRight: 50,
      display: 'flex',
      alignItems: 'center',
      marginTop: 10,
      '& .zoom-range': {
        color: '#00A0FF',
      },
    },
    '& .buttons': {
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginRight: 90,
      marginLeft: 90,
      marginTop: 10,
      marginBottom: 10,
    },
  },
});
type Props = {
  crop: {
    x: number;
    y: number;
  };
  setCrop: (crop: { x: number; y: number }) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  open: boolean;
  onClose: () => void;
  imgSrc: string;
  showCroppedImage: () => void;
  onMediaLoaded: (mediaSize: MediaSize) => void;
  minZoom: number;
  aspectRatio: number;
  cropWidth: number;
};
const CropperModal: React.FC<Props> = ({
  crop,
  setCrop,
  onCropComplete,
  setZoom,
  zoom,
  open,
  onClose,
  imgSrc,
  showCroppedImage,
  onMediaLoaded,
  minZoom,
  aspectRatio,
  cropWidth,
}) => {
  const classes = useStyles();
  return (
    <Modal open={open} onClose={onClose} className={classes.root}>
      <div className={classes.modal}>
        <div className="crop-container">
          <div className="crop-space">
            <Cropper
              image={imgSrc}
              crop={crop}
              zoom={zoom}
              minZoom={minZoom}
              maxZoom={minZoom + 3}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropSize={{
                width: cropWidth,
                height: cropWidth / aspectRatio,
              }}
              classes={{
                containerClassName: 'container',
                cropAreaClassName: 'crop-area',
                mediaClassName: 'media',
              }}
              onMediaLoaded={onMediaLoaded}
              showGrid={false}
            />
          </div>
        </div>
        <div className="controls">
          <Slider
            min={minZoom}
            value={zoom}
            max={minZoom + 3}
            step={0.1}
            onChange={(e, value) => {
              if (typeof value === 'number') {
                setZoom(value);
              }
            }}
            className="zoom-range"
          />
        </div>
        <div className="buttons">
          <Button variant="inverse" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onClose();
              showCroppedImage();
            }}
          >
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default CropperModal;
