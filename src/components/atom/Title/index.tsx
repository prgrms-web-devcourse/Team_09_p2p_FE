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

const Title: React.FC<TitleProps> = ({
  size = 'sm',
  level = 2,
  fontWeight = 700,
  color,
  block,
  ellipsis,
  children,
  style,
  ...props
}) => {
  const Tag: tagType = `h${level}`;

  const fontStyle = {
    fontSize: size && (typeof size === 'number' ? size + 'px' : TITLE_SIZES[size] + 'px'),
    fontWeight: fontWeight && fontWeight,
    display: block || ellipsis ? 'block' : 'inline-block',
    color: color && (FONT_COLORS[color] || color),
    lineHeight: 1.5
  };

  return (
    <Tag className={ellipsis ? 'ellipsis' : ''} style={{ ...fontStyle, ...style }} {...props}>
      {children}
    </Tag>
  );
};

export default Title;
