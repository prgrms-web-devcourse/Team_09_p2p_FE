import styled from '@emotion/styled';
import React, { ReactElement, ReactNode, useMemo, useState } from 'react';
import TabItem from './TabItem';

interface TabProps {
  children: ReactNode;
  onActive: (value: string) => void;
  active?: string;
}

const Tab = ({ children, active, onActive, ...props }: TabProps) => {
  const childrenArray = React.Children.toArray(children);

  const [currentActive, setCurrentActive] = useState(active);

  const items = useMemo(() => {
    return childrenArray.map((element) => {
      if (React.isValidElement(element)) {
        return React.cloneElement(element as ReactElement, {
          ...element.props,
          key: element.props.value,
          active: element.props.value === currentActive,
          onClick: () => {
            onActive(element.props.value);
            setCurrentActive(element.props.value);
          }
        });
      }
    });
  }, [childrenArray, currentActive, onActive]);

  const activeItem = useMemo(() => {
    return items.find((element) => currentActive === element?.props.value);
  }, [currentActive, items]);

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
