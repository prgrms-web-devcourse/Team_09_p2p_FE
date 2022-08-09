import styled from '@emotion/styled';
import { useState } from 'react';
import { Text } from '~/components/atom';
import { sortOrder, SortType } from '~/types/course';

interface SortFilterProps {
  onSort?: (value: SortType) => void; // TODO: 더미데이터 테스트 시점에 필수로 변경
  initialValue?: SortType;
}

const defaultSortData = [{ value: sortOrder.DESC }, { value: sortOrder.POPULAR }];

const SortFilter: React.FC<SortFilterProps> = ({ onSort, initialValue }) => {
  const [isSelected, setIsSelected] = useState<SortType>(initialValue || sortOrder.DESC);

  const handleClick = (value: SortType) => {
    setIsSelected(value);
    onSort && onSort(value);
  };

  return (
    <StyledSortFilter>
      {defaultSortData.map(({ value }) => (
        <li key={value} onClick={() => handleClick(value)}>
          <Text fontWeight={isSelected === value ? 600 : 400}>{value}</Text>
        </li>
      ))}
    </StyledSortFilter>
  );
};

export default SortFilter;

const StyledSortFilter = styled.ul`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;

  li {
    cursor: pointer;

    &:not(:first-of-type) span::before {
      content: '';
      display: block;
      width: 1px;
      height: 14px;
      float: left;
      background-color: rgba(125, 127, 133, 0.2);
      margin: 0 10px;
      margin-top: 2px;
    }
  }
`;
