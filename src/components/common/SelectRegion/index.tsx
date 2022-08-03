import styled from '@emotion/styled';
import React from 'react';
import theme from '~/styles/theme';
import { Region } from '~/types';
import { REGIONS } from '~/utils/constants';
import RegionItem from './RegionItem';

const regions: Region[] = [{ text: '전체보기' }, ...REGIONS];

interface SelectRegionProps {
  col?: number;
}

const SelectRegion = ({ col = 9 }: SelectRegionProps) => {
  return (
    <GridContainer col={col}>
      {regions.map((region) => (
        <RegionItem key={region.text} text={region.text} />
      ))}
    </GridContainer>
  );
};

export default SelectRegion;

const GridContainer = styled.ul<{ col: number }>`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: ${({ col }) => `repeat(${col}, 1fr)`};
  border-top: 1px solid ${theme.color.borderDarkGray};
  border-left: 1px solid ${theme.color.borderDarkGray};
`;
