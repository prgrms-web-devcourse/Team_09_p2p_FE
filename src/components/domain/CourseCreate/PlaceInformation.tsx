import styled from '@emotion/styled';
import { MutableRefObject, ReactNode, SetStateAction, useCallback, useRef, useState } from 'react';
import { Text } from '~/components/atom';
import theme from '~/styles/theme';
import Textarea from '~/components/atom/Textarea';
import { Image } from '~/components/atom';
import ImageUpload from '~/components/common/ImageUpload';
import { IPlaceForm } from '~/types/place';
import Recommend from '~/components/common/Recommend';
import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';

interface IPlaceInformation {
  children: ReactNode;
  isLastPlace: boolean;
  place: IPlaceForm;
  textAreaRef: (el: HTMLTextAreaElement) => HTMLTextAreaElement;
  isRecommendedRef: (el: HTMLButtonElement) => HTMLButtonElement;
  ThumbnailButtonRef: (el: HTMLButtonElement) => HTMLButtonElement;
  placeImageRef: any;
  onChangeThumnail: any;
  isModify?: boolean;
  ModPropIsRecommended?: boolean;
  ModPropIsThumbnail?: boolean;
  ModPropWrittenDescription?: string;
  ModPropUploadedImage?: string;
}

const PlaceInformation = ({
  children,
  isLastPlace,
  place,
  textAreaRef,
  isRecommendedRef,
  ThumbnailButtonRef,
  placeImageRef,
  onChangeThumnail,
  isModify,
  ModPropIsRecommended,
  ModPropIsThumbnail,
  ModPropWrittenDescription,
  ModPropUploadedImage
}: IPlaceInformation) => {
  const [file, setFile] = useState<File | string>('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isRecommended, setIsRecommended] = useState(isModify ? ModPropIsRecommended : false);
  const imageLabelRef = useRef<HTMLLabelElement>(null);
  // any는 추후 제거하겠습니다!
  const handleRecommend = (e: any) => {
    e.target.value = !isRecommended;
    setIsRecommended(!isRecommended);
  };

  const CompressImage = async (fileSrc: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      return await imageCompression(fileSrc, options);
    } catch (error) {
      alert(error);
    }
  };

  // any는 추후 제거하겠습니다!
  const handleFileOnChange = async (imageFile: File) => {
    const reader = new FileReader();
    const MAX_MB = 10;

    if (!imageFile) {
      return;
    }

    if (imageFile.size > 1024 * 1024 * MAX_MB) {
      alert(`${MAX_MB}MB 이하 파일만 등록해 주세요!`);
      return;
    }

    /* if (/\.(heic)$/i.test(imageFile.name)) {
      imageFile = await heic2any({ blob: imageFile, toType: 'image/jpeg' });
    } */

    if (imageFile.size > 1024 * 1024) {
      imageFile = (await CompressImage(imageFile)) as File;
    }
    reader.onloadend = () => {
      setFile(imageFile);
      setPreviewUrl(reader.result as SetStateAction<string>);
    };
    reader.readAsDataURL(imageFile);
  };

  let profile_preview = null;
  const imageId = 'imgFile' + children;
  if (file !== '' /*  || isModify */) {
    profile_preview = (
      // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
      <>
        {file !== '' ? (
          <Image
            height={500}
            cover={false}
            className="profile_preview"
            src={previewUrl}
            style={{ backgroundColor: 'black', cursor: 'pointer' }}
            onClick={() => imageLabelRef.current?.click()}
          />
        ) : (
          /* 이미지 URL로 파일을 못 잃어와 임시로 previewUrl 처리 */
          <Image
            height={500}
            cover={false}
            className="profile_preview"
            src={ModPropUploadedImage as string}
            style={{ backgroundColor: 'black', cursor: 'pointer' }}
            onClick={() => imageLabelRef.current?.click()}
          />
        )}
        {isModify ? (
          <ThumbnailButton
            name={children?.toString()}
            onClick={onChangeThumnail}
            ref={ThumbnailButtonRef}
            value={ModPropIsThumbnail === true ? 'true' : 'false'}
            isSelectedThumbnail={ModPropIsThumbnail === true ? true : false}
          >
            대표
          </ThumbnailButton>
        ) : (
          <ThumbnailButton
            name={children?.toString()}
            onClick={onChangeThumnail}
            ref={ThumbnailButtonRef}
            value={children === 1 ? 'true' : 'false'}
            isSelectedThumbnail={children === 1 ? true : false}
          >
            대표
          </ThumbnailButton>
        )}
      </>
    );
  }
  return (
    <>
      <PlaceInformationWrapper>
        <GuideLine isLastPlace={isLastPlace}>
          <NumberWrapper>
            <NumberText>{children}</NumberText>
            <NumberImage src="/assets/numbering.png" />
            <Text size={'xl'} style={{ margin: '0 20px 0 40px' }}>
              {place.name}
            </Text>
            <RecommendButton
              onClick={handleRecommend}
              ref={isRecommendedRef}
              value={isRecommended?.toString()}
            >
              {isRecommended ? <Recommend active /> : <Recommend />}
            </RecommendButton>
          </NumberWrapper>
          <Text color="gray" size={'md'} style={{ marginLeft: '70px' }}>
            {place.roadAddressName}
          </Text>
          <ImageUploadWrapper>
            <ImageUpload
              onImageUpload={handleFileOnChange}
              imageRef={placeImageRef}
              labelId={imageId}
            />
            <FileUploadWrapper>
              <label id="image-label" htmlFor={imageId} ref={imageLabelRef}>
                <PlusImage src="/assets/imageUpload.png" />
              </label>
            </FileUploadWrapper>
            {profile_preview}
          </ImageUploadWrapper>
          <DescriptionWrapper>
            <Textarea
              width={660}
              height={200}
              placeholder={'장소에 대한 추억을 공유해주세요!☺️☺️'}
              textAreaRef={textAreaRef as unknown as MutableRefObject<HTMLTextAreaElement>}
            >
              {isModify ? ModPropWrittenDescription : null}
            </Textarea>
          </DescriptionWrapper>
        </GuideLine>
      </PlaceInformationWrapper>
    </>
  );
};

export default PlaceInformation;

const PlaceInformationWrapper = styled.div`
  width: 100%;
`;

const GuideLine = styled.blockquote<{
  isLastPlace: boolean;
}>`
  border-left: ${({ isLastPlace }) =>
    isLastPlace ? 'thick dashed #f1f5fb;' : 'thick solid #f1f5fb;'};
  height: 900px;
  margin-left: 40px;
`;

const NumberWrapper = styled.div`
  width: 100%;
  position: relative;
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-left: -30px;
  background-color: white;
`;

const NumberImage = styled.img`
  vertical-align: middle;
`;

const NumberText = styled.p`
  color: white;
  font-size: 24px;
  padding: 10px 20px;
  border-radius: 10px;
  text-align: center;
  position: absolute;
  top: 47%;
  left: 3.8%;
  transform: translate(-50%, -50%);
`;

/* const RecommendButton = styled.button`
  border: 1px solid ${theme.color.mainColor};
  border-radius: 20px;
  padding: 5px 15px 5px 15px;
`; */

const RecommendButton = styled.button`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const RecommendWrapper = styled.div`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const ImageUploadWrapper = styled.div`
  //width: 830px;
  position: relative;
  height: 500px;
  margin: 30px 0 0 70px;
  border: 0px solid black;
  background-color: ${theme.color.backgroundGray};
  display: grid;
  align-items: center;
  text-align: center;
  &-File {
    border: 2px solid black;
    width: 400px;
    height: 200px;
    border: 2px solid black;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.12s ease-in;
  }
`;

const FileUploadWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 40%;
`;

const PlusImage = styled.img`
  vertical-align: middle;
  cursor: pointer;
`;

const ThumbnailButton = styled.button<{
  isSelectedThumbnail: boolean;
}>`
  color: white;
  font-size: 16px;
  background: ${({ isSelectedThumbnail }) =>
    isSelectedThumbnail ? theme.color.mainColor : 'rgba(60, 60, 60, 0.5)'};
  position: absolute;
  z-index: 101;
  top: 20px;
  right: 20px;
  border-radius: 5px;
  width: 60px;
  height: 35px;
`;

const DescriptionWrapper = styled.div`
  margin: 20px 0 0 70px;
`;
