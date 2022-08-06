import { useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import DaumPostCode from 'react-daum-postcode';
import Script from 'next/script';
import styled from '@emotion/styled';

type CenterType = { lat: number; lng: number };

const SearchAddress = () => {
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [zoneCode, setZoneCode] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [isDaumPost, setIsDaumPost] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [register, setRegister] = useState([]);

  const handleOpenPost = () => {
    setIsDaumPost(true);
  };

  // postcode
  const handleAddress = (data: any) => {
    let AllAddress = data.address;
    let extraAddress = '';
    const zoneCodes = data.zonecode;
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      AllAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setFullAddress(AllAddress);
    setZoneCode(zoneCodes);
  };
  /* const { isModalShow, isModalClose } = this.props;
  const { name, phone, address, isDaumPost, fullAddress, zoneCode, isRegister } = state; */
  // DaumPostCode style
  const width = 595;
  const height = 450;
  const modalStyle = {
    position: 'absolute',
    top: 0,
    left: '-178px',
    zIndex: '100',
    border: '1px solid #000000',
    overflow: 'hidden'
  };
  return (
    <div className="modalRow">
      <div className="modalCell cellTit">
        <div>
          <span>
            <b>*</b>주소
          </span>
        </div>
      </div>
      <div className="modalCell">
        <div className="cellFirst">
          <div className="zipCode">{zoneCode}</div>
          <button type="button" onClick={handleOpenPost}>
            <span>우편번호 찾기</span>
          </button>
        </div>
        {isDaumPost ? (
          <DaumPostCode
            onComplete={handleAddress}
            autoClose
            /* width={width} */
            /* height={height} */
            /* style={modalStyle} */
            /* isDaumPost={isDaumPost} */
          />
        ) : null}
        <div className="address">{fullAddress}</div>
        {/* <div className="addressBox">
          <input type="text" value={address} name="address" onChange={handleInput}/>
        </div> */}
      </div>
    </div>
  );
};

export default SearchAddress;
