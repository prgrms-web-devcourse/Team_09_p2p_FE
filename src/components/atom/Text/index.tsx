import styled from '@emotion/styled';
import React, { CSSProperties, ReactNode } from 'react';
import { FONT_SIZES, FONT_COLORS } from '~/utils/constants';

interface TextProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  block?: boolean;
  color?: string;
  ellipsis?: boolean;
  paragraph?: boolean;
  style?: CSSProperties;
}

let tag: 'span' | 'p' = 'span';

const Text: React.FC<TextProps> = ({
  children,
  size = 'sm',
  block,
  color,
  ellipsis,
  paragraph,
  ...props
}) => {
  tag = paragraph ? 'p' : 'span';

  return (
    <StyledText size={size} color={color} ellipsis={ellipsis} {...props}>
      {children}
    </StyledText>
  );
};

export default Text;

const StyledText = styled[tag]<Omit<TextProps, 'children'>>`
  font-size: ${({ size }) =>
    size && (typeof size === 'number' ? size + 'px' : FONT_SIZES[size] + 'px')};

  color: ${({ color }) => color && (FONT_COLORS[color] || color)};

  display: ${({ block }) => (block ? 'block' : 'inline-block')};

  ${({ ellipsis }) =>
    ellipsis &&
    `
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `};
`;
