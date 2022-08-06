import Icon, { IconProps } from '.';

interface IconButtonProps extends IconProps {
  onClick: () => void;
}

const IconButton = ({ name, size, rotate, block, onClick, ...props }: IconButtonProps) => {
  return (
    <button onClick={onClick}>
      <Icon name={name} size={size} rotate={rotate} block={block} {...props}></Icon>
    </button>
  );
};

export default IconButton;
