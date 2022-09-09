import styled from '@emotion/styled';
import { Text, Title } from '~/components/atom';

interface PostHeaderProps {
  name: string;
  address: string;
}

const PostHeader = ({ name, address }: PostHeaderProps) => {
  return (
    <Container>
      <Title level={1} size="lg" fontWeight={700} block>
        {name}
      </Title>
      <Text size="md" block color="gray">
        {address}
      </Text>
    </Container>
  );
};

export default PostHeader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
