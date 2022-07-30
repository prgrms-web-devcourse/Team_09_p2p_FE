import styled from '@emotion/styled';
import { Text } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import theme from '~/styles/theme';
import { IComment, IRecomment } from '.';

interface CommentItemProps {
  comment?: IComment | IRecomment;
  isRecomment?: boolean;
}

const CommentItem = ({ comment, isRecomment }: CommentItemProps) => {
  return (
    <>
      {comment && (
        <>
          <CommentWrapper>
            <Avatar size={66} src={comment.user.profileImage} />
            <CommentContent>
              <Text size="lg" block style={{ fontWeight: 'bold' }}>
                {comment.user.nickname}
              </Text>
              <Text size="lg" block>
                {comment.comment}
              </Text>
              <CommentInfo>
                <Text color="gray">{comment.createdAt}</Text>
                {!isRecomment && <Text color="gray">답글작성</Text>}
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

const CommentWrapper = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid ${borderDarkGray};
`;

const CommentContent = styled.div`
  margin-left: 18px;
  line-height: 1.5;
`;

const CommentInfo = styled.div`
  margin-top: 4px;
  & > span {
    margin-right: 16px;
  }
`;
