import styled from '@emotion/styled';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { Button, Text } from '~/components/atom';
import { FONT_COLORS } from '~/utils/constants';
import theme from '~/styles/theme';
import CloseIcon from '~/components/domain/CourseCreate/SelectedArea/CloseIcon';
import Router from 'next/router';

interface RegionSelectProps {
  setRegion: Dispatch<SetStateAction<string>>;
  onClose?: () => void;
}
const RegionSelect = ({ setRegion, onClose }: RegionSelectProps) => {
  const firstRegionList = ['서울', '인천', '대전', '대구', '광주', '부산', '울산', '세종', '경기'];
  const secondRegionList = ['강원', '충북', '충남', '경북', '경남', '전북', '전남', '제주'];
  const [beforeRegion, setBeforeRegion] = useState<any>(null);
  const [isSeleted, setIsSeleted] = useState(false);
  const closeForm = () => {
    Router.back();
  };
  const regionSelectHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setIsSeleted(true);
    if (beforeRegion !== null) {
      beforeRegion.style.border = '1px solid white';
    }
    if (e.target instanceof HTMLButtonElement) {
      e.target.style.border = `2px solid ${theme.color.mainColor}`;
      e.target.style.borderRadius = '20px';
      setRegion(e.target.innerText);
      setBeforeRegion(e.target);
    }
  };
  const completeSelect = () => {
    if (onClose && isSeleted) {
      onClose();
    } else {
      alert('지역을 선택해주세요!');
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
        {firstRegionList.map((region, index) => {
          return (
            <RegionButton key={index} onClick={regionSelectHandler}>
              {region}
            </RegionButton>
          );
        })}
        <br />
        <br />
        {secondRegionList.map((region, index) => {
          return (
            <RegionButton key={index} onClick={regionSelectHandler}>
              {region}
            </RegionButton>
          );
        })}
      </FormBody>
      <Button onClick={completeSelect}>지역선택완료</Button>
    </SelectForm>
  );
};

export default RegionSelect;

const SelectForm = styled.div`
  width: 800px;
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
