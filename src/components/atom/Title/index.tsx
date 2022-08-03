import styled from '@emotion/styled';
import { CSSProperties, ReactNode } from 'react';
import { FontColors, TitleSizes } from '~/types/font';
import { TITLE_SIZES, FONT_COLORS } from '~/utils/constants';

interface TitleProps {
  size?: TitleSizes | number;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  fontWeight?: number;
  color?: FontColors;
  block?: boolean;
  ellipsis?: boolean;
  style?: CSSProperties;
  children: ReactNode;
}

type tagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

let tag: tagType = 'h2'; // default

const Title: React.FC<TitleProps> = ({
  size = 'sm',
  level = 2,
  fontWeight = 700,
  color,
  block,
  ellipsis,
  children,
  ...props
}) => {
  tag = level ? (`h${level}` as tagType) : tag;

  return (
    <Styled
      size={size}
      fontWeight={fontWeight}
      block={block}
      color={color}
      ellipsis={ellipsis}
      {...props}
    >
      {children}
    </Styled>
  );
};

export default Title;

const Styled = styled[tag]<Omit<TitleProps, 'children'>>`
  line-height: 1.5;
  font-size: ${({ size }) =>
    size && (typeof size === 'number' ? size + 'px' : TITLE_SIZES[size] + 'px')};
  font-weight: ${({ fontWeight }) => fontWeight && fontWeight};
  display: ${({ block }) => (block ? 'block' : 'inline-block')};

  color: ${({ color }) => color && (FONT_COLORS[color] || color)};

  ${({ ellipsis }) =>
    ellipsis &&
    `
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;
