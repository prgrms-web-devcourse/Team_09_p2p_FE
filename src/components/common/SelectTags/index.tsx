import styled from '@emotion/styled';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import theme from '~/styles/theme';
import { Period, SearchTagsValues, Spot, Theme } from '~/types';
import { removeList, updateList } from '~/utils/converter';
import PeriodTags from './PeriodTags';
import SpotTags from './SpotTags';
import ThemeTags from './ThemeTags';

type InitialValues = SearchTagsValues & {
  initializeTrigger?: unknown;
};

interface SelectTagsProps {
  style?: CSSProperties;
  onSelect: (data: SearchTagsValues) => void;
  initialValues?: InitialValues;
}

const SelectTags = ({ style, onSelect, initialValues }: SelectTagsProps) => {
  const initializeTriggerRef = useRef(initialValues?.initializeTrigger);
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(
    initialValues ? initialValues.period : null
  );
  const [selectedThemes, setSelectedThemes] = useState<Theme[]>(
    initialValues ? [...initialValues.themes] : []
  );
  const [selectedSpots, setSelectedSpots] = useState<Spot[]>(
    initialValues ? [...initialValues.spots] : []
  );

  const handleSelectPeriod = (period: Period) => {
    const isSame = selectedPeriod === period;

    onSelect({
      period: isSame ? null : period,
      themes: [...selectedThemes],
      spots: [...selectedSpots]
    });

    isSame ? setSelectedPeriod(null) : setSelectedPeriod(period);
  };

  const handleSelectThemes = (theme: Theme, isSelected: boolean) => {
    onSelect({
      period: selectedPeriod,
      themes: isSelected ? removeList(selectedThemes, theme) : updateList(selectedThemes, theme),
      spots: [...selectedSpots]
    });

    isSelected
      ? setSelectedThemes(removeList(selectedThemes, theme))
      : setSelectedThemes(updateList(selectedThemes, theme));
  };

  const handleSelectSpots = (spot: Spot, isSelected: boolean) => {
    onSelect({
      period: selectedPeriod,
      themes: [...selectedThemes],
      spots: isSelected ? removeList(selectedSpots, spot) : updateList(selectedSpots, spot)
    });

    isSelected
      ? setSelectedSpots(removeList(selectedSpots, spot))
      : setSelectedSpots(updateList(selectedSpots, spot));
  };

  useEffect(() => {
    if (initializeTriggerRef.current !== initialValues?.initializeTrigger) {
      setSelectedPeriod(null);
      setSelectedThemes([]);
      setSelectedSpots([]);
    }
  }, [initialValues?.initializeTrigger]);

  return (
    <Container style={style}>
      <PeriodTags selectedPeriod={selectedPeriod} onSelect={handleSelectPeriod} />
      <ThemeTags selectedThemes={selectedThemes} onSelect={handleSelectThemes} />
      <SpotTags selectedSpots={selectedSpots} onSelect={handleSelectSpots} />
    </Container>
  );
};

export default SelectTags;

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${theme.color.mainBackground};
  border-radius: 8px;
  padding: 25px 45px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${theme.color.fontDarkBlack};
`;
