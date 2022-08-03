import Text, { TextProps } from '.';

interface TextButtonProps extends TextProps {
  onClick: () => void;
}

const TextButton = ({
  children,
  size = 'sm',
  block,
  color,
  ellipsis,
  paragraph,
  fontWeight,
  onClick,
  ...props
}: TextButtonProps) => {
  return (
    <button onClick={onClick}>
      <Text
        size={size}
        block={block}
        color={color}
        ellipsis={ellipsis}
        paragraph={paragraph}
        fontWeight={fontWeight}
        {...props}
      >
        {children}
      </Text>
    </button>
  );
};

export default TextButton;
