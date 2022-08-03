import styled from '@emotion/styled';
import React, { ReactElement, ReactNode, useMemo } from 'react';
import TabItem from './TabItem';

interface TabProps {
  children: ReactNode;
  onActive: (value: string) => void;
  active?: string;
}

const Tab = ({ children, active, onActive, ...props }: TabProps) => {
  const childrenArray = React.Children.toArray(children);

  const items = useMemo(() => {
    return childrenArray.map((element) => {
      if (React.isValidElement(element)) {
        return React.cloneElement(element as ReactElement, {
          ...element.props,
          key: element.props.value,
          active: element.props.value === active,
          onClick: () => {
            onActive(element.props.value);
          }
        });
      }
    });
  }, [childrenArray, active, onActive]);

  const activeItem = useMemo(() => {
    return items.find((element) => active === element?.props.value);
  }, [active, items]);

  return (
    <div {...props}>
      <TabItemContainer>{items}</TabItemContainer>
      <TabItemContent>{activeItem?.props.children}</TabItemContent>
    </div>
  );
};

Tab.item = TabItem;

export default Tab;

const TabItemContainer = styled.div`
  display: flex;
`;

const TabItemContent = styled.div`
  margin-top: 14px;
`;
