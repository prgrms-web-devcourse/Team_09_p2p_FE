import styled from '@emotion/styled';
import React, { FormEvent, useState } from 'react';
import { Icon, Input } from '~/components/atom';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (keyword: string) => void;
}

const SearchInput = ({ onSearch, placeholder = '검색어를 입력해주세요.' }: SearchInputProps) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!keyword) return;
    await onSearch(keyword);
    setKeyword('');
  };

  return (
    <FormContainer onSubmit={handleSearch}>
      <Icon name="search" />
      <Input
        name="search-input"
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        autoComplete="off"
      />
    </FormContainer>
  );
};

export default SearchInput;

const FormContainer = styled.form`
  width: 356px;
  height: 55px;
  padding: 13px;
  display: flex;
`;
