import styled from '@emotion/styled';
import React, { ChangeEvent, useState } from 'react';
import { Icon, Input } from '~/components/atom';

interface SearchInputProps {
  placeholder?: string;
}

const SearchInput = ({ placeholder = '검색어를 입력해주세요.' }: SearchInputProps) => {
  const [keyword, setKeyword] = useState('');

  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <Container>
      <Icon name="search" />
      <StyledSearchInput placeholder={placeholder} />
    </Container>
  );
};

export default SearchInput;

const Container = styled.div`
  width: 356px;
  height: 55px;
  padding: 13px;
  display: flex;
`;

const StyledSearchInput = styled.input`
  width: 100%;
`;
