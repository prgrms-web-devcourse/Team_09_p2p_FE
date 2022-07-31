import styled from '@emotion/styled';
import { PageContainer } from '~/components/atom';
import theme from '~/styles/theme';

const Footer = () => {
  return (
    <StyledFooter>
      <PageContainer>
        <LinkList>
          <li>개인정보 처리방침</li>
          <li>이용약관</li>
        </LinkList>
        <Info>
          <p>
            (주)이곳저곳<strong>　대표</strong> 오프와에프 / 함소진 주형진 용상윤 김기현 강완수
            고범석 송무송 박형근
          </p>
          <p>
            <strong>주소</strong> 서울 서초구 강남대로 327 2층 프로그래머스
            <strong>　고객센터</strong> 1577-0000
          </p>
        </Info>
        <Copyright>
          <p>Copyright 2022. placetoplace all rights reserved</p>
        </Copyright>
      </PageContainer>
    </StyledFooter>
  );
};

export default Footer;

const { borderGray, fontGray } = theme.color;

const StyledFooter = styled.footer`
  border-top: 1px solid ${borderGray};
  padding: 50px 0;
  font-size: 14px;
  color: #b5b5b5;
`;

const LinkList = styled.ul`
  display: flex;
  font-weight: 500;
  color: ${fontGray};

  li:not(:first-of-type) {
    margin-left: 20px;
  }
`;

const Info = styled.div`
  line-height: 1.8;
  margin-top: 20px;

  p {
    strong {
      font-weight: 500;
    }
  }
`;

const Copyright = styled.div`
  margin-top: 20px;
`;
