import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Text } from '~/components/atom';
import { CommentApi } from '~/service';
import { IComments } from '~/types/comment';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface CommentProps {
  id: number;
  type: 'course' | 'place';
  writerId?: number;
}

const Comment = ({ id, type, writerId }: CommentProps) => {
  const [comments, setComments] = useState<IComments | null>(null);

  const getComments = async () => {
    const result = await CommentApi.getComments(id, type);
    setComments(result);
    console.log(result, 'result');
  };

  const onCreate = async (value: string) => {
    await CommentApi.createComment(id, { comment: value }, type);
    getComments();
  };

  const onDelete = async (commentId: number) => {
    await CommentApi.deleteComment(id, commentId, type);
    getComments();
  };

  const onEdit = async (commentId: number, value: string) => {
    await CommentApi.updateComment(id, commentId, { comment: value }, type);
    getComments();
  };

  const onCreateRecomment = async (commentId: number, value: string) => {
    await CommentApi.createComment(id, { comment: value, rootCommentId: commentId }, type);
    getComments();
  };

  useEffect(() => {
    if (!Number.isNaN(id)) {
      getComments();
      return;
    }
  }, []);

  if (!comments) {
    return null;
  }
  return (
    <CommentContainer>
      <Text size="xl" fontWeight={700}>
        댓글 {comments?.totalCount}개
      </Text>
      <CommentForm onSubmit={onCreate} />
      <CommentList>
        {comments.courseComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={onDelete}
            onEdit={onEdit}
            onCreateRecomment={onCreateRecomment}
            writerId={writerId}
          />
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
