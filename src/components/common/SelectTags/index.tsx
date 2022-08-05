import styled from '@emotion/styled';
import React, { CSSProperties, useEffect, useState } from 'react';
import theme from '~/styles/theme';
import { Period, SearchTagsValues, Spot, Theme } from '~/types';
import PeriodTags from './PeriodTags';
import SpotTags from './SpotTags';
import ThemeTags from './ThemeTags';

interface SelectTagsProps {
  style?: CSSProperties;
  onSelect: (data: SearchTagsValues) => void;
}

const SelectTags = ({ style, onSelect }: SelectTagsProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
  const [selectedThemes, setSelectedThemes] = useState<Theme[]>([]);
  const [selectedSpots, setSelectedSpots] = useState<Spot[]>([]);

  useEffect(() => {
    onSelect({
      period: selectedPeriod,
      theme: selectedThemes,
      spot: selectedSpots
    });
  }, [selectedPeriod, selectedThemes, selectedSpots, onSelect]);

  const handleSelectPeriod = (period: Period) => {
    if (selectedPeriod === period) {
      setSelectedPeriod(() => null);
    } else {
      setSelectedPeriod(() => period);
    }
  };

  const handleSelectThemes = (theme: Theme, isSelected: boolean) => {
    if (!isSelected) {
      setSelectedThemes((prev) => [...prev, theme]);
    } else {
      setSelectedThemes((prev) => prev.filter((prevTheme) => prevTheme !== theme));
    }
  };

  const handleSelectSpots = (spot: Spot, isSelected: boolean) => {
    if (!isSelected) {
      setSelectedSpots((prev) => [...prev, spot]);
    } else {
      setSelectedSpots((prev) => prev.filter((prevSpot) => prevSpot !== spot));
    }
  };

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
