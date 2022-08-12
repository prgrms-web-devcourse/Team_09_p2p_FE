import styled from '@emotion/styled';
import React, { FormEvent, useState } from 'react';
import { Icon } from '~/components/atom';
import theme from '~/styles/theme';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (keyword: string) => void;
}

const SearchInput = ({ onSearch, placeholder = '검색어를 입력해주세요.' }: SearchInputProps) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const trimKeyword = keyword.trim();
    if (!trimKeyword) return;
    await onSearch(trimKeyword);
    setKeyword('');
  };

  return (
    <StyledForm onSubmit={handleSearch}>
      <Wrapper>
        <Icon size={18} name="search" />
        <StyledInput
          name="search-input"
          placeholder={placeholder}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoComplete="off"
        />
      </Wrapper>
    </StyledForm>
  );
};

export default SearchInput;

const StyledForm = styled.form`
  width: 100%;
  height: 55px;
  display: flex;
`;

const Wrapper = styled.div`
  background-color: ${theme.color.backgroundGray};
  border-radius: 4px;
  padding: 23px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  i {
    margin-top: 4px;
  }
`;

const StyledInput = styled.input`
  background-color: inherit;
  color: ${theme.color.fontDarkGray};
  width: 100%;
  border: none;
  font-size: 18px;
  :focus {
    border: none;
    outline: none;
  }
`;
