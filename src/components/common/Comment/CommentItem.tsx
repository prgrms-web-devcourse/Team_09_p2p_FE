import styled from '@emotion/styled';
import { Text } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import theme from '~/styles/theme';
import { IComment, IRecomment } from './types';

interface CommentItemProps {
  comment?: IComment | IRecomment;
  isRecomment?: boolean;
}

/* TODO:
1. 댓글 단 유저가 작성자일 경우 닉네임 옆에 표시
2. 본인 댓글일 경우 수정/삭제 버튼 노출
4. 2022-02-22 -> ~일전/~주전 으로 변경하는게 좋을 듯
*/

const CommentItem = ({ comment, isRecomment }: CommentItemProps) => {
  return (
    <>
      {comment && (
        <>
          <CommentWrapper isRecomment={isRecomment}>
            <Avatar size={66} src={comment.user.profileImage} />
            <CommentContent>
              <Text size="lg" block fontWeight={700}>
                {comment.user.nickname}
              </Text>
              <Text size="lg" block>
                {comment.comment}
              </Text>
              <CommentInfo>
                <Text color="gray">{comment.createdAt}</Text>
                {!isRecomment && <Text color="gray">답글 작성</Text>}
              </CommentInfo>
            </CommentContent>
          </CommentWrapper>
          {'recomments' in comment &&
            comment.recomments.map((recomment) => (
              <CommentItem key={recomment.id} comment={recomment} isRecomment />
            ))}
        </>
      )}
    </>
  );
};

export default CommentItem;

const { borderDarkGray } = theme.color;

const CommentWrapper = styled.div<Pick<CommentItemProps, 'isRecomment'>>`
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid ${borderDarkGray};

  padding-left: ${({ isRecomment }) => isRecomment && '50px'};
`;

const CommentContent = styled.div`
  margin-left: 18px;
  line-height: 1.5;
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
