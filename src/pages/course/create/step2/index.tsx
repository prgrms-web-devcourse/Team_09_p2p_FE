import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useRef, useState } from 'react';
import { Button, PageContainer } from '~/components/atom';
import { CategoryTitle, CourseList, SortFilter, Toast } from '~/components/common';
import CourseMap from '~/components/domain/Map/CourseMap';
import theme from '~/styles/theme';
import PlaceInformation from '~/components/domain/CourseCreate/PlaceInformation';
import { SelectTags } from '~/components/common';
import { useRouter } from 'next/router';
import { CourseApi } from '~/service';
import { SearchTagsValues } from '~/types';
import { ICourseInfo, ISelectedPlace } from '..';
import { IPlaceForm } from '~/types/place';

interface ICourseMap {
  kakaoMapId: number;
  latitude: string;
  longitude: string;
  name: string;
}

interface ICourseForm {
  title: string;
  region: string;
  period: string;
  description: string;
  themes: string[];
  spots: string[];
  places: IPlaceForm[];
}

const Course: NextPage = () => {
  const router = useRouter();
  const { courseQuery } = router.query;
  const titleRef = useRef<HTMLInputElement>(null as unknown as HTMLInputElement);
  const textAreasRef = useRef([] as HTMLTextAreaElement[]);
  const isRecommendedRef = useRef([] as HTMLButtonElement[]);
  const placeImagesRef = useRef([] as any);
  const ThumbnailButtonRef = useRef([] as HTMLButtonElement[]);
  const [selectedPlaces, setSelectedPlaces] = useState<ISelectedPlace[]>([]);
  if (!courseQuery) {
    return null;
  }

  const courseInfo: ICourseInfo = JSON.parse(courseQuery as string);
  const formCourseData = {} as ICourseForm;
  formCourseData.region = courseInfo.region;
  const courseMapData = courseInfo.places.map((place) => {
    return {
      kakaoMapId: place.kakaoMapId,
      latitude: place.latitude,
      longitude: place.longitude,
      name: place.name
    } as unknown as ICourseMap;
  });
  const placesFormDataSetter = () => {
    return courseInfo.places.map((place, index) => {
      return {
        kakaoMapId: place.kakaoMapId,
        name: place.name,
        description: textAreasRef.current[index].value,
        addressName: place.addressName,
        roadAddressName: place.roadAddressName,
        latitude: place.latitude,
        longitude: place.longitude,
        category: place.category !== '' ? place.category : 'DE9',
        phoneNumber: place.phoneNumber !== '' ? place.phoneNumber : null,
        isRecommended: JSON.parse(isRecommendedRef.current[index].value),
        isThumbnail: JSON.parse(ThumbnailButtonRef.current[index].value)
      } as IPlaceForm;
    });
  };
  const placesImageDataSetter = () => {
    return courseInfo.places.map((place, index) => {
      return placeImagesRef.current[index].files[0];
    });
  };
  const onChangeThumnail = (e: any) => {
    courseInfo.places.map((place, index) => {
      if (ThumbnailButtonRef.current[index] === undefined) {
        return;
      }
      if (Number(e.target.name) - 1 === index) {
        ThumbnailButtonRef.current[index].style.background = theme.color.mainColor;
        ThumbnailButtonRef.current[index].value = 'true';
      } else {
        ThumbnailButtonRef.current[index].style.background = 'rgba(60, 60, 60, 0.5)';
        ThumbnailButtonRef.current[index].value = 'false';
      }
    });
  };
  const courseCreatehandler = () => {
    if (titleRef.current.value === '') {
      Toast.show('코스 제목을 입력해주세요!');
      if (titleRef.current !== null) {
        titleRef.current.focus();
      }
      return;
    } else {
      formCourseData.title = titleRef.current.value;
    }
    if (formCourseData.period === '') {
      Toast.show('기간을 설정해주세요!');
      return;
    }
    if (formCourseData.themes.length === 0) {
      Toast.show('테마를 설정해주세요!');
      return;
    }
    if (formCourseData.spots.length === 0) {
      Toast.show('장소를 설정해주세요!');
      return;
    }
    if (courseInfo.places.length > ThumbnailButtonRef.current.length) {
      Toast.show('이미지를 전부 등록해주세요!');
      return;
    }
    for (let i = 0; i < courseInfo.places.length; i++) {
      if (textAreasRef.current[i].value === '') {
        Toast.show('장소 설명을 적어주세요!');
        textAreasRef.current[i].focus();
        return;
      }
    }
    formCourseData.places = placesFormDataSetter();
    const courseFormData = new FormData();
    const uploaderString = JSON.stringify(formCourseData);
    courseFormData.append(
      'course',
      new Blob([uploaderString], {
        type: 'application/json'
      })
    );
    const placesImageData: File[] = placesImageDataSetter();
    for (let i = 0; i < placesImageData.length; i++) {
      courseFormData.append('images', placesImageData[i]);
    }
    const createCourse = async (courseFormData: FormData) => {
      await CourseApi.create(courseFormData).then((res) => {
        switch (res) {
          case 201:
            Toast.show('코스 생성이 완료되었습니다!');
            // todo: 추후 상세 페이지로 바로 연결 예정
            router.push('/');
            break;
          case 400:
            Toast.show('잘못된 요청입니다. 메인 페이지로 이동합니다.');
            router.push('/');
            break;
          case 500:
            Toast.show('잘못된 요청입니다. 메인 페이지로 이동합니다.');
            router.push('/');
            break;
          default:
            break;
        }
      });
    };
    if (window.confirm('코스를 등록하시겠어요?')) {
      createCourse(courseFormData);
    }
  };

  const placeModifyhandler = () => {
    router.push(
      {
        pathname: '/course/create/',
        query: { requestPath: 'createStep2', courseQuery: courseQuery }
      },
      '/course/create/'
    );
  };

  const handleSelectTags = (data: SearchTagsValues) => {
    formCourseData.period = data.period !== null ? data.period : '';
    formCourseData.themes = data.themes;
    formCourseData.spots = data.spots;
  };

  return (
    <React.Fragment>
      <main>
        <PageContainer type="detail">
          <MapWrapper>
            <CourseMap course={courseMapData} />
          </MapWrapper>
          <TitleInputWrapper>
            <TitleInput placeholder="코스의 제목을 입력해주세요" ref={titleRef} />
            <TitleUnderLine />
            <SelectTags style={{ marginTop: '14px' }} onSelect={handleSelectTags} />
          </TitleInputWrapper>
          <PlacesWrapper>
            {courseInfo.places.map((place, index, courseInfo) => (
              <PlaceInformation
                key={index + 1}
                isLastPlace={courseInfo.length === index + 1}
                place={place}
                textAreaRef={(el: HTMLTextAreaElement) => (textAreasRef.current[index] = el)}
                isRecommendedRef={(el: HTMLButtonElement) => (isRecommendedRef.current[index] = el)}
                placeImageRef={(el: HTMLElement) => (placeImagesRef.current[index] = el)}
                ThumbnailButtonRef={(el: HTMLButtonElement) =>
                  (ThumbnailButtonRef.current[index] = el)
                }
                onChangeThumnail={onChangeThumnail}
                isModify={false}
                ModPropIsRecommended={place.isRecommended}
                ModPropIsThumbnail={place.isThumbnail}
                ModPropWrittenDescription={place.description}
                ModPropUploadedImage={place.imageUrl}
              >
                {index + 1}
              </PlaceInformation>
            ))}
          </PlacesWrapper>
          <SubmitWrapper>
            <Button buttonType="darkGray" width={184} height={75} onClick={placeModifyhandler}>
              장소 수정
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
  padding-bottom: 42px;
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
  padding: 10px 0px 20px;
  font-weight: 700;
  /* 이 부분이 폰트적용이 안되어서 임시로 이렇게 넣음 */
  font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  width: 100%;

  &:focus {
    outline: none;

    + span {
      transform: scale(1);
    }
  }
  ::-webkit-input-placeholder {
    color: ${theme.color.fontGray};
    font-weight: 500;
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
