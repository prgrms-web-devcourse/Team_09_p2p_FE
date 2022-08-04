import styled from '@emotion/styled';
import React, { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { Button, Text } from '~/components/atom';
import { REGIONS, FONT_COLORS } from '~/utils/constants';
import { Region } from '~/types';
import theme from '~/styles/theme';
import CloseIcon from '~/components/domain/CourseCreate/SelectedArea/CloseIcon';
import Router from 'next/router';

interface RegionSelectProps {
  setRegion: Dispatch<SetStateAction<string>>;
  onClose?: () => void;
}
const RegionSelect = ({ setRegion, onClose }: RegionSelectProps) => {
  const [beforeRegion, setBeforeRegion] = useState<HTMLButtonElement | null>(null);
  const [isSeleted, setIsSeleted] = useState(false);
  const regions: Region[] = [...REGIONS];
  const closeForm = () => {
    Router.back();
  };
  const regionSelectHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setIsSeleted(true);
    if (beforeRegion !== null) {
      beforeRegion.style.border = '1px solid white';
      beforeRegion.style.color = FONT_COLORS.gray;
    }
    if (e.target instanceof HTMLButtonElement) {
      e.target.style.border = `2px solid ${theme.color.mainColor}`;
      e.target.style.borderRadius = '20px';
      e.target.style.color = theme.color.mainColor;
      setRegion(e.target.innerText);
      setBeforeRegion(e.target);
    }
  };
  const completeSelect = () => {
    if (onClose && isSeleted) {
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
          if (region.text === '강원') {
            return (
              <React.Fragment key={region.text}>
                <br />
                <br />
                <RegionButton key={region.text} onClick={regionSelectHandler}>
                  {region.text}
                </RegionButton>
              </React.Fragment>
            );
          }
          return (
            <RegionButton key={region.text} onClick={regionSelectHandler}>
              {region.text}
            </RegionButton>
          );
        })}
      </FormBody>
      <Button
        disabled={!isSeleted}
        buttonType="primary"
        size="lg"
        fontSize={24}
        onClick={completeSelect}
      >
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
  padding: 130px 0 60px 0;
`;

const FormBody = styled.div`
  padding-bottom: 60px;
`;

const RegionButton = styled.button`
  width: 50px;
  height: 30px;
  color: ${FONT_COLORS.gray};
  font-size: 16px;
`;
