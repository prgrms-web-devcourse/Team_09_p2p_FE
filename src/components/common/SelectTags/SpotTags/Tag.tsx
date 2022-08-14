import styled from '@emotion/styled';
import { useMemo } from 'react';
import theme from '~/styles/theme';
import { Spot } from '~/types';
import { SpotTagsProps } from '.';

interface TagProps extends SpotTagsProps {
  spot: Spot;
}

const Tag = ({ selectedSpots, spot, onSelect }: TagProps) => {
  const isSelected = useMemo(() => {
    const isFind = selectedSpots.find((selectedSpot) => selectedSpot === spot);
    return isFind ? true : false;
  }, [selectedSpots, spot]);
  const handleSelect = () => {
    onSelect && onSelect(spot, isSelected);
  };
  return (
    <StyledTag key={spot} isSelected={isSelected} onClick={handleSelect}>
      {spot}
    </StyledTag>
  );
};

export default Tag;

const StyledTag = styled.li<{ isSelected: boolean }>`
  border: 1px solid
    ${({ isSelected }) => (isSelected ? theme.color.mainColor : theme.color.mainBackground)};
  border-radius: 20px;
  padding: 7px 15px;
  color: ${({ isSelected }) => (isSelected ? theme.color.mainColor : theme.color.fontDarkGray)};
  cursor: pointer;
  :hover {
    color: ${theme.color.mainColor};
  }
`;
