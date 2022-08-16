import styled from '@emotion/styled';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import theme from '~/styles/theme';
import Button from '~/components/atom/Button';
import { Icon, Text, Title } from '~/components/atom';
import Modal from '~/components/atom/Modal';
import RegionSelect from '~/components/domain/CourseCreate/RegionSelect';
import { useRouter } from 'next/router';
import SearchMap from '~/components/domain/Map/SearchMap';
import { IPlaceForm } from '~/types/place';
import Layout from '~/components/common/Layout';
import { Toast } from '~/components/common';

export interface IPlace {
  id: number;
  lat: number;
  lng: number;
  name: string;
  address: string;
  roadAddressName: string;
  category: string;
  phoneNumber: string;
}
export interface ICourseInfo {
  spots: any;
  themes: any;
  period: any;
  region: string;
  places: IPlaceForm[];
}

export interface ISelectedPlace {
  id: number;
  lat: number;
  lng: number;
  name: string;
  address: string;
  roadAddressName: string;
  category: string;
  phoneNumber: string;
}

const CourseCreate = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const [selectedPlaces, setSelectedPlaces] = useState<IPlaceForm[]>([]);
  const [isModify, setIsModify] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('서울');
  const queryData = {} as ICourseInfo;
  useEffect(() => {
    if (router.query.hasOwnProperty('requestPath')) {
      const { courseQuery } = router.query;
      if (courseQuery) {
        const courseInfo: ICourseInfo = JSON.parse(courseQuery as string);
        setSelectedPlaces(courseInfo.places);
        setSelectedRegion(courseInfo.region);
        setIsModify(true);
      }
    }
  }, []);
  const setPlaces = () => {
    return selectedPlaces.map((selectedPlace) => {
      return {
        kakaoMapId: selectedPlace.kakaoMapId,
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        name: selectedPlace.name,
        addressName: selectedPlace.addressName,
        roadAddressName: selectedPlace.roadAddressName,
        category: selectedPlace.category,
        phoneNumber: selectedPlace.phoneNumber
      } as unknown as IPlaceForm;
    });
  };

  const setCoureData = () => {
    queryData.region = selectedRegion;
    queryData.places = setPlaces();
    return JSON.stringify(queryData);
  };
  const deletePlace = (deleteSelectedPlace: IPlaceForm) => {
    setSelectedPlaces(
      selectedPlaces.filter(
        (selectedPlace) => selectedPlace.kakaoMapId !== deleteSelectedPlace.kakaoMapId
      )
    );
  };
  const handleNextStep = () => {
    if (selectedPlaces.length < 2) {
      Toast.show('장소를 두 군데 이상 추가해주세요!');
      return;
    }
    router.push(
      {
        pathname: '/course/create/step2',
        query: { requestPath: 'createStep1', courseQuery: setCoureData() }
      },
      '/course/create/step2'
    );
  };
  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ height: '100%', overflow: 'hidden' }}>
        <Modal visible={visible} onClose={() => setVisible(visible)}>
          <RegionSelect
            onClose={() => setVisible(false)}
            isModify={isModify}
            setIsModify={setIsModify}
            loadedRegion={selectedRegion}
            setSelectedPlaces={setSelectedPlaces}
            setLoadedRegion={setSelectedRegion}
            selectedPlacesLength={selectedPlaces.length}
          />
        </Modal>
        <CreateWrapper className="landing-page">
          <SelectedArea>
            <SelectedHeader>
              <div>
                <Icon.Button name="arrow" size={25} rotate={180} onClick={() => setVisible(true)} />
              </div>
              <Title size="sm" style={{ marginLeft: '40%' }}>
                {selectedRegion}
              </Title>
            </SelectedHeader>
            <ScrollWrapper>
              {selectedPlaces.map((selectedPlace, index) => {
                return (
                  <>
                    <PlaceWrapper>
                      <PlaceIndex>{index + 1}</PlaceIndex>
                      <SelectedPlace>
                        <PlaceHeader>
                          <PlaceName>{selectedPlace.name}</PlaceName>
                          <CloseButton
                            name="close"
                            size={14}
                            onClick={() => deletePlace(selectedPlace)}
                          />
                        </PlaceHeader>
                        <Text size="sm" color="gray">
                          {selectedPlace.roadAddressName}
                        </Text>
                      </SelectedPlace>
                    </PlaceWrapper>
                  </>
                );
              })}
            </ScrollWrapper>
            <Button buttonType="primary" size="lg" width="100%" onClick={handleNextStep}>
              코스 지정 완료
            </Button>
          </SelectedArea>
          <MapArea>
            <SearchMap
              setSelectedPlaces={setSelectedPlaces}
              selectedPlaces={selectedPlaces}
              selectedRegion={selectedRegion}
            />
          </MapArea>
        </CreateWrapper>
      </main>
    </React.Fragment>
  );
};

export default CourseCreate;

CourseCreate.getLayout = function getLayout(page: ReactElement) {
  return <Layout full>{page}</Layout>;
};

const CreateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const SelectedArea = styled.div`
  width: 35%;
  margin: 0px 20px 0px 20px;
`;

const SelectedHeader = styled.div`
  margin: 30px 0 20px 0;
  text-align: center;
  display: flex;
  align-items: end;
`;

const SelectedPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  padding: 20px 20px;
  box-sizing: border-box;
  width: 90%;
  text-align: left;
  border: 1px solid ${theme.color.borderGray};
  box-shadow: ${theme.shadow.basicShadow};
  border-radius: 8px;
`;

const PlaceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 6px;
`;

const CloseButton = styled(Icon.Button)`
  margin-left: 20px;
`;

const PlaceName = styled.span`
  font-size: 20px;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ScrollWrapper = styled.div`
  height: calc(85vh - 145px);
  overflow-x: hidden;
  overflow-y: auto;
`;

const MapArea = styled.div`
  width: 100%;
`;

const PlaceWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 0px 0px 0px;
  margin-bottom: 20px;
`;

const PlaceIndex = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${theme.color.mainColor};
  font-size: 20px;
  color: white;
  text-align: center;
  line-height: 40px;
  margin-right: 20px;
  flex-shrink: 0;
`;
