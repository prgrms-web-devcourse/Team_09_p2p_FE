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
import { SearchTagsValues } from '~/types';
import { IPlace, IPlaceForm } from '~/types/place';
import { ICourseForm } from '~/types/course';
//import { ICourseInfo } from '..';

interface ICourseMap {
  id: number;
  latitude: string;
  longitude: string;
  name: string;
}

/* export interface IPlaceForm {
  kakaoMapId: number;
  name: string;
  description: string;
  addressName: string;
  roadAddressName: string;
  latitude: string;
  longitude: string;
  category: string;
  phoneNumber: string;
  isRecommended: boolean;
  isThumbnail: boolean;
  imageUrl: string;
} */

const CourseEdit: NextPage = () => {
  const router = useRouter();
  const { courseQuery } = router.query;
  const titleRef = useRef<HTMLInputElement>(null as unknown as HTMLInputElement);
  const textAreasRef = useRef([] as HTMLTextAreaElement[]);
  const isRecommendedRef = useRef([] as HTMLButtonElement[]);
  const placeImagesRef = useRef([] as any);
  const ThumbnailButtonRef = useRef([] as HTMLButtonElement[]);
  if (!courseQuery) {
    return null;
  }
  const courseInfo: ICourseForm = JSON.parse(courseQuery as string);
  console.log(courseInfo);
  //const [title, setTitle] = useState(courseInfo ? courseInfo.title : '');
  const formCourseData = {} as ICourseForm;
  /* const courseInfo = {
    id: 645,
    region: '대전',
    title: '대전 코스',
    period: '',
    theme: [],
    spot: [],
    places: [
      {
        id: 1266228191,
        lat: 35.0768018,
        lng: 129.023402,
        name: '송도해상케이블카 송도베이스테이션',
        address: '부산 서구 송도해변로 171',
        roadAddressName: '부산 서구 송도해변로 171',
        category: 'FD6',
        phoneNumber: '051-247-9900',
        description: '111',
        isRecommended: true,
        isThumbnail: false,
        imageUrl:
          'https://devcourse-f-s3-storage.s3.ap-northeast-2.amazonaws.com/6edff328bb03450896b08f1f2ed37ee9.jpeg'
      },
      {
        id: 8202423,
        lat: 35.1538826,
        lng: 129.118628,
        name: '광안리해수욕장',
        address: '부산 수영구 광안해변로 219',
        roadAddressName: '부산 수영구 광안해변로 219',
        category: 'FD6',
        phoneNumber: '051-610-4744',
        description: '222',
        isRecommended: false,
        isThumbnail: true,
        imageUrl:
          'https://devcourse-f-s3-storage.s3.ap-northeast-2.amazonaws.com/be121a283f60459a8a4cd5d9aab2ed4e.png'
      },
      {
        id: 8111808,
        lat: 35.0554585,
        lng: 129.087973,
        name: '태종대유원지',
        address: '부산 영도구 동삼동 산 29-1',
        roadAddressName: '부산광역시 영도구 전망로 209',
        category: 'FD6',
        phoneNumber: '051-405-8745',
        description: '333',
        isRecommended: true,
        isThumbnail: false,
        imageUrl:
          'https://devcourse-f-s3-storage.s3.ap-northeast-2.amazonaws.com/db65798fd7ef44b4a332097848df8d10.png'
      }
    ]
  }; */
  formCourseData.region = courseInfo.region;
  formCourseData.description =
    '인천은 하루에 돌아보기 좋은 관광지다. 구한말 외세의 세력이 밀려들던 곳도 이곳이고 그만큼 많은 애환과 흔적을 남겼다. 인천차이나타운만의 이국적 색깔과 중국과 한국이 믹스된 중국식 음식들과 바다, 어시장 그리고 혁신적인 인천대교의 웅장함까지 아주 즐거운 하루를 선사받을 것이다.';

  const courseMapData = courseInfo.places.map((place) => {
    return {
      id: place.kakaoMapId,
      latitude: place.latitude,
      longitude: place.longitude,
      name: place.name
    } as unknown as ICourseMap;
  });
  const placesFormDataSetter = () => {
    return courseInfo.places.map((place, index) => {
      return {
        id: place.id,
        kakaoMapId: place.kakaoMapId,
        name: place.name,
        description: textAreasRef.current[index].value,
        addressName: place.addressName,
        roadAddressName: place.roadAddressName,
        latitude: place.latitude.toString(),
        longitude: place.longitude.toString(),
        category: place.category !== '' ? place.category : 'DE',
        phoneNumber: place.phoneNumber,
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
  const courseUpdatehandler = () => {
    if (titleRef.current.value === '') {
      alert('코스 제목을 입력해주세요!');
      if (titleRef.current !== null) {
        titleRef.current.focus();
      }
      return;
    } else {
      formCourseData.title = titleRef.current.value;
    }
    if (formCourseData.period === '') {
      alert('기간을 설정해주세요!');
      return;
    }
    if (formCourseData.themes.length === 0) {
      alert('테마를 설정해주세요!');
      return;
    }
    if (formCourseData.spots.length === 0) {
      alert('장소를 설정해주세요!');
      return;
    }
    if (courseInfo.places.length > ThumbnailButtonRef.current.length) {
      alert('이미지를 전부 등록해주세요!');
      return;
    }
    for (let i = 0; i < courseInfo.places.length; i++) {
      if (textAreasRef.current[i].value === '') {
        alert('장소 설명을 적어주세요!');
        textAreasRef.current[i].focus();
        return;
      }
    }
    formCourseData.places = placesFormDataSetter();
    const formData = new FormData();
    const uploaderString = JSON.stringify(formCourseData);
    formData.append(
      'course',
      new Blob([uploaderString], {
        type: 'application/json'
      })
    );
    const placesImageData: File[] = placesImageDataSetter();
    for (let i = 0; i < placesImageData.length; i++) {
      formData.append('images', placesImageData[i]);
    }
    const updateCourse = async (formData: FormData) => {
      await CourseApi.update(courseInfo.id, formData).then((res) => {
        switch (res) {
          case 201:
            alert('코스 수정이 완료되었습니다!');
            router.push(`/course/${courseInfo.id}`);
            break;
          case 400:
            alert('잘못된 요청입니다. 메인 페이지로 이동합니다.');
            router.push('/');
            break;
          case 500:
            alert('잘못된 요청입니다. 메인 페이지로 이동합니다.');
            router.push('/');
            break;
          default:
            break;
        }
      });
    };
    if (window.confirm('코스를 수정하시겠어요?')) {
      updateCourse(formData);
    }
  };

  const placeModifyhandler = () => {
    router.push(
      {
        pathname: `/course/${courseInfo.id}/edit/step1/`,
        query: { requestPath: 'editStep2', courseQuery: courseQuery }
      },
      `/course/${courseInfo.id}/edit/step1/`
    );
  };

  const handleSelectTags = (data: SearchTagsValues) => {
    formCourseData.period = data.period !== null ? data.period : '';
    formCourseData.themes = data.theme;
    formCourseData.spots = data.spot;
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
            <SelectTags style={{ marginTop: '10px' }} onSelect={handleSelectTags} />
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
                isModify={true}
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
            <Button buttonType="primary" width={184} height={75} onClick={courseUpdatehandler}>
              코스 수정
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

export default CourseEdit;