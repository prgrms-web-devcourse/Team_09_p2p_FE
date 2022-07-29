import styled from '@emotion/styled';
import { Icon, Text } from '~/components/atom';

interface LikeCount {
  count: number;
}

const LikeCount = ({ count = 0 }) => {
  return (
    <Like>
      <Icon name="heart" size={20} />
      <StyledText color="darkGray">{count}</StyledText>
    </Like>
  );
};

export default LikeCount;
const Like = styled.div`
  display: flex;
  align-items: center;
`;

const StyledText = styled(Text)`
  margin-bottom: 2px;
  margin-left: 2px;
`;
