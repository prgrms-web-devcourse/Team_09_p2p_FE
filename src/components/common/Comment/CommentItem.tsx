import styled from '@emotion/styled';
import { useState } from 'react';
import { Button, Link, Text } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import theme from '~/styles/theme';
import { IComment } from '~/types/comment';
import { sliceDate } from '~/utils/converter';

interface CommentItemProps {
  comment: IComment;
  onUpdate: (commentId: number, value: string) => void;
  onDelete: (commentId: number) => void;
}

/* TODO:
1. 댓글 단 유저가 작성자일 경우 닉네임 옆에 표시
2. 본인 댓글일 경우 수정/삭제 버튼 노출
4. 2022-02-22 -> ~일전/~주전 으로 변경하는게 좋을 듯
*/

const CommentItem = ({ comment, onUpdate, onDelete }: CommentItemProps) => {
  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const [editText, setEditText] = useState(comment.comment);
  const isRecomment = comment.rootCommentId !== null;

  const handleClickEdit = async (commentId: number) => {
    await onUpdate(commentId, editText);
    setIsOpenEditor(false);
  };

  const cancelEdit = () => {
    setIsOpenEditor(false);
    setEditText(comment.comment);
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
              <Link href={`/userinfo/${comment.user.id}`}>
                <Text size="lg" block fontWeight={700}>
                  {comment.user.nickName}
                </Text>
              </Link>
              <Text size="lg" block>
                {comment.comment}
              </Text>
              <CommentInfo>
                <Text color="gray">{sliceDate(comment.createdAt)}</Text>
                {!isRecomment && <Text color="gray">답글 작성</Text>}
              </CommentInfo>
            </CommentContent>
            <Buttons>
              <Text.Button onClick={() => setIsOpenEditor(true)}>수정</Text.Button>
              <Text.Button onClick={() => onDelete(comment.id)}>삭제</Text.Button>
            </Buttons>
          </>
        ) : (
          <>
            <EditWrapper isRecomment={isRecomment}>
              <CommentTextarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              ></CommentTextarea>
              <EditButtons>
                <Button buttonType="borderPrimary" onClick={cancelEdit}>
                  취소
                </Button>
                <Button
                  onClick={() => {
                    handleClickEdit(comment.id);
                  }}
                >
                  수정
                </Button>
              </EditButtons>
            </EditWrapper>
          </>
        )}
      </CommentContainer>
    </>
  );
};

export default CommentItem;

const { borderDarkGray, fontDarkBlack, fontGray } = theme.color;

const CommentContainer = styled.div<{ isRecomment: boolean | null }>`
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid ${borderDarkGray};

  padding-left: ${({ isRecomment }) => isRecomment && '50px'};
`;

const EditWrapper = styled.div<{ isRecomment: boolean | null }>`
  width: 100%;
  padding-left: 18px;
`;

const CommentContent = styled.div`
  margin-left: 18px;
  line-height: 1.5;
  flex-grow: 1;

  & > span {
    margin-bottom: 4px;
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
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  border: 1px solid ${borderDarkGray};
  color: ${fontDarkBlack};
  border-radius: 8px;
  outline: 0;
  flex-grow: 1;
  padding: 24px;
  font-size: 20px;
  margin-right: 20px;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;

  &::placeholder {
    color: ${fontGray};
  }
`;

const EditButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
  gap: 8px;
`;
