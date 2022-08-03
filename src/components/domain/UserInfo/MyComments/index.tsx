import styled from '@emotion/styled';
import { Icon, Text } from '~/components/atom';
import { IComment } from '~/pages/userinfo';
import theme from '~/styles/theme';

interface MyComments {
  comments: IComment[];
}

const MyComments = ({ comments }: MyComments) => {
  return (
    <div>
      {comments.map((comment) => (
        <Container key={comment.id}>
          <CommentContent>
            <Text color="gray">`{comment.content.title}`에 남긴 댓글</Text>
            <Text size="lg" block>
              {comment.comment}
            </Text>
          </CommentContent>
          <CommentContent>
            <Text color="gray" block>
              {comment.createdAt}
            </Text>
            <CommentCount>
              <Icon size={20} name="comment" />
              <Text color="gray">12</Text>
            </CommentCount>
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

  padding: 32px 0;
  border-bottom: 1px solid ${borderGray};
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;
