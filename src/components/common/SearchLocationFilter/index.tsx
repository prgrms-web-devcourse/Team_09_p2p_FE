import styled from '@emotion/styled';
import React from 'react';
import theme from '~/styles/theme';
import Item from './Item';
import { Location } from './types';

const locations: Location[] = [
  { text: '전체보기' },
  { text: '서울' },
  { text: '인천' },
  { text: '대구' },
  { text: '대전' },
  { text: '광주' },
  { text: '부산' },
  { text: '울산' },
  { text: '경기' },
  { text: '세종' },
  { text: '강원' },
  { text: '충북' },
  { text: '충남' },
  { text: '경북' },
  { text: '경남' },
  { text: '전북' },
  { text: '전남' },
  { text: '제주' }
];

interface LocationFilterProps {
  col?: number;
}

const LocationFilter = ({ col = 9 }: LocationFilterProps) => {
  return (
    <Grid col={col}>
      {locations.map((location) => (
        <Item key={location.text} text={location.text} />
      ))}
    </Grid>
  );
};

export default LocationFilter;

const Grid = styled.ul<{ col: number }>`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: ${({ col }) => `repeat(${col}, 1fr)`};
  border-top: 1px solid ${theme.color.borderDarkGray};
  border-left: 1px solid ${theme.color.borderDarkGray};
`;
