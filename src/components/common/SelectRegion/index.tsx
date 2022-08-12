import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import theme from '~/styles/theme';
import { RegionAndAll } from '~/types';
import { REGIONS } from '~/utils/constants';
import RegionItem from './RegionItem';

type InitializeValues = {
  initializeTrigger?: unknown;
  region: RegionAndAll;
};

interface SelectRegionProps {
  col?: number;
  onSelect: (region: RegionAndAll) => void;
  initializeValues?: InitializeValues;
}

const regions: RegionAndAll[] = ['전체보기', ...REGIONS];

const SelectRegion = ({ onSelect, col = 9, initializeValues }: SelectRegionProps) => {
  const initializeTriggerRef = useRef(initializeValues?.region);
  const [selectedValue, setSelectedValue] = useState(
    initializeValues ? initializeValues.region : '전체보기'
  );
  const handleSelect = (region: RegionAndAll) => {
    setSelectedValue(region);
    onSelect && onSelect(region);
  };

  useEffect(() => {
    if (initializeTriggerRef.current !== initializeValues?.region) {
      setSelectedValue('전체보기');
    }
  }, [initializeValues?.region]);

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
