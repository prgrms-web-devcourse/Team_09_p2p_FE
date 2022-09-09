import styled from '@emotion/styled';
import { Text } from '~/components/atom';

interface PostDescription {
  usedCount: number;
}

const PostDescription = ({ usedCount }: PostDescription) => {
  return (
    <Description size="lg" block>
      <Text color="main" size="lg" fontWeight={700}>
        {usedCount}개의 여행코스
      </Text>
      에 포함된 장소입니다.
    </Description>
  );
};

export default PostDescription;

const Description = styled(Text)`
  margin-top: 4px;
`;
