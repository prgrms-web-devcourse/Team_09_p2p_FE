import styled from '@emotion/styled';
import React, { useState } from 'react';
import theme from '~/styles/theme';
import { REGIONS } from '~/utils/constants';
import RegionItem from './RegionItem';

interface SelectRegionProps {
  col?: number;
  onSelect: (text: string) => void;
}

const regions = ['전체보기', ...REGIONS];

const SelectRegion = ({ onSelect, col = 9 }: SelectRegionProps) => {
  const [selectedValue, setSelectedValue] = useState(regions[0]);
  const handleSelect = (text: string) => {
    setSelectedValue(text);
    onSelect && onSelect(text);
  };

  return (
    <GridContainer col={col}>
      {regions.map((region) => (
        <RegionItem
          key={region}
          text={region}
          onClick={handleSelect}
          selectedValue={selectedValue}
        />
      ))}
    </GridContainer>
  );
};

export default React.memo(SelectRegion);

const GridContainer = styled.ul<{ col: number }>`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: ${({ col }) => `repeat(${col}, 1fr)`};
  border-top: 1px solid ${theme.color.borderDarkGray};
  border-left: 1px solid ${theme.color.borderDarkGray};
  color: ${theme.color.fontDarkBlack};
`;
