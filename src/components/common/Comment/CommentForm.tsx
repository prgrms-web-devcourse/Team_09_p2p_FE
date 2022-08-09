import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '~/components/atom';
import theme from '~/styles/theme';

interface CommentFormProps {
  onSubmit: (value: string) => void;
}

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <StyledCommentForm onSubmit={handleSubmit}>
      <CommentTextarea
        placeholder="댓글을 작성해 주세요."
        rows={2}
        onChange={handleChange}
        value={value}
      />
      <Button width={140} type="submit">
        등록
      </Button>
    </StyledCommentForm>
  );
};

export default CommentForm;

const { borderDarkGray, fontGray, fontDarkBlack } = theme.color;

const StyledCommentForm = styled.form`
  display: flex;
  margin-top: 56px;
`;

const CommentTextarea = styled.textarea`
  border: 1px solid ${borderDarkGray};
  color: ${fontDarkBlack};
  border-radius: 8px;
  outline: 0;
  flex-grow: 1;
  padding: 24px;
  font-size: 24px;
  margin-right: 20px;
  resize: none;
  overflow: hidden;

  &::placeholder {
    color: ${fontGray};
  }
`;
