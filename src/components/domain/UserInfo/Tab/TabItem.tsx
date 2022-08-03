import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Text } from '~/components/atom';
import theme from '~/styles/theme';

interface TabItemProps {
  title: string;
  children: ReactNode;
  index: string | number;
  active?: boolean;
  onClick?: () => void;
}
const TabItem = ({ title, active, onClick, ...props }: TabItemProps) => {
  return (
    <TabItemWrapper active={active} onClick={onClick} {...props}>
      <Text color={active ? 'main' : 'dark'} size="lg" fontWeight={active ? 700 : 500}>
        {title}
      </Text>
    </TabItemWrapper>
  );
};

export default TabItem;

const { mainColor } = theme.color;

const TabItemWrapper = styled.div<Pick<TabItemProps, 'active'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  ${({ active }) => active && `border-bottom: 2px solid ${mainColor} `};
  margin-right: 28px;
  cursor: pointer;
`;
