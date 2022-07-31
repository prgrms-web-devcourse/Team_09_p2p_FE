import React from 'react';
import { Text } from '~/components/atom';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Text color="tomato" size="xs">
      {message}
    </Text>
  );
};

export default ErrorMessage;
