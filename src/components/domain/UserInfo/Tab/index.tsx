import styled from '@emotion/styled';
import React, { ReactElement, ReactNode, useMemo } from 'react';
import type { UserInfoTab } from '../types';
import TabItem from './TabItem';

interface TabProps {
  children: ReactNode;
  onActive: (value: UserInfoTab) => void;
  active?: string;
  type?: 'tab' | 'radio';
}

const Tab = ({ children, active, onActive, type = 'tab', ...props }: TabProps) => {
  const childrenArray = React.Children.toArray(children);

  const items = useMemo(() => {
    return childrenArray.map((element) => {
      if (React.isValidElement(element)) {
        return React.cloneElement(element as ReactElement, {
          ...element.props,
          key: element.props.value,
          active: element.props.value === active,
          type: type,
          onClick: () => {
            onActive(element.props.value);
          }
        });
      }
    });
  }, [childrenArray, active, onActive, type]);

  const activeItem = useMemo(() => {
    return items.find((element) => active === element?.props.value);
  }, [active, items]);

  return (
    <div {...props}>
      <TabItemContainer type={type}>{items}</TabItemContainer>
      <TabItemContent>{activeItem?.props.children}</TabItemContent>
    </div>
  );
};

Tab.item = TabItem;

export default Tab;

const TabItemContainer = styled.div<Pick<TabProps, 'type'>>`
  display: flex;
  border-bottom: ${({ type }) => type === 'tab' && ' 1px solid #dfdfdf;'};
`;

const TabItemContent = styled.div`
  margin-top: 14px;
`;
