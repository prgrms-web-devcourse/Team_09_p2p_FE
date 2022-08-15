import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Text } from '~/components/atom';
import { CommentApi } from '~/service';
import { IComment } from '~/types/comment';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import ConfirmModal from '../ConfirmModal';

interface CommentProps {
  id: number;
  type: 'course' | 'place';
  writerId?: number;
}

const Comment = ({ id, type, writerId }: CommentProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState<IComment[] | null>(null);
  const deleteTargetCommentIdRef = useRef<number | undefined>();
  const closeModal = () => {
    setModalVisible(false);
    deleteTargetCommentIdRef.current = undefined;
  };

  const getComments = async () => {
    const result = await CommentApi.getComments(id, type);
    setComments(result);
  };

  const onCreate = async (value: string) => {
    await CommentApi.createComment(id, { comment: value }, type);
    getComments();
  };

  const onDeleteConfirm = async () => {
    if (deleteTargetCommentIdRef.current) {
      const commentId = deleteTargetCommentIdRef.current;
      await CommentApi.deleteComment(id, commentId, type);
      getComments();
      deleteTargetCommentIdRef.current = undefined;
      closeModal();
    }
  };

  const onDelete = (commentId: number) => {
    setModalVisible(true);
    deleteTargetCommentIdRef.current = commentId;
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
    <>
      <CommentContainer>
        <Text size="xl" fontWeight={700}>
          댓글 {comments.length}개
        </Text>
        <CommentForm onSubmit={onCreate} />
        <CommentList>
          {comments.map((comment) => (
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
      <ConfirmModal
        visible={modalVisible}
        onClose={closeModal}
        onConfirm={onDeleteConfirm}
        message="댓글 삭제"
        subMessage="댓글을 정말 삭제하시겠습니까?"
      />
    </>
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
