import styled from '@emotion/styled';
import React, { CSSProperties, useMemo } from 'react';
import theme from '~/styles/theme';
import { TAGS } from '~/utils/constants';
import Tags from './Tags';

interface SelectTagsProps {
  style?: CSSProperties;
}

const SelectTags = ({ ...props }: SelectTagsProps) => {
  const tagsIterator = useMemo(() => Object.entries(TAGS), []);

  return (
    <Container {...props}>
      {tagsIterator.map(([tagName, tags]) => (
        <Tags key={tagName} tagName={tagName} tags={tags} />
      ))}
    </Container>
  );
};

export default React.memo(SelectTags);

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
