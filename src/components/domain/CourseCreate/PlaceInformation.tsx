import styled from '@emotion/styled';
import { ReactNode, SetStateAction, useRef, useState } from 'react';
import { Text } from '~/components/atom';
import theme from '~/styles/theme';
import Textarea from '~/components/atom/Textarea';
import Image from 'next/image';

interface PlaceInformation {
  children: ReactNode;
  isLastPlace: boolean;
}

const PlaceInformation = ({ children, isLastPlace }: PlaceInformation) => {
  const [imgBase64, setImgBase64] = useState(''); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [file, setFile] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isRecommended, setIsRecommended] = useState(false);
  const imageRef = useRef(null);
  const handleRecommend = (e: any) => {
    if (!isRecommended) {
      e.target.style = 'background-color: skyblue';
    } else {
      e.target.style = 'background-color: white';
    }
    setIsRecommended(!isRecommended);
  };
  const handleChangeFile = (e: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      console.log(base64);
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
        console.log('2');
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      console.log('4');
      setImgFile(e.target.files[0]); // 파일 상태 업데이트
      console.log('5');
    }
  };

  const handleFileOnChange = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setPreviewUrl(reader.result as SetStateAction<string>);
    };
    reader.readAsDataURL(file);
    const { current } = imageRef as any;
    if (current !== null) {
      current.style.display = 'none';
    }
  };
  let profile_preview = null;
  if (file !== '') {
    profile_preview = (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img
        style={{ width: '830px', height: '500px', zIndex: '100', borderRadius: '8px' }}
        className="profile_preview"
        src={previewUrl}
      ></img>
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
              인천공항
            </Text>
            <RecommendButton id={'place_'.concat(children as string)} onClick={handleRecommend}>
              추천👍
            </RecommendButton>
          </NumberWrapper>
          <Text color="gray" size={'md'} style={{ marginLeft: '70px' }}>
            인천 중구 공항로 207 인천국제공항역
          </Text>
          <ImageUploadWrapper>
            <input
              type="file"
              id={imageId}
              name="imgFile"
              accept="image/jpg,impge/png,image/jpeg,image/gif"
              style={{ display: 'none' }}
              onChange={handleFileOnChange}
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
    @include alignCenter();
    cursor: pointer;
    transition: 0.12s ease-in;
  }
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

const DescriptionWrapper = styled.div`
  margin: 20px 0 0 70px;
`;
