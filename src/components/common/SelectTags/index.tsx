import styled from '@emotion/styled';
import React, { CSSProperties } from 'react';
import theme from '~/styles/theme';
import { TAGS } from '~/utils/constants';
import Tags from './Tags';

interface SelectTagsProps {
  style?: CSSProperties;
}

const SelectTags = ({ ...props }: SelectTagsProps) => {
  return (
    <Container {...props}>
      {Object.entries(TAGS).map(([tagName, tags]) => (
        <Tags key={tagName} tagName={tagName} tags={tags} />
      ))}
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
`;
