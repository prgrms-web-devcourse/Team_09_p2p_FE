import styled from '@emotion/styled';
import { useState } from 'react';
import { Text } from '~/components/atom';

interface SortFilterProps {
  onSort?: (value: string) => void; // TODO: 더미데이터 테스트 시점에 필수로 변경
}

// TODO: 정렬시 보내는 데이터와 맞게 수정 예정
const CREATED_AT = 'createdAt';
const POPULAR = 'popular';

const defaultSortData = [
  { name: '최신순', value: CREATED_AT },
  { name: '인기순', value: POPULAR }
];

const SortFilter: React.FC<SortFilterProps> = ({ onSort }) => {
  const [isSelected, setIsSelected] = useState(CREATED_AT);

  const handleClick = (value: string) => {
    setIsSelected(value);
    onSort && onSort(value);
  };

  return (
    <StyledSortFilter>
      {defaultSortData.map(({ value, name }) => (
        <li key={value} onClick={() => handleClick(value)}>
          <Text fontWeight={isSelected === value ? 600 : 400}>{name}</Text>
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