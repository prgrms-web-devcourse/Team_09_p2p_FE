import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { Icon, Link, Text, Title } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import ImageUpload from '~/components/common/ImageUpload';
import { useUser } from '~/hooks/useUser';
import { UserApi } from '~/service';
import theme from '~/styles/theme';
import { InfoTab } from '../types';

interface ProfileCardProps {
  profileImage: string | null;
  nickname: string;
  email: string;
  onClickAction: (value: InfoTab) => void;
  postCount: number;
  bookmarkCount: number;
  commentCount: number;
  isMyPage: boolean;
  userId: number;
}

const ProfileCard = ({
  profileImage,
  nickname,
  email,
  onClickAction,
  postCount,
  bookmarkCount,
  commentCount,
  isMyPage,
  userId
}: ProfileCardProps) => {
  const { logout } = useUser();
  const router = useRouter();

  const profileImageRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [previewImage, setPreviewImage] = useState(profileImage);

  const onLogout = () => {
    logout();
    router.push('/');
  };

  const handleFileOnChange = (imageFile: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = async () => {
      const formData = new FormData();
      formData.append('file', imageFile);

      const result = await UserApi.changeProfileImage(formData);

      if (result) {
        setPreviewImage(reader.result as string);
      }
    };
  };

  const imageId = 'imgFile';

  return (
    <Container>
      <UserProfile>
        <ProfileImage>
          <ProfileAvatar size={143} src={previewImage} />
          <ImageUpload
            onImageUpload={handleFileOnChange}
            imageRef={profileImageRef}
            labelId={imageId}
          />
          {isMyPage && (
            <>
              <EditLabel htmlFor={imageId} ref={labelRef}></EditLabel>
              <EditButton size={16} name="pencil" block onClick={() => labelRef.current?.click()} />
            </>
          )}
        </ProfileImage>
        <ProfileInfo>
          <Title block>{nickname}</Title>
          <Text color="gray">{email}</Text>
        </ProfileInfo>
      </UserProfile>
      <UserActions>
        <li>
          <Text>게시물</Text>
          <Text.Button onClick={() => onClickAction('course')} color="main" fontWeight={700}>
            {postCount}
          </Text.Button>
        </li>
        <li>
          <Text>북마크</Text>
          <Text.Button onClick={() => onClickAction('bookmark')} color="main" fontWeight={700}>
            {bookmarkCount}
          </Text.Button>
        </li>
        {isMyPage && (
          <li>
            <Text>댓글</Text>
            <Text.Button onClick={() => onClickAction('comment')} color="main" fontWeight={700}>
              {commentCount}
            </Text.Button>
          </li>
        )}
      </UserActions>

      {isMyPage && (
        <InfoEdit>
          <li>
            <Link href={`/userinfo/${userId}/edit`}>
              <Text>내 정보 변경</Text>
            </Link>
          </li>
          <li>
            <Link href={`/userinfo/${userId}/password`}>
              <Text>비밀번호 변경</Text>
            </Link>
          </li>
          <li>
            <Text.Button onClick={onLogout}>로그아웃</Text.Button>
          </li>
        </InfoEdit>
      )}
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

const EditLabel = styled.label``;
const EditButton = styled(Icon.Button)`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${mainColor};
  border: 3px solid white;
  border-radius: 50%;
  padding: 6px;
`;

const UserActions = styled.ul`
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
  border-top: 1px solid ${borderGray};
  margin-top: 24px;
  padding-top: 24px;
  li {
    padding: 10px 0;
  }
`;
