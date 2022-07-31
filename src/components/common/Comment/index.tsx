import styled from '@emotion/styled';
import { Text } from '~/components/atom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface IUser {
  id: number;
  nickname: string;
  profileImage: string;
}

export interface IRecomment {
  id: number;
  comment: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  id: number;
  comment: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  recomments: IRecomment[];
}

const dummyComments = [
  {
    id: 3,
    comment: '반갑습니다',
    user: {
      id: 2,
      nickname: 'Jinist',
      profileImage: ''
    },
    createdAt: '2022-02-22',
    updatedAt: '',
    isDeleted: false,
    recomments: [
      {
        id: 4,
        comment: '대댓글이에요',
        user: {
          id: 3,
          nickname: 'Grew',
          profileImage: ''
        },
        createdAt: '2022-02-22',
        updatedAt: ''
      }
    ]
  }
];

interface CommentProps {
  comments?: IComment[];
}

const Comment = ({ comments = dummyComments }: CommentProps) => {
  return (
    <CommentContainer>
      <Text size="xl" fontWeight={700}>
        댓글 1개
      </Text>
      <CommentForm />
      <CommentList>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isRecomment={comment.recomments.length <= 0}
          />
        ))}
      </CommentList>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div``;
const CommentList = styled.div`
  margin-top: 42px;
`;
