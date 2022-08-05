import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { Text } from '~/components/atom';
import theme from '~/styles/theme';

interface RegionItemProps {
  onClick?: (text: string) => void;
  text: string;
  selectedValue: string;
}

const RegionItem = ({ onClick, text, selectedValue }: RegionItemProps) => {
  const isSelected = useMemo(() => selectedValue === text, [selectedValue, text]);
  const handleClick = () => {
    onClick && onClick(text);
  };

  return (
    <StyledRegion onClick={handleClick} isSelected={isSelected}>
      <Text size="md">{text}</Text>
    </StyledRegion>
  );
};

export default React.memo(RegionItem);

const StyledRegion = styled.li<{ isSelected: boolean }>`
  background-color: ${({ isSelected }) => isSelected && theme.color.mainColor};
  color: ${({ isSelected }) => isSelected && 'white'};
  border-right: 1px solid ${theme.color.borderDarkGray};
  border-bottom: 1px solid ${theme.color.borderDarkGray};
  padding: 9px;
  text-align: center;
  cursor: pointer;
  :hover {
    background-color: ${theme.color.mainColor};
    color: white;
  }
`;
