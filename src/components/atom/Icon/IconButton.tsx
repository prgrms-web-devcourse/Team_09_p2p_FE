import { MouseEvent } from 'react';
import Icon, { IconProps } from '.';

interface IconButtonProps extends IconProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = ({ name, size, rotate, block, onClick, ...props }: IconButtonProps) => {
  return (
    <button onClick={onClick} {...props}>
      <Icon name={name} size={size} rotate={rotate} block={block}></Icon>
    </button>
  );
};

export default IconButton;
