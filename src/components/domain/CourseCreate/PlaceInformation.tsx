import styled from '@emotion/styled';
import { MutableRefObject, ReactNode, SetStateAction, useCallback, useRef, useState } from 'react';
import { Text } from '~/components/atom';
import theme from '~/styles/theme';
import Textarea from '~/components/atom/Textarea';
import Image from 'next/image';
import ImageUpload from '~/components/common/ImageUpload';
import { IPlaceForm } from '~/types/place';

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
  const [isRecommended, setIsRecommended] = useState(false);
  const imageRef = useRef(null);
  // any는 추후 제거하겠습니다!
  const handleRecommend = (e: any) => {
    if (!isRecommended) {
      e.target.style = 'background-color: skyblue';
    } else {
      e.target.style = 'background-color: white';
    }
    e.target.value = !isRecommended;
    setIsRecommended(!isRecommended);
  };

  // any는 추후 제거하겠습니다!
  const handleFileOnChange = (imageFile: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(imageFile);
      setPreviewUrl(reader.result as SetStateAction<string>);
    };
    reader.readAsDataURL(imageFile);
    const { current } = imageRef as unknown as MutableRefObject<HTMLElement>;
    if (current !== null) {
      current.style.display = 'none';
    }
  };
  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files[0].name);
  }, []);
  const onUploadImageButtonClick = useCallback(() => {
    if (!placeImageRef.current) {
      return;
    }
    placeImageRef.current.onclick();
  }, []);
  let profile_preview = null;
  const imageId = 'imgFile' + children;
  if (file !== '' /*  || isModify */) {
    profile_preview = (
      // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
      <>
        {file !== '' ? (
          <Image
            style={{
              width: '830px',
              height: '500px',
              zIndex: '100',
              borderRadius: '8px',
              objectFit: 'contain'
            }}
            className="profile_preview"
            src={previewUrl}
            layout="fill"
          />
        ) : (
          /* 이미지 URL로 파일을 못 잃어와 임시로 previewUrl 처리 */
          <Image
            style={{
              width: '830px',
              height: '500px',
              zIndex: '100',
              borderRadius: '8px',
              objectFit: 'contain'
            }}
            className="profile_preview"
            src={previewUrl as string}
            layout="fill"
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
              id={`place_${children}`}
              onClick={handleRecommend}
              ref={isRecommendedRef}
              value={isRecommended.toString()}
            >
              추천👍
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
              <label id="image-label" htmlFor={imageId} ref={imageRef}>
                <SelectImage>
                  <PlusImage src="/assets/imageUpload.png" />
                </SelectImage>
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

const RecommendButton = styled.button`
  border: 1px solid ${theme.color.mainColor};
  border-radius: 20px;
  padding: 5px 15px 5px 15px;
`;

const ImageUploadWrapper = styled.div`
  //width: 830px;
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
  position: relative;
`;

const FileUploadWrapper = styled.div`
  width: 100%;
`;

const SelectImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${theme.color.backgroundDarkGray};
  border-radius: 8px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlusImage = styled.img`
  vertical-align: middle;
  width: 32px;
  height: 32px;
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
