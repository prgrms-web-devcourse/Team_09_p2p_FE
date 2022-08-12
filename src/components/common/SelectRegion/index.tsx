import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import theme from '~/styles/theme';
import { RegionAndAll } from '~/types';
import { REGIONS } from '~/utils/constants';
import RegionItem from './RegionItem';

interface SelectRegionProps {
  col?: number;
  onSelect: (region: RegionAndAll) => void;
  defaultValues?: RegionAndAll;
  initializeTrigger?: unknown;
}

const regions: RegionAndAll[] = ['전체보기', ...REGIONS];

const SelectRegion = ({
  onSelect,
  col = 9,
  defaultValues,
  initializeTrigger
}: SelectRegionProps) => {
  const initializeTriggerRef = useRef(initializeTrigger);
  const [selectedValue, setSelectedValue] = useState(defaultValues || '전체보기');
  const handleSelect = (region: RegionAndAll) => {
    setSelectedValue(region);
    onSelect && onSelect(region);
  };

  useEffect(() => {
    if (initializeTriggerRef.current !== initializeTrigger) {
      setSelectedValue('전체보기');
    }
  }, [initializeTrigger]);

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
