import React from 'react';
import { Text } from '~/components/atom';
import { TextProps } from '~/components/atom/Text';

interface FieldMessageProps extends Pick<TextProps, 'color'> {
  message: string;
}

const FieldMessage = ({ message, color }: FieldMessageProps) => {
  return (
    <Text color={color} size="xs">
      {message}
    </Text>
  );
};

export default React.memo(FieldMessage);
