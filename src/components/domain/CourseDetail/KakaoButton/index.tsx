import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Icon } from '~/components/atom';
import theme from '~/styles/theme';

const KakaoButton = () => {
  useEffect(() => {
    const kakao = window.Kakao;
    if (kakao && !kakao.isInitialized()) {
      console.log('카카오실행');
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_KEY);
    }
  }, []);

  const onClick = () => {
    const { Kakao, location } = window;
    Kakao.Share.sendScrap({
      templateId: 81335,
      requestUrl: location.href
    });
  };
  return (
    <IconButton id="kakao-link-btn" onClick={onClick}>
      <Icon name="share" size={28} />
    </IconButton>
  );
};

export default KakaoButton;

const { borderDarkGray } = theme.color;
const IconButton = styled.button`
  width: 66px;
  height: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50%;
  border: 1px solid ${borderDarkGray};
  margin-top: 20px;
  box-shadow: 0px 2px 4px 1px rgb(0 0 0 / 5%);
  transition: all 0.3s;

  &:hover {
    border-color: #adadad;
  }
`;
