import styled from '@emotion/styled';
import type { NextPage } from 'next';
import PlaceMap from '~/components/domain/Map/PlaceMap';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import theme from '~/styles/theme';
import Button from '~/components/atom/Button';
import { Link, Icon, Text } from '~/components/atom';
import CloseIcon from '~/components/domain/CourseCreate/SelectedArea/CloseIcon';
import PlusIcon from '~/components/domain/CourseCreate/SearchArea/PlusIcon';
import Modal from '~/components/atom/Modal';
import RegionSelect from '~/components/domain/CourseCreate/RegionSelect';
import { useRouter } from 'next/router';
import { SearchInput } from '~/components/common';
import SearchMap from '~/components/domain/Map/SearchMap';
import { IPlaceForm } from '~/types/place';

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
interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}
const CourseCreate: NextPage = () => {
  const router = useRouter();
  // 제출한 검색어 관리
  const [Keyword, setKeyword] = useState('');
  const [Value, setValue] = useState('');
  const [map, setMap] = useState<kakao.maps.Map>();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [visible, setVisible] = useState(true);
  const [region, setRegion] = useState('서울');
  const [selectedPlaces, setSelectedPlaces] = useState<IPlaceForm[]>([]);
  const [isModify, setIsModify] = useState(false);
  const [loadedRegion, setLoadedRegion] = useState('');
  //const [queryData, setQueryData] = useState();
  const queryData = {} as ICourseInfo;
  useEffect(() => {
    if (router.query.hasOwnProperty('requestPath')) {
      const { courseQuery } = router.query;
      if (courseQuery) {
        const courseInfo: ICourseInfo = JSON.parse(courseQuery as string);
        setSelectedPlaces(courseInfo.places);
        setRegion(courseInfo.region);
        setLoadedRegion(courseInfo.region);
        setIsModify(true);
      }
    }
  }, []);
  const handleNextStep = () => {
    router.push('/course/create/step2');
  };
  const handleSearch = (keyword: string) => {
    console.log();
  };
  const dummyCourse = {
    region: region,
    places: [
      {
        id: 1266228191,
        lat: 35.0768018,
        lng: 129.023402,
        name: '송도해상케이블카 송도베이스테이션',
        address: '부산 서구 송도해변로 171',
        roadAddressName: '부산 서구 송도해변로 171',
        category: 'FD6',
        phoneNumber: '051-247-9900'
      },
      {
        id: 8202423,
        lat: 35.1538826,
        lng: 129.118628,
        name: '광안리해수욕장',
        address: '부산 수영구 광안해변로 219',
        roadAddressName: '부산 수영구 광안해변로 219',
        category: 'FD6',
        phoneNumber: '051-610-4744'
      },
      {
        id: 8111808,
        lat: 35.0554585,
        lng: 129.087973,
        name: '태종대유원지',
        address: '부산 영도구 동삼동 산 29-1',
        roadAddressName: '부산광역시 영도구 전망로 209',
        category: 'FD6',
        phoneNumber: '051-405-8745'
      }
    ]
  };
  const setPlaces = () => {
    return selectedPlaces.map((selectedPlace) => {
      return {
        kakaoMapId: selectedPlace.id,
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
    queryData.region = region;
    queryData.places = setPlaces();
    return JSON.stringify(queryData);
  };
  const deletePlace = (deleteSelectedPlace: IPlaceForm) => {
    setSelectedPlaces(
      selectedPlaces.filter((selectedPlace) => selectedPlace.id !== deleteSelectedPlace.id)
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
            setRegion={setRegion}
            onClose={() => setVisible(false)}
            isModify={isModify}
            loadedRegion={loadedRegion}
            setSelectedPlaces={setSelectedPlaces}
          />
        </Modal>
        <CreateWrapper className="landing-page">
          <SelectedArea>
            <SelectedHeader>
              <Icon name="arrow" size={25} rotate={180} />
              <Text size={'xl'} style={{ marginLeft: '40%' }}>
                {/* {visible === false ? region : '서울'} */}
                {region}
              </Text>
            </SelectedHeader>
            <ScrollWrapper>
              {selectedPlaces.map((selectedPlace, index) => {
                return (
                  <>
                    <PlaceWrapper>
                      <PlaceIndex>{index + 1}</PlaceIndex>
                      <SelectedPlace>
                        <div style={{ margin: '20px 0px 0px 20px' }}>
                          <Text size="lg">{selectedPlace.name}</Text>
                          <CloseIcon onClick={() => deletePlace(selectedPlace)} />
                        </div>
                        <Text size="sm" color="gray" style={{ marginLeft: '20px' }}>
                          {selectedPlace.roadAddressName}
                        </Text>
                      </SelectedPlace>
                    </PlaceWrapper>
                  </>
                );
              })}
            </ScrollWrapper>
            <Link
              href={{
                pathname: '/course/create/step2',
                /* query: { courseQuery: JSON.stringify(dummyCourse) } */
                query: { courseQuery: setCoureData() }
              }}
              /* as={`/course/create/step2`} */
              // query string 안보여주기 위해 필요한데 type error때문에 주석처리
            >
              <Button buttonType="primary" size="lg" width="100%">
                코스 지정 완료
              </Button>
            </Link>
          </SelectedArea>
          <MapArea>
            <SearchMap
              setSelectedPlaces={setSelectedPlaces}
              selectedPlaces={selectedPlaces}
            ></SearchMap>
          </MapArea>
        </CreateWrapper>
      </main>
    </React.Fragment>
  );
};

export default CourseCreate;

const { mainColor } = theme.color;

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
  align-items: center;
`;

const SelectedPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  padding: 35px 0px 13px 0px;
  margin: 10px 0px 10px 0px;
  //margin-bottom: 20px;
  gap: 20px;
  width: 100%;
  height: 60px;
  border: 1px solid #f3f4f4;
  border-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
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
`;

const PlaceIndex = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${theme.color.mainColor};
  font-size: 20px;
  color: white;
  text-align: center;
  line-height: 50px;
  margin-right: 20px;
`;
