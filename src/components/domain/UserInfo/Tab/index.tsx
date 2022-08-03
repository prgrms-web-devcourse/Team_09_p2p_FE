import styled from '@emotion/styled';
import React, { ReactElement, ReactNode, useMemo, useState } from 'react';
import TabItem from './TabItem';

interface TabProps {
  children: ReactNode;
  onActive: (index?: number) => void;
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
          key: element.props.index,
          active: element.props.index === currentActive,
          onClick: () => {
            onActive(element.props.index);
            setCurrentActive(element.props.index);
          }
        });
      }
    });
  }, [childrenArray, currentActive, onActive]);

  const activeItem = useMemo(() => {
    return items.find((element) => currentActive === element?.props.index);
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
