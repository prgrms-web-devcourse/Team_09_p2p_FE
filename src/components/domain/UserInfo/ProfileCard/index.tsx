import styled from '@emotion/styled';
import { Icon, Link, Text, Title } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import theme from '~/styles/theme';

interface ProfileCardProps {
  profileImage: string;
  nickname: string;
  email: string;
  onClickAction: (value: string) => void;
  postCount: number;
  bookmarkCount: number;
  commentCount: number;
}

const ProfileCard = ({
  profileImage,
  nickname,
  email,
  onClickAction,
  postCount,
  bookmarkCount,
  commentCount
}: ProfileCardProps) => {
  return (
    <Container>
      <UserProfile>
        <ProfileImage>
          <ProfileAvatar size={143} src={profileImage} />
          <EditButton>
            <Icon size={16} name="pencil" block />
          </EditButton>
        </ProfileImage>
        <ProfileInfo>
          <Title block>{nickname}</Title>
          <Text color="gray">{email}</Text>
        </ProfileInfo>
      </UserProfile>
      <UserActions>
        <li>
          <Text>게시물</Text>
          <Text.Button onClick={() => onClickAction('post')} color="main" fontWeight={700}>
            {postCount}
          </Text.Button>
        </li>
        <li>
          <Text>북마크</Text>
          <Text.Button onClick={() => onClickAction('bookmark')} color="main" fontWeight={700}>
            {bookmarkCount}
          </Text.Button>
        </li>
        <li>
          <Text>댓글</Text>
          <Text.Button onClick={() => onClickAction('comment')} color="main" fontWeight={700}>
            {commentCount}
          </Text.Button>
        </li>
      </UserActions>
      <InfoEdit>
        <li>
          <Link href="/userinfo/edit">
            <Text>내 정보 변경</Text>
          </Link>
        </li>
        <li>
          <Link href="/userinfo/password">
            <Text>비밀번호 변경</Text>
          </Link>
        </li>
      </InfoEdit>
    </Container>
  );
};
export default ProfileCard;

const { borderGray, mainColor } = theme.color;
const { basicShadow } = theme.shadow;

const Container = styled.div`
  width: 294px;
  padding: 30px;
  border: 1px solid ${borderGray};
  box-shadow: ${basicShadow};
  position: fixed;
  top: 125px;
  z-index: 100;
  background-color: white;
`;

const UserProfile = styled.div`
  border-bottom: 1px solid ${borderGray};
  padding-bottom: 24px;
  margin-bottom: 24px;
`;

const ProfileAvatar = styled(Avatar)`
  box-shadow: ${basicShadow};
`;

const ProfileImage = styled.div`
  position: relative;
  width: min-content;
  margin: 0 auto;
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${mainColor};
  border: 3px solid white;
  border-radius: 50%;
  padding: 6px;
`;

const UserActions = styled.ul`
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${borderGray};

  li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
`;
const ProfileInfo = styled.div`
  margin-top: 18px;
  text-align: center;
`;
const InfoEdit = styled.div`
  li {
    padding: 10px 0;
  }
`;
