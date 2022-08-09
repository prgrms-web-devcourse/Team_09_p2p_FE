import styled from '@emotion/styled';
import React, { CSSProperties, ReactNode } from 'react';
import { FontColors, FontSizes } from '~/types/font';
import { FONT_SIZES, FONT_COLORS } from '~/types/font';

import TextButton from './TextButton';
export interface TextProps {
  children: ReactNode;
  size?: FontSizes | number;
  block?: boolean;
  color?: FontColors;
  ellipsis?: boolean;
  paragraph?: boolean;
  fontWeight?: number;
  style?: CSSProperties;
}

const Text = ({
  children,
  size = 'sm',
  block,
  color,
  ellipsis,
  paragraph,
  fontWeight,
  style,
  ...props
}: TextProps) => {
  const Tag = paragraph ? 'p' : 'span';

  const fontStyle = {
    fontSize: size && (typeof size === 'number' ? size + 'px' : FONT_SIZES[size] + 'px'),
    color: color && (FONT_COLORS[color] || color),
    fontWeight: fontWeight && fontWeight,
    display: block ? 'block' : 'inline-block'
  };

  return (
    <Tag className={ellipsis ? 'ellipsis' : ''} style={{ ...fontStyle, ...style }} {...props}>
      {children}
    </Tag>
  );
};

Text.Button = TextButton;

export default Text;
