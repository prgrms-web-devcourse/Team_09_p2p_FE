import styled from '@emotion/styled';
import React, { CSSProperties, ReactNode } from 'react';
import { FontColors, FontSizes } from '~/types/font';
import { FONT_SIZES, FONT_COLORS } from '~/utils/constants';

interface TextProps {
  children: ReactNode;
  size?: FontSizes | number;
  block?: boolean;
  color?: FontColors;
  ellipsis?: boolean;
  paragraph?: boolean;
  fontWeight?: number;
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
  fontWeight,
  ...props
}) => {
  tag = paragraph ? 'p' : 'span';

  return (
    <StyledText
      size={size}
      color={color}
      ellipsis={ellipsis}
      fontWeight={fontWeight}
      block={block}
      {...props}
    >
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

  font-weight: ${({ fontWeight }) => fontWeight && fontWeight};
`;
