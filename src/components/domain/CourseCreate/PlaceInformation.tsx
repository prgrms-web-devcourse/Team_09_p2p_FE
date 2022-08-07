import styled from '@emotion/styled';
import { MutableRefObject, ReactNode, SetStateAction, useRef, useState } from 'react';
import { Text } from '~/components/atom';
import theme from '~/styles/theme';
import Textarea from '~/components/atom/Textarea';

interface IPlace {
  id: number;
  lat: number;
  lng: number;
  name: string;
  address: string;
  roadAddressName: string;
  category: string;
  phoneNumber: string;
}
interface IPlaceInformation {
  children: ReactNode;
  isLastPlace: boolean;
  place: IPlace;
  textAreaRef: (el: HTMLTextAreaElement) => HTMLTextAreaElement;
  isRecommendedRef: (el: HTMLButtonElement) => HTMLButtonElement;
  ThumbnailButtonRef: (el: HTMLButtonElement) => HTMLButtonElement;
  placeImageRef: any;
  onChangeThumnail: any;
}

const PlaceInformation = ({
  children,
  isLastPlace,
  place,
  textAreaRef,
  isRecommendedRef,
  ThumbnailButtonRef,
  placeImageRef,
  onChangeThumnail
}: IPlaceInformation) => {
  const [file, setFile] = useState('');
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
  const handleFileOnChange = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setPreviewUrl(reader.result as SetStateAction<string>);
    };
    reader.readAsDataURL(file);
    const { current } = imageRef as unknown as MutableRefObject<HTMLElement>;
    if (current !== null) {
      current.style.display = 'none';
    }
  };
  let profile_preview = null;
  if (file !== '') {
    profile_preview = (
      // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
      <>
        <img
          style={{ width: '830px', height: '500px', zIndex: '100', borderRadius: '8px' }}
          className="profile_preview"
          src={previewUrl}
        />
        <ThumbnailButton
          name={children?.toString()}
          onClick={onChangeThumnail}
          ref={ThumbnailButtonRef}
          value={children === 1 ? 'true' : 'false'}
          isFisrtPlace={children === 1 ? true : false}
        >
          대표
        </ThumbnailButton>
      </>
    );
  }
  const imageId = 'imgFile' + children;
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
              id={'place_'.concat(children as string)}
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
            <input
              type="file"
              id={imageId}
              name="imgFile"
              accept="image/jpg,impge/png,image/jpeg,image/gif"
              style={{ display: 'none' }}
              onChange={handleFileOnChange}
              ref={placeImageRef}
            />
            <FileUploadWrapper ref={imageRef}>
              <label htmlFor={imageId}>
                <SelectImage>
                  <PlusImage src="/assets/imageUpload.png" />
                </SelectImage>
              </label>
            </FileUploadWrapper>
            {profile_preview}
          </ImageUploadWrapper>
          <DescriptionWrapper>
            <Textarea
              width={810}
              height={200}
              placeholder={'장소에 대한 추억을 공유해주세요!☺️☺️'}
              textAreaRef={textAreaRef as unknown as MutableRefObject<HTMLTextAreaElement>}
            ></Textarea>
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
  left: 3.2%;
  transform: translate(-50%, -50%);
`;

const RecommendButton = styled.button`
  border: 1px solid ${theme.color.mainColor};
  border-radius: 20px;
  padding: 5px 15px 5px 15px;
`;

const ImageUploadWrapper = styled.div`
  width: 830px;
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
  isFisrtPlace: boolean;
}>`
  color: white;
  font-size: 16px;
  background: ${({ isFisrtPlace }) =>
    isFisrtPlace ? theme.color.mainColor : 'rgba(60, 60, 60, 0.5)'};
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
