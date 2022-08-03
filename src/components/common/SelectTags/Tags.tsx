import styled from '@emotion/styled';
import React from 'react';
import { Text } from '~/components/atom';
import theme from '~/styles/theme';

interface TagsProps {
  tagName: string;
  tags: string[];
}

const Tags = ({ tagName, tags }: TagsProps) => {
  return (
    <List key={tagName}>
      <Text size="md" fontWeight={600} style={{ marginRight: '30px' }}>
        {tagName}
      </Text>
      {tags.map((tag) => (
        <Tag key={tag}>
          <Text size="md">{tag}</Text>
        </Tag>
      ))}
    </List>
  );
};

export default React.memo(Tags);

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Tag = styled.li`
  border: 1px solid ${theme.color.mainBackground};
  border-radius: 20px;
  padding: 6px 15px;
  color: ${theme.color.fontDarkGray};
  cursor: pointer;
  :hover {
    border: 1px solid ${theme.color.mainColor};
    color: ${theme.color.mainColor};
  }
`;
