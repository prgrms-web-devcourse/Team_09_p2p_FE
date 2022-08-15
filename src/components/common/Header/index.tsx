import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { PageContainer, Button, Link, Image } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import Logo from '~/components/atom/Logo';
import { useUser } from '~/hooks/useUser';
import theme from '~/styles/theme';
import ConfirmModal from '../ConfirmModal';
import SearchInput from '../SearchInput';

interface HeaderProps {
  full?: boolean;
  isLoading?: boolean;
}

const Header = ({ full, isLoading }: HeaderProps) => {
  const { currentUser, isLoggedIn } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleGoLogin = () => {
    setModalVisible(false);
    router.push('/login');
  };

  const handleSearch = (keyword: string) => {
    const searchPath = `/search?keyword=${keyword}`;
    router.push(searchPath);
  };

  const onClickCreate = () => {
    if (!isLoggedIn) {
      setModalVisible(true);
      return;
    }

    router.push('/course/create');
  };

  if (full) {
    return (
      <HeaderContainer>
        <FullInner>
          <LeftArea>
            <Link href="/">
              <Logo width={130} height={35} />
            </Link>
          </LeftArea>
          <Buttons>
            {isLoggedIn && (
              <Link href="/userinfo">
                <Avatar size={54} src={currentUser.user.profileImage} />
              </Link>
            )}
          </Buttons>
        </FullInner>
      </HeaderContainer>
    );
  } else {
    return (
      <>
        <ConfirmModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleGoLogin}
          message="로그인이 필요한 서비스입니다."
          subMessage="로그인 페이지로 이동할까요?"
        />
        <HeaderContainer>
          <PageContainer>
            <Inner>
              <LeftArea>
                <Link href="/">
                  <Logo width={130} height={35} />
                </Link>
                <Category>
                  <li>
                    <Link href="/course">여행코스</Link>
                  </li>
                  <li>
                    <Link href="/place">추천장소</Link>
                  </li>
                </Category>
              </LeftArea>

              <InputContainer>
                <SearchInput onSearch={handleSearch} placeholder="지역, 장소를 검색해보세요" />
              </InputContainer>

              <Buttons>
                <Button onClick={onClickCreate}>코스등록</Button>
                {!isLoggedIn && !isLoading && (
                  <Link href="/login">
                    <Button buttonType="borderPrimary">로그인</Button>
                  </Link>
                )}
                {isLoggedIn && !isLoading && (
                  <Link href={`/userinfo/${currentUser.user.id}`}>
                    <Avatar size={54} src={currentUser.user.profileImage} />
                  </Link>
                )}
              </Buttons>
            </Inner>
          </PageContainer>
        </HeaderContainer>
      </>
    );
  }
};

export default Header;

const { mainColor, borderGray } = theme.color;

const HeaderContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${borderGray};
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 999;
  height: 85px;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  height: 85px;
  justify-content: space-between;
`;

const FullInner = styled.div`
  display: flex;
  align-items: center;
  height: 85px;
  justify-content: space-between;
  padding: 0 50px;
`;

const InputContainer = styled.div`
  box-sizing: border-box;
  width: 356px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftArea = styled.div`
  display: flex;
  align-items: center;
`;

const Category = styled.ul`
  display: flex;
  margin-left: 42px;

  li {
    margin-right: 24px;

    // text 속성
    font-size: 20px;
    font-weight: 500;

    &:hover {
      color: ${mainColor};
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
