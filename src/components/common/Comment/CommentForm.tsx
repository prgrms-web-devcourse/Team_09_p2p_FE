import styled from '@emotion/styled';
import { Button } from '~/components/atom';
import theme from '~/styles/theme';

const CommentForm = () => {
  return (
    <StyledCommentForm>
      <CommentTextarea placeholder="댓글을 작성해 주세요." rows={2} />
      <Button width={140}>등록</Button>
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
