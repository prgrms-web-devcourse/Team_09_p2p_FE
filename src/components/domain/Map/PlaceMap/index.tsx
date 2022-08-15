import { useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { MARKER_IMAGE_URLS } from 'src/utils/constants';
import Script from 'next/script';
import styled from '@emotion/styled';

type CenterType = { lat: number; lng: number };

interface PlaceMapProps {
  placeId: number;
  placeName: string;
  placeType: string;
  center: CenterType;
  height?: number | string | null;
}
let isAlreadyLoaded = false;
const PlaceMap = ({ placeId, placeName, placeType, center, height = null }: PlaceMapProps) => {
  const [loaded, setLoaded] = useState(isAlreadyLoaded);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, []);
  let imageSrc = '/assets/place/';
  switch (placeType) {
    case 'MT1':
      imageSrc = MARKER_IMAGE_URLS.shopping;
      break;
    case 'CS2':
      imageSrc = MARKER_IMAGE_URLS.convenience;
      break;
    case 'PS3':
      imageSrc = MARKER_IMAGE_URLS.kindergarden;
      break;
    case 'SC4':
      imageSrc = MARKER_IMAGE_URLS.school;
      break;
    case 'AC5':
      imageSrc = MARKER_IMAGE_URLS.academy;
      break;
    case 'PK6':
      imageSrc = MARKER_IMAGE_URLS.parking;
      break;
    case 'OL7':
      imageSrc = MARKER_IMAGE_URLS.gasStation;
      break;
    case 'SW8':
      imageSrc = MARKER_IMAGE_URLS.subway;
      break;
    case 'BK9':
      imageSrc = MARKER_IMAGE_URLS.bank;
      break;
    case 'CT1':
      imageSrc = MARKER_IMAGE_URLS.culturalFacility;
      break;
    case 'AG2':
      imageSrc = MARKER_IMAGE_URLS.agency;
      break;
    case 'PO3':
      imageSrc = MARKER_IMAGE_URLS.publicInstitutions;
      break;
    case 'AT4':
      imageSrc = MARKER_IMAGE_URLS.attractions;
      break;
    case 'AD5':
      imageSrc = MARKER_IMAGE_URLS.accommodation;
      break;
    case 'FD6':
      imageSrc = MARKER_IMAGE_URLS.restaurant;
      break;
    case 'CE7':
      imageSrc = MARKER_IMAGE_URLS.cafe;
      break;
    case 'HP8':
      imageSrc = MARKER_IMAGE_URLS.hospital;
      break;
    case 'PM9':
      imageSrc = MARKER_IMAGE_URLS.pharmacy;
      break;
    default:
      imageSrc = MARKER_IMAGE_URLS.defaultPlace;
      break;
  }
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
        <Map
          center={{
            lat: center.lat,
            lng: center.lng
          }}
          style={{
            width: '100%',
            height: height === null ? '500px' : height
          }}
          level={4}
        >
          <MapMarker
            position={{ lat: center.lat, lng: center.lng }}
            image={{
              src: imageSrc,
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
          />
          <CustomOverlayMap
            position={{ lat: center.lat, lng: center.lng }}
            xAnchor={0.46}
            yAnchor={1}
          >
            <MarkerWithCustomOverlayStyle>
              <a
                href={`https://map.kakao.com/link/map/${placeId}`}
                target="_blank"
                rel="noreferrer"
              >
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
