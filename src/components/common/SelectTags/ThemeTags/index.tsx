import styled from '@emotion/styled';
import { Text } from '~/components/atom';
import { Theme } from '~/types';
import { TAGS_THEME } from '~/utils/constants';
import Tag from './Tag';

export interface ThemeTagsProps {
  selectedThemes: Theme[];
  onSelect: (theme: Theme, isSelected: boolean) => void;
}

const ThemeTags = ({ selectedThemes, onSelect }: ThemeTagsProps) => {
  return (
    <StyledTags>
      <TagName size="md" fontWeight={600}>
        테마
      </TagName>
      {TAGS_THEME.map((theme) => (
        <Tag key={theme} selectedThemes={selectedThemes} theme={theme} onSelect={onSelect} />
      ))}
    </StyledTags>
  );
};

export default ThemeTags;

const StyledTags = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TagName = styled(Text)`
  margin-right: 30px;
`;
