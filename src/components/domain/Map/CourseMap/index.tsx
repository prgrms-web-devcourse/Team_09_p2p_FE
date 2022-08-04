import { useState, useEffect } from 'react';
import { Map, MapMarker, CustomOverlayMap, Polyline } from 'react-kakao-maps-sdk';
import markerIcon from 'public/assets/place/course.png';
import Script from 'next/script';
import styled from '@emotion/styled';

type CourseType = { placeId: number; lat: number; lng: number; placeName: string };

interface CourseMapProps {
  course: CourseType[];
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
        bounds.extend(new kakao.maps.LatLng(place.lat, place.lng));
      });
      const map = mapState;
      if (map) {
        map.setBounds(bounds, 120, 0, 30, 0);
      }
    }
  }, [mapState]);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
        onLoad={() => {
          kakao.maps.load(() => {
            isAlreadyLoaded = true;
            setLoaded(true);
          });
        }} // 동적으로 로드
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
            <>
              <MapMarker
                position={{ lat: place.lat, lng: place.lng }}
                image={{
                  src: markerIcon.src,
                  size: {
                    width: 64,
                    height: 69
                  },
                  options: {
                    offset: {
                      x: 27,
                      y: 69
                    }
                  }
                }}
              ></MapMarker>
              <CustomOverlayMap
                position={{ lat: place.lat, lng: place.lng }}
                xAnchor={0}
                yAnchor={1.1}
                clickable={true}
              >
                <span>{index + 1}</span>
                <MarkerWithCustomOverlayStyle>
                  <a
                    href={`https://map.kakao.com/link/map/${place.placeId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{place.placeName}</span>
                  </a>
                </MarkerWithCustomOverlayStyle>
              </CustomOverlayMap>
            </>
          ))}
          <Polyline
            path={course}
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
  bottom: 80px;
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
