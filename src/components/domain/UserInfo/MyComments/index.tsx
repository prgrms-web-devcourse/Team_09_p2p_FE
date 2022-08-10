import styled from '@emotion/styled';
import { Icon, Link, Text } from '~/components/atom';
import theme from '~/styles/theme';
import { IMyComment } from '~/types/comment';
import { sliceDate } from '~/utils/converter';

interface MyComments {
  comments: IMyComment[] | null;
}

const MyComments = ({ comments }: MyComments) => {
  if (!comments) {
    return null;
  }
  return (
    <div>
      {comments.map((comment) => (
        <Container key={comment.id}>
          <CommentContent>
            <Link href={`/course/${comment.content.id}`}>
              <Text color="gray">`{comment.content.title}`에 남긴 댓글</Text>
            </Link>
            <Text size="lg" block>
              <Link href={`/course/${comment.content.id}`}>{comment.comment}</Link>
            </Text>
          </CommentContent>
          <CommentContent>
            <Text color="gray" block>
              {sliceDate(comment.createdAt)}
            </Text>
            <Link href={`/course/${comment.content.id}`}>
              <CommentCount>
                <Icon size={20} name="comment" />
                <Text color="gray">{comment.subCommentCount}</Text>
              </CommentCount>
            </Link>
          </CommentContent>
        </Container>
      ))}
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
