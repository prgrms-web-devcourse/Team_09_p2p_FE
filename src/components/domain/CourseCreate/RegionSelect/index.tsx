import styled from '@emotion/styled';
import React, { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { Button, Text } from '~/components/atom';
import { REGIONS } from '~/utils/constants';
import { Region } from '~/types';
import theme from '~/styles/theme';
import CloseIcon from '~/components/domain/CourseCreate/SelectedArea/CloseIcon';
import Router from 'next/router';
import { IPlaceForm } from '~/types/place';

interface RegionSelectProps {
  setRegion: Dispatch<SetStateAction<string>>;
  onClose?: () => void;
  isModify?: boolean;
  loadedRegion?: string;
  setSelectedPlaces: Dispatch<SetStateAction<IPlaceForm[]>>;
}
const RegionSelect = ({
  setRegion,
  onClose,
  isModify,
  loadedRegion,
  setSelectedPlaces
}: RegionSelectProps) => {
  const [beforeRegion, setBeforeRegion] = useState<HTMLButtonElement | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const regions: Region[] = [...REGIONS];

  const closeForm = () => {
    Router.back();
  };
  const regionSelectHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setIsSelected(true);
    if (beforeRegion !== null) {
      beforeRegion.classList.remove('select');
    }
    if (e.target instanceof HTMLButtonElement) {
      e.target.classList.add('select');
      setRegion(e.target.innerText);
      setBeforeRegion(e.target);
      setSelectedRegion(e.target.innerText);
    }
  };
  const completeSelect = () => {
    if (isModify && loadedRegion !== selectedRegion) {
      if (
        window.confirm(
          `이전 선택 지역 : ${loadedRegion}
          
이전에 선택한 지역과 다를 경우 장소 목록이 초기화됩니다.
장소 목록을 초기화 하시겠습니까?`
        )
      ) {
        setSelectedPlaces([]);
      } else {
        return;
      }
    }
    if (onClose && isSelected) {
      onClose();
    }
  };
  return (
    <SelectForm>
      <CloseIcon onClick={closeForm} />
      <FormHeader>
        <Text size={'xl'} fontWeight={700}>
          등록하시려는 코스의 지역을 선택해주세요.
        </Text>
      </FormHeader>
      <FormBody>
        {regions.map((region) => {
          return (
            <RegionButton key={region} onClick={regionSelectHandler}>
              {region}
            </RegionButton>
          );
        })}
      </FormBody>
      <Button disabled={!isSelected} buttonType="primary" size="lg" onClick={completeSelect}>
        지역선택완료
      </Button>
    </SelectForm>
  );
};

export default RegionSelect;

const SelectForm = styled.div`
  width: 1000px;
  height: 500px;
  text-align: center;
`;

const FormHeader = styled.div`
  padding: 130px 0 46px 0;
`;

const FormBody = styled.div`
  width: 650px;
  padding-bottom: 60px;
  margin: 0 auto;
`;

const RegionButton = styled.button`
  padding: 5px 15px;
  color: ${theme.color.fontGray};
  font-size: 18px;
  margin-bottom: 10px;
  border: 2px solid white;
  border-radius: 20px;

  &:hover {
    color: ${theme.color.mainColor};
  }
  &.select {
    border: 2px solid ${theme.color.mainColor};
    color: ${theme.color.mainColor};
  }
`;
