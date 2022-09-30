import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useRef, useState } from 'react';
import { Button, PageContainer } from '~/components/atom';
import CourseMap from '~/components/domain/Map/CourseMap';
import theme from '~/styles/theme';
import PlaceInformation from '~/components/domain/CourseCreate/PlaceInformation';
import { SelectTags, Toast } from '~/components/common';
import { useRouter } from 'next/router';
import { CourseApi } from '~/service';
import { Period, RegionAndAll, SearchTagsValues, Spot, Theme } from '~/types';
import { IPlaceForm } from '~/types/place';
import { ICourseForm } from '~/types/course';
import {
  correctedPeriod,
  correctedRegion,
  correctedSpots,
  correctedThemes
} from '~/utils/converter';
import ConfirmModal from '~/components/common/ConfirmModal';

export async function getServerSideProps() {
  return {
    props: {}
  };
}
interface ICourseMap {
  kakaoMapId: number;
  latitude: string;
  longitude: string;
  name: string;
}

type QueryState = {
  keyword: string;
  period: Period | null;
  region: RegionAndAll;
  themes: Theme[];
  spots: Spot[];
  page: number;
  size: number;
};

const CourseEdit: NextPage = () => {
  const router = useRouter();
  const { courseQuery } = router.query;
  const courseInfo: ICourseForm = JSON.parse(courseQuery as string);
  const [title, setTitle] = useState(courseInfo.title);
  const [modalVisible, setModalVisible] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null as unknown as HTMLInputElement);
  const textAreasRef = useRef([] as HTMLTextAreaElement[]);
  const isRecommendedRef = useRef([] as HTMLButtonElement[]);
  const placeImagesRef = useRef([] as any);
  const ThumbnailButtonRef = useRef([] as HTMLButtonElement[]);
  const [queries, setQueries] = useState<QueryState>({
    keyword: '',
    period: (courseInfo.period && correctedPeriod(courseInfo.period)) || null,
    region: (courseInfo.region && correctedRegion(courseInfo.region)) || '전체보기',
    themes: (courseInfo.themes && correctedThemes(courseInfo.themes.toString())) || [],
    spots: (courseInfo.spots && correctedSpots(courseInfo.spots.toString())) || [],
    page: 0,
    size: 15
  });
  const formCourseData = {} as ICourseForm;
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
        id: place.id,
        kakaoMapId: place.kakaoMapId,
        name: place.name,
        description: textAreasRef.current[index].value,
        addressName: place.addressName,
        roadAddressName: place.roadAddressName,
        latitude: place.latitude.toString(),
        longitude: place.longitude.toString(),
        category: place.category !== '' ? place.category : 'DE',
        phoneNumber: place.phoneNumber !== '' ? place.phoneNumber : null,
        isRecommended: JSON.parse(isRecommendedRef.current[index].value),
        isThumbnail: JSON.parse(ThumbnailButtonRef.current[index].value),
        imageUrl: !placeImagesRef.current[index].files[0] ? place.imageUrl : null
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
      Toast.show('코스 제목을 입력해주세요!');
      if (titleRef.current !== null) {
        titleRef.current.focus();
      }
      return;
    } else {
      formCourseData.title = titleRef.current.value;
    }
    if (!queries.period) {
      Toast.show('기간을 설정해주세요!');
      return;
    }
    if (!queries.themes) {
      Toast.show('테마를 설정해주세요!');
      return;
    }
    if (!queries.spots) {
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
    formCourseData.region = courseInfo.region;
    formCourseData.places = placesFormDataSetter();
    formCourseData.period = queries.period;
    formCourseData.themes = queries.themes;
    formCourseData.spots = queries.spots;
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
      formData.append('images', placesImageData[i] ? placesImageData[i] : new Blob());
    }
    const updateCourse = async (formData: FormData) => {
      await CourseApi.update(courseInfo.id, formData).then((res) => {
        switch (res) {
          case 201:
            Toast.show('코스 수정이 완료되었습니다!');
            router.push(`/course/${courseInfo.id}`);
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
    updateCourse(formData);
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
    const { period, themes, spots } = data;
    setQueries({
      ...queries,
      period,
      themes,
      spots,
      page: 0
    });
  };
  const onUpdate = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <React.Fragment>
      <main>
        <PageContainer type="detail">
          <MapWrapper>
            <CourseMap course={courseMapData} />
          </MapWrapper>
          <TitleInputWrapper>
            <TitleInput
              placeholder="코스의 제목을 입력해주세요"
              ref={titleRef}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <TitleUnderLine />
            <SelectTags
              style={{ marginTop: '10px' }}
              onSelect={handleSelectTags}
              defaultValues={{
                period: courseInfo.period as Period,
                themes: courseInfo.themes as Theme[],
                spots: courseInfo.spots as Spot[]
              }}
            />
          </TitleInputWrapper>
          <PlacesWrapper>
            {courseInfo.places.map((place, index, courseInfo) => (
              <PlaceInformation
                key={index + 1}
                isLastPlace={courseInfo.length === index + 1}
                place={place}
                textAreaRef={(el: HTMLTextAreaElement) => (textAreasRef.current[index] = el)}
                isRecommendedRef={(el: HTMLButtonElement) => (isRecommendedRef.current[index] = el)}
                placeImageRef={(el: HTMLInputElement) => (placeImagesRef.current[index] = el)}
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
            {/* <Button buttonType="darkGray" width={184} height={75} onClick={placeModifyhandler}>
              장소 수정
            </Button> */}
            <Button buttonType="primary" width={184} height={75} onClick={onUpdate}>
              코스 수정
            </Button>
          </SubmitWrapper>
          <ConfirmModal
            visible={modalVisible}
            onClose={closeModal}
            onConfirm={courseUpdatehandler}
            message="코스 수정"
            subMessage="코스를 수정하시겠어요?"
          />
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
