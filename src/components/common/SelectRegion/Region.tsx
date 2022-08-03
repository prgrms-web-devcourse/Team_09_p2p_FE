import styled from '@emotion/styled';
import React from 'react';
import theme from '~/styles/theme';
import { Region } from './types';

const Region = ({ text }: Region) => {
  return <StyledRegion>{text}</StyledRegion>;
};

export default Region;

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
