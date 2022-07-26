import React, { useState, useEffect } from 'react';
import { Map, MapMarker, CustomOverlayMap, Polyline } from 'react-kakao-maps-sdk';
import Script from 'next/script';
import styled from '@emotion/styled';
import { IPlace } from '~/types/place';
import { MARKER_IMAGE_URLS } from 'src/utils/constants/images';

interface CourseType {
  kakaoMapId: number;
  latitude: string;
  longitude: string;
  name: string;
}

interface PolyLineCourse {
  placeId: number;
  lat: number;
  lng: number;
  placeName: string;
}
interface CourseMapProps {
  course: CourseType[] | IPlace[];
}
let isAlreadyLoaded = false;
const CourseMap = ({ course }: CourseMapProps) => {
  const [mapState, setMapState] = useState<kakao.maps.Map>();
  const [loaded, setLoaded] = useState(isAlreadyLoaded);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, []);
  useEffect(() => {
    if (loaded) {
      const bounds = new kakao.maps.LatLngBounds();

      course.forEach((place) => {
        bounds.extend(new kakao.maps.LatLng(Number(place.latitude), Number(place.longitude)));
      });
      const map = mapState;
      if (map) {
        map.setBounds(bounds, 120, 0, 30, 0);
      }
    }
  }, [mapState]);
  const polyLineCourse = course.map((place) => {
    return {
      placeId: place.kakaoMapId,
      lat: Number(place.latitude),
      lng: Number(place.longitude),
      placeName: place.name
    } as PolyLineCourse;
  });
  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`}
        onLoad={() => {
          kakao.maps.load(() => {
            isAlreadyLoaded = true;
            setLoaded(true);
          });
        }}
      />
      {loaded && (
        <Map
          center={{
            lat: 0,
            lng: 0
          }}
          style={{
            width: '100%',
            height: '500px'
          }}
          onCreate={setMapState}
        >
          {course.map((place, index) => (
            <React.Fragment key={index}>
              <MapMarker
                position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
                image={{
                  src: MARKER_IMAGE_URLS.placeNumberSprite,
                  size: {
                    width: 48,
                    height: 48
                  },
                  options: {
                    spriteSize: {
                      width: 48,
                      height: 720
                    },
                    spriteOrigin: {
                      x: 0,
                      y: index * 48 - 1
                    },
                    offset: {
                      x: 24,
                      y: 48
                    }
                  }
                }}
              />
              <CustomOverlayMap
                position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
                xAnchor={0}
                yAnchor={0.5}
                clickable={true}
              >
                {/* {index + 1} */}
                <MarkerWithCustomOverlayStyle>
                  <a
                    href={`https://place.map.kakao.com/${place.kakaoMapId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{place.name}</span>
                  </a>
                </MarkerWithCustomOverlayStyle>
              </CustomOverlayMap>
            </React.Fragment>
          ))}
          <Polyline
            path={polyLineCourse}
            strokeWeight={5}
            strokeColor={'#FF5F5F'}
            strokeOpacity={0.9}
            strokeStyle={'solid'}
          />
        </Map>
      )}
    </>
  );
};

export default CourseMap;

const MarkerWithCustomOverlayStyle = styled.div`
  right: 46%;
  bottom: 90px;
  position: relative;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;
  :nth-of-type(n) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
  }
  a {
    display: block;
    text-decoration: none;
    color: #000;
    text-align: center;
    border-radius: 6px;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    background: #509ffb
      url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right
      14px center;
  }
  span {
    display: block;
    text-align: center;
    background: #fff;
    margin-right: 35px;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: bold;
  }
  :after {
    content: '';
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: -12px;
    width: 22px;
    height: 12px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
  }
`;
