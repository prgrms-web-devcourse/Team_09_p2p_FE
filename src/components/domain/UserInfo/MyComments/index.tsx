import styled from '@emotion/styled';
import { Icon, Link, Text } from '~/components/atom';
import theme from '~/styles/theme';
import { IMyComment } from '~/types/comment';
import { sliceDate, textEllipsis } from '~/utils/converter';

interface MyComments {
  comments: IMyComment[];
}

const MyComments = ({ comments }: MyComments) => {
  return (
    <div>
      {comments.map((comment) => {
        const path =
          comment.content.type === '코스'
            ? `/course/${comment.content.id}`
            : `/place/${comment.content.id}`;
        return (
          <Container key={comment.id}>
            <CommentContent>
              <Link href={path}>
                <Text color="gray">`{textEllipsis(comment.content.title, 14)}`에 남긴 댓글</Text>
              </Link>
              <Link href={path}>
                <Text size="lg" ellipsis block style={{ width: 500 }}>
                  {comment.comment}
                </Text>
              </Link>
            </CommentContent>
            <CommentContent>
              <Text color="gray" block>
                {sliceDate(comment.createdAt)}
              </Text>
              <Link href={path}>
                <CommentCount>
                  {!comment.rootCommentId && (
                    <>
                      <Icon size={20} name="comment" />
                      <Text color="gray">{comment.subCommentCount}</Text>
                    </>
                  )}
                </CommentCount>
              </Link>
            </CommentContent>
          </Container>
        );
      })}
    </div>
  );
};

export default MyComments;

const { borderGray } = theme.color;
const Container = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 24px 16px;
  border-bottom: 1px solid ${borderGray};
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;

  i {
    margin-right: 5px;
  }
`;
