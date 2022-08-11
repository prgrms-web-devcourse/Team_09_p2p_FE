import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { Button, Link, Text } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import theme from '~/styles/theme';
import { IComment } from '~/types/comment';
import { sliceDate } from '~/utils/converter';
import CommentEditor from './CommentEditor';

interface CommentItemProps {
  comment: IComment;
  onEdit: (commentId: number, value: string) => void;
  onDelete: (commentId: number) => void;
  onCreateRecomment: (commentId: number, value: string) => void;
  writerId?: number;
}

/* TODO:
1. 댓글 단 유저가 작성자일 경우 닉네임 옆에 표시
2. 본인 댓글일 경우 수정/삭제 버튼 노출
4. 2022-02-22 -> ~일전/~주전 으로 변경하는게 좋을 듯
*/

const CommentItem = ({
  comment,
  onEdit,
  onDelete,
  onCreateRecomment,
  writerId
}: CommentItemProps) => {
  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const [isOpenRecomment, setIsOpenRecomment] = useState(false);
  const isRecomment = comment.rootCommentId !== null;

  const IS_UPDATED = comment.createdAt !== comment.updatedAt;

  const handleEditComment = async (value: string) => {
    await onEdit(comment.id, value);
    setIsOpenEditor(false);
  };

  const handleCancelEdit = () => {
    setIsOpenEditor(false);
  };

  const handleCreateRecomment = async (value: string) => {
    await onCreateRecomment(comment.id, value);
    setIsOpenRecomment(false);
  };

  const handleCancelRecomment = () => {
    setIsOpenRecomment(false);
  };

  const handleDelete = () => {
    if (confirm('삭제하시겠습니까?')) {
      onDelete(comment.id);
    }
  };
  return (
    <>
      <CommentContainer isRecomment={isRecomment}>
        <Link href={`/userinfo/${comment.user.id}`}>
          <Avatar size={66} src={comment.user.profileImage} />
        </Link>
        {!isOpenEditor ? (
          <>
            <CommentContent>
              <div>
                <Link href={`/userinfo/${comment.user.id}`}>
                  <Text size="lg" fontWeight={700}>
                    {comment.user?.nickname}
                  </Text>
                </Link>
                {writerId === comment.user.id && <Writer>작성자</Writer>}
              </div>
              <Text size="lg" block style={{ whiteSpace: 'pre-wrap' }}>
                {comment.comment}
              </Text>
              <CommentInfo>
                {comment.createdAt && (
                  <>
                    <Text color="gray">
                      {sliceDate(comment.createdAt)} {IS_UPDATED && '(편집됨)'}
                    </Text>
                    {!isRecomment && (
                      <Text.Button onClick={() => setIsOpenRecomment(true)} color="gray">
                        답글 작성
                      </Text.Button>
                    )}
                  </>
                )}
              </CommentInfo>
            </CommentContent>
            <Buttons>
              <Text.Button color="gray" onClick={() => setIsOpenEditor(true)}>
                수정
              </Text.Button>
              <Text.Button color="gray" onClick={handleDelete}>
                삭제
              </Text.Button>
            </Buttons>
          </>
        ) : (
          <CommentEditor
            onSubmit={handleEditComment}
            onCancel={handleCancelEdit}
            defaultValue={comment.comment}
          />
        )}
      </CommentContainer>
      {isOpenRecomment && (
        <CommentContainer style={{ paddingLeft: 50 }}>
          <Link href={`/userinfo/${comment.user.id}`}>
            <Avatar size={66} src={comment.user.profileImage} />
          </Link>
          <CommentEditor
            onSubmit={handleCreateRecomment}
            onCancel={handleCancelRecomment}
            defaultValue=""
          />
        </CommentContainer>
      )}
    </>
  );
};

export default CommentItem;

const { borderDarkGray, mainColor } = theme.color;

const CommentContainer = styled.div<{ isRecomment?: boolean | null }>`
  display: flex;
  padding: 24px 0;
  border-bottom: 1px solid ${borderDarkGray};

  padding-left: ${({ isRecomment }) => isRecomment && '50px'};
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 18px;
  line-height: 1.5;
  flex-grow: 1;

  & > span {
    margin-top: 8px;
  }
`;

const CommentInfo = styled.div`
  margin-top: 8px;
  & > span {
    margin-right: 16px;
  }
`;

const Buttons = styled.div`
  flex-shrink: 0;
  button {
    margin-left: 12px;
  }
`;

const Writer = styled.span`
  border: 1px solid ${mainColor};
  color: ${mainColor};
  border-radius: 20px;
  padding: 0 10px;
  margin-left: 8px;
`;
