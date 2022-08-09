import styled from '@emotion/styled';
import { Text } from '~/components/atom';
import { IComments } from '~/types/comment';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface CommentProps {
  comments: IComments;
}

const Comment = ({ comments }: CommentProps) => {
  return (
    <CommentContainer>
      <Text size="xl" fontWeight={700}>
        댓글 {comments?.totalCount}개
      </Text>
      <CommentForm />
      <CommentList>
        {comments.courseComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </CommentList>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 150px;
`;
const CommentList = styled.div`
  margin-top: 42px;
`;
