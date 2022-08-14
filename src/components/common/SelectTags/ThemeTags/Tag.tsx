import styled from '@emotion/styled';
import { useMemo } from 'react';
import theme from '~/styles/theme';
import { Theme } from '~/types';
import { ThemeTagsProps } from '.';

interface TagProps extends ThemeTagsProps {
  theme: Theme;
}

const Tag = ({ selectedThemes, theme, onSelect }: TagProps) => {
  const isSelected = useMemo(() => {
    const isFind = selectedThemes.find((selectedTheme) => selectedTheme === theme);
    return isFind ? true : false;
  }, [selectedThemes, theme]);
  const handleSelect = () => {
    onSelect && onSelect(theme, isSelected);
  };
  return (
    <StyledTag key={theme} isSelected={isSelected} onClick={handleSelect}>
      {theme}
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
