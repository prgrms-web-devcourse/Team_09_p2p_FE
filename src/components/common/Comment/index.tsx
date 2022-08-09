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
}

const Comment = ({ id, type }: CommentProps) => {
  const [comments, setComments] = useState<IComments | null>(null);

  const getComments = async () => {
    const result = await CommentApi.getComments(id, type);
    setComments(result);
  };

  const onSubmit = async (value: string) => {
    await CommentApi.createComment(id, { comment: value }, type);
    getComments();
  };

  const onDelete = async (commentId: number) => {
    await CommentApi.deleteComment(id, commentId, type);
    getComments();
  };

  const onUpdate = async (commentId: number) => {
    console.log(commentId, 'click Update');
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
      <CommentForm onSubmit={onSubmit} />
      <CommentList>
        {comments.courseComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} onDelete={onDelete} onUpdate={onUpdate} />
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
