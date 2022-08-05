import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { Button, PageContainer } from '~/components/atom';
import { CategoryTitle, CourseList, SortFilter } from '~/components/common';
import CourseMap from '~/components/domain/Map/CourseMap';
import theme from '~/styles/theme';
import numbering from '~/../public/assets/numbering.png';
import PlaceInformation from '~/components/domain/CourseCreate/PlaceInformation';
import { SelectTags } from '~/components/common';
import { useRouter } from 'next/router';
import { CourseApi } from '~/service';

type PlaceType = {
  id: number;
  lat: number;
  lng: number;
  name: string;
  address: string;
  roadAddressName: string;
  category: string;
  phoneNumber: string;
};

type CourseInfoType = {
  region: string;
  places: PlaceType[];
};

type PlaceFormType = {
  kakaoMapId: string;
  name: string;
  description: string;
  addressName: string;
  roadAddressName: string;
  latitude: string;
  longitude: string;
  category: string;
  phoneNumber: string;
  isRecommended: boolean;
};

type CourseFormType = {
  title: string;
  region: string;
  period: string;
  description: string;
  themes: string[];
  spots: string[];
  places: PlaceFormType[];
};

const Course: NextPage = () => {
  const router = useRouter();
  const { courseQuery } = router.query;
  const titleRef = useRef<HTMLInputElement>(null as unknown as HTMLInputElement);
  // todo: 필터 컴포넌트 호출 후 사용할 예정
  /* const [period, setPeriod] = useState('');
  const [themes, setThemes] = useState([]);
  const [spots, setSpots] = useState([]); */
  const textAreasRef = useRef([] as HTMLTextAreaElement[]);
  const placeImagesRef = useRef([] as any);
  const [placeImages, setPlaceImages] = useState([] as any);
  if (!courseQuery) {
    return null;
  }
  const courseInfo: CourseInfoType = JSON.parse(courseQuery as string);
  const formCourseData = {} as CourseFormType;
  formCourseData.region = courseInfo.region;

  const courseMapData = courseInfo.places.map((place) => {
    return {
      placeId: place.id,
      lat: place.lat,
      lng: place.lng,
      placeName: place.name
    };
  });
  const placesFormDataSetter = () => {
    return courseInfo.places.map((place, index) => {
      return {
        kakaoMapId: place.id.toString(),
        name: place.name,
        description: textAreasRef.current[index].value,
        addressName: place.address,
        roadAddressName: place.roadAddressName,
        latitude: place.lat.toString(),
        longitude: place.lng.toString(),
        category: place.category,
        phoneNumber: place.phoneNumber,
        isRecommended: false
      };
    });
  };
  const placesImageDataSetter = () => {
    return courseInfo.places.map((place, index) => {
      return {
        imageFile: placeImagesRef.current[index].files[0]
      };
    });
  };
  const courseCreatehandler = () => {
    if (titleRef.current.value === '') {
      alert('코스 제목을 입력해주세요!');
      if (titleRef.current !== null) {
        titleRef.current.focus();
      }
      return;
    } else {
      formCourseData.title = titleRef.current.value;
    }
    // 추후 필터 구현되면 연결
    ////
    formCourseData.period = '당일';
    formCourseData.themes = ['힐링', '가족여행'];
    formCourseData.spots = ['음식점', '테마파크'];
    ////
    formCourseData.places = placesFormDataSetter();
    const formData = new FormData();
    setPlaceImages(placesImageDataSetter());
    console.log(formCourseData);
    formData.append('course', JSON.stringify(formCourseData));
    const placesImageData: any = placesImageDataSetter();

    for (let i = 0; i < placesImageData.length; i++) {
      formData.append('images', placesImageData[i]);
    }
    const createCourse = async (formData: FormData) => {
      const response = await CourseApi.create(formData);
      console.log('코스 등록 성공!!', response);
      // todo: response status 처리 연동 후 구현
      /* await CourseApi.create(formData).then((res) => {
        console.log(res);
        switch (res.status) {
          case 200:
            alert('코스 생성이 완료되었습니다!');
            router.push('/');
            break;
          case 401:
            alert('잘못된 요청입니다. 메인 페이지로 이동합니다.');
            router.push('/');
            break;
          default:
            break;
        }
      }); */
    };
    createCourse(formData);
  };
  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageContainer type="detail">
          <MapWrapper>
            <CourseMap course={courseMapData} />
          </MapWrapper>
          <TitleInputWrapper>
            <TitleInput placeholder="코스의 제목을 입력해주세요" ref={titleRef} />
            <TitleUnderLine />
            <SelectTags style={{ marginTop: '10px' }} />
          </TitleInputWrapper>
          <PlacesWrapper>
            {courseInfo.places.map((place, index, courseInfo) => (
              <PlaceInformation
                key={index + 1}
                isLastPlace={courseInfo.length === index + 1}
                place={place}
                textAreaRef={(el: HTMLTextAreaElement) => (textAreasRef.current[index] = el)}
                placeImageRef={(el: HTMLElement) => (placeImagesRef.current[index] = el)}
              >
                {index + 1}
              </PlaceInformation>
            ))}
          </PlacesWrapper>
          <SubmitWrapper>
            <Button buttonType="darkGray" width={184} height={75} onClick={courseCreatehandler}>
              코스 수정{/* 요건 아마 취소버튼으로 변경될거같네요 */}
            </Button>
            <Button buttonType="primary" width={184} height={75} onClick={courseCreatehandler}>
              코스 등록
            </Button>
          </SubmitWrapper>
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

const MapWrapper = styled.div`
  margin: 50px 0 50px 0;
`;

const TitleInputWrapper = styled.div`
  background-color: #fff;
  border-radius: 2px;
  box-sizing: border-box;
  height: 350px;
  width: 100%;
  text-align: center;
`;

const TitleInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${theme.color.fontGray};
  box-sizing: border-box;
  font-family: 'Arvo';
  font-size: 32px;
  height: 50px;
  padding: 10px 0px;

  width: 100%;

  &:focus {
    outline: none;
    ::-webkit-input-placeholder {
      color: dodgerblue;
    }
    + span {
      transform: scale(1);
    }
  }
  ::-webkit-input-placeholder {
    color: ${theme.color.fontGray};
  }
`;

const TitleUnderLine = styled.span`
  background-color: dodgerblue;
  display: inline-block;
  height: 2px;
  width: 100%;
  transform: scale(0, 1);
  margin-bottom: 20px;
`;

const PlacesWrapper = styled.div`
  width: 100%;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  padding-top: 50px;
  padding-bottom: 30px;
`;

const SubmitWrapper = styled.div`
  justify-content: center;
  display: flex;
  margin: 70px 0 151px 0;
  gap: 20px;
`;

export default Course;
