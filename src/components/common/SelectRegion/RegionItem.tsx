import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { Text } from '~/components/atom';
import theme from '~/styles/theme';
import { Region } from '~/types';

interface RegionItemProps {
  onClick?: (region: Region | '전체보기') => void;
  region: Region | '전체보기';
  selectedValue: Region | '전체보기';
}

const RegionItem = ({ onClick, region, selectedValue }: RegionItemProps) => {
  const isSelected = useMemo(() => selectedValue === region, [selectedValue, region]);
  const handleClick = () => {
    onClick && onClick(region);
  };

  return (
    <StyledRegion onClick={handleClick} isSelected={isSelected}>
      <Text size="md">{region}</Text>
    </StyledRegion>
  );
};

export default React.memo(RegionItem);

const StyledRegion = styled.li<{ isSelected: boolean }>`
  background-color: ${({ isSelected }) => isSelected && theme.color.mainColor};
  color: ${({ isSelected }) => isSelected && 'white'};
  border-right: 1px solid ${theme.color.borderDarkGray};
  border-bottom: 1px solid ${theme.color.borderDarkGray};
  padding: 9px;
  text-align: center;
  cursor: pointer;
  :hover {
    background-color: ${theme.color.mainColor};
    color: white;
  }
`;
