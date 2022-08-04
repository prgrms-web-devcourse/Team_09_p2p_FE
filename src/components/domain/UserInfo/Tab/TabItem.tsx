import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Text } from '~/components/atom';
import theme from '~/styles/theme';

interface TabItemProps {
  title: string;
  children: ReactNode;
  value: string;
  active?: boolean;
  type?: 'tab' | 'radio';
  onClick?: () => void;
}
const TabItem = ({ title, active, type, onClick, ...props }: TabItemProps) => {
  return (
    <TabItemWrapper active={active} type={type} onClick={onClick} {...props}>
      <Text color={active ? 'main' : 'dark'} size="lg" fontWeight={active ? 700 : 500}>
        {type === 'radio' && '· '}
        {title}
      </Text>
    </TabItemWrapper>
  );
};

export default TabItem;

const { mainColor } = theme.color;

const TabItemWrapper = styled.div<{ active?: boolean; type?: 'tab' | 'radio' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0 18px;
  ${({ active, type }) => type === 'tab' && active && `border-bottom: 2px solid ${mainColor} `};
  margin-right: 28px;
  cursor: pointer;
`;
