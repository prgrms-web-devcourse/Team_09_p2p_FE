import React, { RefObject } from 'react';

interface IImageUpload {
  onImageUpload: (file: File) => void;
  imageRef: RefObject<HTMLInputElement>;
  labelId?: string;
}

const ImageUpload = ({ onImageUpload, imageRef, labelId }: IImageUpload) => {
  const inputRef = imageRef;
  const isImageFile = (file: File) => file.type.match('image/.*');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    if (e.target.files.length === 0) return;

    const firstFile = e.target.files[0];
    if (!isImageFile(firstFile)) {
      alert('이미지 파일이 아닙니다');

      e.target.value = '';
      return;
    }

    onImageUpload(firstFile);
  };
  return (
    <>
      <input
        ref={inputRef}
        id={labelId}
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </>
  );
};

export default ImageUpload;
