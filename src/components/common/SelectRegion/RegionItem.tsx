import styled from '@emotion/styled';
import React from 'react';
import { Text } from '~/components/atom';
import theme from '~/styles/theme';
import { Region } from '~/types';

const RegionItem = ({ text }: Region) => {
  return (
    <StyledRegion>
      <Text size="md">{text}</Text>
    </StyledRegion>
  );
};

export default RegionItem;

const StyledRegion = styled.li`
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
