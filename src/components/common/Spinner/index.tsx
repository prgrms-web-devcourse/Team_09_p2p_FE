import styled from '@emotion/styled';
import theme from '~/styles/theme';

const Spinner = () => {
  return (
    <Loader>
      <div className="spinner"></div>
    </Loader>
  );
};

export default Spinner;

const { mainColor } = theme.color;

const Loader = styled.div`
  width: 100%;
  height: 100%;

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 64px;
    height: 64px;
    margin-top: -32px;
    margin-left: -32px;
    border-radius: 50%;
    border: 8px solid transparent;
    border-top-color: ${mainColor};
    border-bottom-color: ${mainColor};
    animation: spinner 0.8s ease infinite;
    z-index: 10;
  }
`;
