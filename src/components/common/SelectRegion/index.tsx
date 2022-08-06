import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import theme from '~/styles/theme';
import { RegionAndAll } from '~/types';
import { REGIONS } from '~/utils/constants';
import RegionItem from './RegionItem';

interface SelectRegionProps {
  col?: number;
  onSelect: (region: RegionAndAll) => void;
  toInitializeTrigger?: string | number | boolean | null | undefined;
}

const regions: RegionAndAll[] = ['전체보기', ...REGIONS];

const SelectRegion = ({ onSelect, col = 9, toInitializeTrigger }: SelectRegionProps) => {
  const [selectedValue, setSelectedValue] = useState(regions[0]);
  const initialize = () => setSelectedValue(regions[0]);
  const handleSelect = (region: RegionAndAll) => {
    setSelectedValue(region);
    onSelect && onSelect(region);
  };

  useEffect(() => {
    initialize();
  }, [toInitializeTrigger]);

  return (
    <GridContainer col={col}>
      {regions.map((region) => (
        <RegionItem
          key={region}
          region={region}
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
