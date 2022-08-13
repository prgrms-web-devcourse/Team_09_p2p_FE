import styled from '@emotion/styled';
import Script from 'next/script';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Link, Icon, Text } from '~/components/atom';
import { SearchInput } from '~/components/common';
import PlusIcon from '~/components/domain/CourseCreate/SearchArea/PlusIcon';
import { MARKER_IMAGE_URLS } from 'src/utils/constants';
import { IPlaceForm } from '~/types/place';

interface placeType {
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  place_url: string;
}

interface SearchMap {
  setSelectedPlaces: Dispatch<SetStateAction<IPlaceForm[]>>;
  selectedPlaces: IPlaceForm[];
}

let isAlreadyLoaded = false;
let curMarkerObject: kakao.maps.Marker | null = null;
const SearchMap = ({ setSelectedPlaces, selectedPlaces }: SearchMap) => {
  const [loaded, setLoaded] = useState(isAlreadyLoaded);
  const [mapObject, setMapObject] = useState<kakao.maps.Map>();
  const [searchedPlaces, setSearchedPlaces] = useState<IPlaceForm[]>([]);
  const [kakaoDataArray, setKakaoDataArray] = useState<any>([]);
  const [curKeyword, setCurKeyword] = useState('');
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, []);
  // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
  useEffect(() => {
    if (mapObject === null || mapObject === undefined) {
      return;
    }
    // 장소 검색 객체를 생성
    const ps = new kakao.maps.services.Places();

    // 키워드 검색을 요청하는 함수
    const searchPlaces = () => {
      const keyword = curKeyword;
      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        console.log('키워드를 입력해주세요!');
        return false;
      }

      const selectedPlacesSetter = (data: any[]) => {
        return data.map((place) => {
          return {
            id: place.id,
            latitude: place.y,
            longitude: place.x,
            name: place.place_name,
            addressName: place.address_name,
            roadAddressName: place.road_address_name,
            category: place.category_group_code,
            phoneNumber: place.phone
          } as IPlaceForm;
        });
      };

      const searchPlaceCallback = async (data: any, status: any, pagination: any) => {
        if (status === kakao.maps.services.Status.OK) {
          if (pagination.current > pagination.last) {
            return;
          }
          await setSearchedPlaces((selectedPlaces) => [
            ...selectedPlaces,
            ...selectedPlacesSetter(data)
          ]);
          await setKakaoDataArray((kakaoDataArray: any) => [...kakaoDataArray, ...data]);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          console.log('검색 결과가 존재하지 않습니다.');
          await console.log(pagination);
          return;
        } else if (status === kakao.maps.services.Status.ERROR) {
          console.log('검색 결과 중 오류가 발생했습니다.');
          return;
        }
      };

      // 장소검색 객체를 통해 키워드로 장소검색을 요청
      // 15개씩 3개의 페이지 data 요청
      setSearchedPlaces([]);
      const syncSearch = async () => {
        ps.keywordSearch(keyword, await searchPlaceCallback, { page: 1 });
        ps.keywordSearch(keyword, await searchPlaceCallback, { page: 2 });
        ps.keywordSearch(keyword, await searchPlaceCallback, { page: 3 });
      };
      syncSearch();
    };
    // 키워드로 장소를 검색합니다
    searchPlaces();
  }, [mapObject, curKeyword]);
  const hendleSearch = (curKeyword: string) => {
    setCurKeyword(curKeyword);
  };
  const placeMouseEnter = (e: any, place: any) => {
    if (curMarkerObject !== null) {
      curMarkerObject.setMap(null);
    }
    const markerImageSrc = markerImageSetter(place.category);
    const placePosition = new kakao.maps.LatLng(place.latitude, place.longitude);
    const imageSize = new kakao.maps.Size(36, 37);
    const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize);
    const selectedMarker = new kakao.maps.Marker({
      position: placePosition, // 마커의 위치
      image: markerImage
    });
    curMarkerObject = selectedMarker;
    const bound = new kakao.maps.LatLngBounds();
    bound.extend(placePosition);
    if (mapObject) {
      curMarkerObject.setMap(mapObject);
      mapObject.setBounds(bound);
    }
  };
  const markerImageSetter = (placeType: string) => {
    switch (placeType) {
      case 'MT1':
        return MARKER_IMAGE_URLS.shopping;
      case 'CS2':
        return MARKER_IMAGE_URLS.convenience;
      case 'PS3':
        return MARKER_IMAGE_URLS.kindergarden;
      case 'SC4':
        return MARKER_IMAGE_URLS.school;
      case 'AC5':
        return MARKER_IMAGE_URLS.academy;
      case 'PK6':
        return MARKER_IMAGE_URLS.parking;
      case 'OL7':
        return MARKER_IMAGE_URLS.gasStation;
      case 'SW8':
        return MARKER_IMAGE_URLS.subway;
      case 'BK9':
        return MARKER_IMAGE_URLS.bank;
      case 'CT1':
        return MARKER_IMAGE_URLS.culturalFacility;
      case 'AG2':
        return MARKER_IMAGE_URLS.agency;
      case 'PO3':
        return MARKER_IMAGE_URLS.publicInstitutions;
      case 'AT4':
        return MARKER_IMAGE_URLS.attractions;
      case 'AD5':
        return MARKER_IMAGE_URLS.accommodation;
      case 'FD6':
        return MARKER_IMAGE_URLS.restaurant;
      case 'CE7':
        return MARKER_IMAGE_URLS.cafe;
      case 'HP8':
        return MARKER_IMAGE_URLS.hospital;
      case 'PM9':
        return MARKER_IMAGE_URLS.pharmacy;
      default:
        return MARKER_IMAGE_URLS.defaultPlace;
    }
  };
  const addPlace = (place: IPlaceForm) => {
    const isExist = selectedPlaces.indexOf(place);
    if (isExist !== -1) {
      alert('이미 추가된 장소입니다!');
      return;
    }
    setSelectedPlaces((selectedPlace: any) => [...selectedPlace, place]);
  };
  return (
    <>
      <Script
        id="PlaceMap"
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`}
        onLoad={() => {
          kakao.maps.load(() => {
            isAlreadyLoaded = true;
            setLoaded(true);
          });
        }}
      />
      {loaded && (
        <SearchMapWrapper className="ddddd">
          <FlexGridWrapper>
            <MapWrapper>
              <Map // 로드뷰를 표시할 Container
                center={{
                  lat: 37.566826,
                  lng: 126.9786567
                }}
                style={{
                  width: '100%',
                  height: '100%'
                }}
                level={3}
                onCreate={setMapObject}
              />
            </MapWrapper>
            <SearchResult id="search-result">
              <p className="result-text">
                <span className="result-keyword">{curKeyword}</span>
                검색 결과
              </p>
              <SearchInputWrapper>
                <SearchInput onSearch={hendleSearch} placeholder="지역, 장소를 검색해보세요" />
              </SearchInputWrapper>
              <div className="scroll-wrapper">
                <ul id="places-list"></ul>
                <SearchArea>
                  {searchedPlaces.map((place, index) => {
                    return (
                      <li
                        key={index}
                        id={`place_${index}`}
                        onMouseEnter={(e) => placeMouseEnter(e, place)}
                      >
                        <SearchedPlace>
                          <div style={{ margin: '20px 0px 0px 20px' }}>
                            <Text size="lg">{place.name}</Text>
                            <PlusIcon onClick={() => addPlace(place)} />
                          </div>
                          <Text size="sm" color="gray" style={{ marginLeft: '20px' }}>
                            {/* {place.roadAddressName} */}
                            {place.addressName}
                          </Text>
                        </SearchedPlace>
                      </li>
                    );
                  })}
                </SearchArea>
              </div>
              <div id="pagination"></div>
            </SearchResult>
          </FlexGridWrapper>
        </SearchMapWrapper>
      )}
    </>
  );
};

export default SearchMap;

const SearchMapWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const SearchArea = styled.div`
  width: 100%;
  margin: 20px 20px 20px 20px;
  text-align: center;
`;

const SearchedPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  padding: 35px 0px 13px 0px;
  margin-bottom: 20px;
  gap: 20px;
  width: 90%;
  height: 60px;
  border: 1px solid #f3f4f4;
  border-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

const FlexGridWrapper = styled.div`
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;

  -between {
    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  --center {
    -webkit-box-pack: center;
    -moz-box-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  --start {
    -webkit-box-pack: start;
    -moz-box-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  --end {
    -webkit-box-pack: end;
    -moz-box-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  --align-center {
    -webkit-box-align: center;
    -moz-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  --nowrap {
    -webkit-box-lines: single;
    -moz-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
  }
  --wrap {
    -webkit-box-lines: multiple;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  --dir-column {
    -webkit-box-orient: vertical;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  .marker-title {
    display: block;
    max-width: 140px;
    font-weight: 700;
    font-size: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const SearchResult = styled.div`
  width: 50%;
  height: 100%;
  .result-text {
    padding: 0.75rem;
    font-size: 0.9375rem;
    background-color: #ecf4f7;
    .result-keyword {
      margin-right: 0.25rem;
      font-weight: 700;
      color: #0f6fff;
    }
  }
  .scroll-wrapper {
    height: calc(95vh - 145px);
    overflow-x: hidden;
    overflow-y: auto;
    /* background-color: #f3f3f3;
    box-shadow: inset 0px 7px 9px -6px rgba(0, 0, 0, 0.1); */
  }
  .places-list {
    .item {
      background-color: #fff;
      .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;
        position: relative;
        padding: 35px 0px 13px 0px;
        margin-bottom: 40px;
        gap: 20px;
        width: 100%;
        height: 45px;
        border: 1px solid #f3f4f4;
        border-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
        border-radius: 8px;
      }
    }
  }
  .pagination {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 47px;
    padding: 0.5rem;
    background-color: #ecf4f7;
    box-shadow: 0 -4px 9px -3px rgba(0, 0, 0, 0.1);
    a {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      font-weight: 200;
      font-size: 0.875rem;
      + a {
        margin-left: 0.5rem;
      }
      &.on {
        font-weight: 700;
        color: #0f6fff;
      }
    }
  }
`;

const SearchInputWrapper = styled.div`
  margin: 20px 20px 0px 20px;
`;
