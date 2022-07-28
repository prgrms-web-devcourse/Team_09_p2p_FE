import { useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { placeIcon } from 'public/assets/index';
import Script from 'next/script';
import styled from '@emotion/styled';

type CenterType = { lat: number; lng: number };

interface PlaceMapProps {
  placeId: number;
  placeName: string;
  placeType: string;
  center: CenterType;
}
const PlaceMap: React.FC<PlaceMapProps> = ({ placeId, placeName, placeType, center }) => {
  const [loaded, setLoaded] = useState(false);
  let imageSrc = '/assets/place/';
  switch (placeType) {
    case 'MT1':
      imageSrc = placeIcon.shopping.src;
      break;
    case 'CS2':
      imageSrc = placeIcon.convenience.src;
      break;
    case 'PS3':
      imageSrc = placeIcon.kindergarden.src;
      break;
    case 'SC4':
      imageSrc = placeIcon.school.src;
      break;
    case 'AC5':
      imageSrc = placeIcon.academy.src;
      break;
    case 'PK6':
      imageSrc = placeIcon.parking.src;
      break;
    case 'OL7':
      imageSrc = placeIcon.gasStation.src;
      break;
    case 'SW8':
      imageSrc = placeIcon.subway.src;
      break;
    case 'BK9':
      imageSrc = placeIcon.bank.src;
      break;
    case 'CT1':
      imageSrc = placeIcon.culturalFacility.src;
      break;
    case 'AG2':
      imageSrc = placeIcon.agency.src;
      break;
    case 'PO3':
      imageSrc = placeIcon.publicInstitutions.src;
      break;
    case 'AT4':
      imageSrc = placeIcon.attractions.src;
      break;
    case 'AD5':
      imageSrc = placeIcon.accommodation.src;
      break;
    case 'FD6':
      imageSrc = placeIcon.restaurant.src;
      break;
    case 'CE7':
      imageSrc = placeIcon.cafe.src;
      break;
    case 'HP8':
      imageSrc = placeIcon.hospital.src;
      break;
    case 'PM9':
      imageSrc = placeIcon.pharmacy.src;
      break;
    default:
      imageSrc = placeIcon.defaultPlace.src;
      break;
  }
  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
        onLoad={() => {
          kakao.maps.load(() => {
            setLoaded(true);
          });
        }} // 동적으로 로드
      />
      {loaded && (
        <Map
          center={{
            // 지도 중심좌표
            lat: center.lat,
            lng: center.lng
          }}
          style={{
            // 지도 크기
            width: '100%',
            height: '500px'
          }}
          level={4} // 지도 확대 레벨
        >
          <MapMarker // 마커 생성
            position={{ lat: center.lat, lng: center.lng }}
            image={{
              src: imageSrc,
              size: {
                width: 64,
                height: 69
              }, // 마커이미지 크기
              options: {
                offset: {
                  x: 27,
                  y: 69
                } // 마커이미지 옵션, 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
              }
            }}
          />
          <CustomOverlayMap
            position={{ lat: center.lat, lng: center.lng }}
            xAnchor={0.46}
            yAnchor={1}
          >
            <MarkerWithCustomOverlayStyle>
              <a href={`https://map.kakao.com/link/map/${placeId}`}>
                <span>{placeName}</span>
              </a>
            </MarkerWithCustomOverlayStyle>
          </CustomOverlayMap>
        </Map>
      )}
    </>
  );
};

export default PlaceMap;

const MarkerWithCustomOverlayStyle = styled.div`
  position: relative;
  bottom: 85px;
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
    background: #509ffb;
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
