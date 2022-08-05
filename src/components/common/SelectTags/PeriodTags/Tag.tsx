import styled from '@emotion/styled';
import { useMemo } from 'react';
import theme from '~/styles/theme';
import { Period } from '~/types';
import { PeriodTagsProps } from '.';

interface TagProps extends PeriodTagsProps {
  period: Period;
}

const Tag = ({ selectedPeriod, period, onSelect }: TagProps) => {
  const isSelected = useMemo(() => selectedPeriod === period, [period, selectedPeriod]);
  const handleSelect = () => {
    onSelect && onSelect(period);
  };
  return (
    <StyledTag key={period} isSelected={isSelected} onClick={handleSelect}>
      {period}
    </StyledTag>
  );
};

export default Tag;

const StyledTag = styled.li<{ isSelected: boolean }>`
  border: 1px solid
    ${({ isSelected }) => (isSelected ? theme.color.mainColor : theme.color.mainBackground)};
  border-radius: 20px;
  padding: 6px 15px;
  color: ${({ isSelected }) => (isSelected ? theme.color.mainColor : theme.color.fontDarkGray)};
  cursor: pointer;
  :hover {
    border: 1px solid ${theme.color.mainColor};
    color: ${theme.color.mainColor};
  }
`;
