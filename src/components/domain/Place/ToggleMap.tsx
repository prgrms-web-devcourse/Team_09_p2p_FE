import styled from '@emotion/styled';
import { useState } from 'react';
import { Button, Icon } from '~/components/atom';
import PlaceMap from '../Map/PlaceMap';

interface MapInfoProps {
  placeId: number;
  placeType: string;
  placeName: string;
  latitude: number;
  longitude: number;
}

const MapInfo = ({ placeId, placeType, placeName, latitude, longitude }: MapInfoProps) => {
  const [isOpenMap, setIsOpenMap] = useState(false);

  return (
    <>
      <MapButton width="140px" size="sm" onClick={() => setIsOpenMap(!isOpenMap)}>
        지도보기 {isOpenMap ? <Icon name="arrowDown" rotate={180} /> : <Icon name="arrowDown" />}
      </MapButton>
      {isOpenMap && (
        <PlaceMap
          placeId={placeId}
          placeType={placeType}
          placeName={placeName}
          center={{ lat: latitude, lng: longitude }}
        />
      )}
    </>
  );
};

export default MapInfo;

const MapButton = styled(Button)`
  margin-top: 4px;
`;
