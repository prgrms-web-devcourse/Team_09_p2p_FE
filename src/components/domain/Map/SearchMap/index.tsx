import styled from '@emotion/styled';
import Script from 'next/script';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import { Text } from '~/components/atom';
import { SearchInput, Toast } from '~/components/common';
import PlusIcon from '~/components/domain/CourseCreate/SearchArea/PlusIcon';
import { MARKER_IMAGE_URLS, REGION_BOUNDARY } from 'src/utils/constants';
import { IPlaceForm } from '~/types/place';
import theme from '~/styles/theme';

interface SearchMap {
  setSelectedPlaces: Dispatch<SetStateAction<IPlaceForm[]>>;
  selectedPlaces: IPlaceForm[];
  selectedRegion: string;
}
interface PolyLineCourse {
  placeId: number;
  lat: number;
  lng: number;
  placeName: string;
}

let isAlreadyLoaded = false;
let curMarkerObject: kakao.maps.Marker | null = null;
const SearchMap = ({ setSelectedPlaces, selectedPlaces, selectedRegion }: SearchMap) => {
  const [loaded, setLoaded] = useState(isAlreadyLoaded);
  const [mapObject, setMapObject] = useState<kakao.maps.Map>();
  const [searchedPlaces, setSearchedPlaces] = useState<IPlaceForm[]>([]);
  const [curKeyword, setCurKeyword] = useState('');
  const [isSearched, setIsSearched] = useState(true);
  const [polyLineCourse, setPolyLineCourse] = useState<PolyLineCourse[]>();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, []);
  useEffect(() => {
    if (!isSearched) {
      Toast.show('장소 검색 결과가 없습니다!');
    }
  }, [isSearched]);
  useEffect(() => {
    if (loaded) {
      const drawPloyLine = selectedPlaces.map((place) => {
        return {
          placeId: place.id,
          lat: Number(place.latitude),
          lng: Number(place.longitude),
          placeName: place.name
        } as PolyLineCourse;
      });
      setPolyLineCourse(drawPloyLine);
      const bounds = new kakao.maps.LatLngBounds();
      selectedPlaces.forEach((place) => {
        bounds.extend(new kakao.maps.LatLng(Number(place.latitude), Number(place.longitude)));
      });
      const map = mapObject;
      if (map) {
        map.setBounds(bounds);
      }
    }
  }, [selectedPlaces]);
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
          setSearchedPlaces((selectedPlaces) => [...selectedPlaces, ...selectedPlacesSetter(data)]);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          console.log('검색 결과가 존재하지 않습니다.');
          setIsSearched(false);
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
        const sw = new kakao.maps.LatLng(
          REGION_BOUNDARY[selectedRegion].sw.lat,
          REGION_BOUNDARY[selectedRegion].sw.lng
        );
        const ne = new kakao.maps.LatLng(
          REGION_BOUNDARY[selectedRegion].ne.lat,
          REGION_BOUNDARY[selectedRegion].ne.lng
        );
        const bounds = new kakao.maps.LatLngBounds(sw, ne);
        ps.keywordSearch(keyword, searchPlaceCallback, { page: 1, bounds: bounds });
        ps.keywordSearch(keyword, searchPlaceCallback, { page: 2, bounds: bounds });
        ps.keywordSearch(keyword, searchPlaceCallback, { page: 3, bounds: bounds });
      };
      syncSearch();
      setIsSearched(true);
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
    const imageSize = new kakao.maps.Size(48, 48);
    const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize);
    const selectedMarker = new kakao.maps.Marker({
      position: placePosition,
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
      Toast.show('이미 추가된 장소입니다!');
      return;
    }
    if (curMarkerObject !== null) {
      curMarkerObject.setMap(null);
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
              <Map
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
              >
                {selectedPlaces.map((place, index) => (
                  <MapMarker
                    key={index}
                    position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
                    image={{
                      src: MARKER_IMAGE_URLS.defaultPlace,
                      size: {
                        width: 48,
                        height: 48
                      }
                    }}
                  />
                ))}
                {polyLineCourse ? (
                  <Polyline
                    path={polyLineCourse}
                    strokeWeight={5}
                    strokeColor={'#FF5F5F'}
                    strokeOpacity={0.9}
                    strokeStyle={'solid'}
                  />
                ) : null}
              </Map>
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
                          <SearchedHeader>
                            <PlaceName>{place.name}</PlaceName>
                            <PlusIcon onClick={() => addPlace(place)} />
                          </SearchedHeader>
                          <Text size="sm" color="gray" ellipsis>
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
  padding: 20px 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  width: 90%;
  text-align: left;
  border: 1px solid ${theme.color.borderGray};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 8px;

  &:hover {
    border-color: #c9c9c9;
  }
`;

const SearchedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 6px;
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
    padding-left: 20px;
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
