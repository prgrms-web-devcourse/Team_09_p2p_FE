import styled from '@emotion/styled';
// import Link from 'next/link';
import React from 'react';
import { PageContainer, Button, Link } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import Logo from '~/components/atom/Logo';
import theme from '~/styles/theme';

interface HeaderProps {
  full?: boolean;
}

const Header = ({ full }: HeaderProps) => {
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
            <Link href="/userinfo">
              <Avatar size={54} src="" />
            </Link>
          </Buttons>
        </FullInner>
      </HeaderContainer>
    );
  } else {
    return (
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

            <div>
              <input placeholder="지역, 장소를 입력해주세요" />
            </div>

            <Buttons>
              <Link href="/course/create">
                <Button>코스등록</Button>
              </Link>
              <Link href="/login">
                <Button buttonType="borderPrimary">로그인</Button>
              </Link>
            </Buttons>
          </Inner>
        </PageContainer>
      </HeaderContainer>
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
  button {
    margin-left: 20px;
  }
`;
