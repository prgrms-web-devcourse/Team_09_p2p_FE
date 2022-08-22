import styled from '@emotion/styled';
import { Icon, Title } from '~/components/atom';

interface ArrowTitle {
  name: string;
  size?: 'sm' | 'md';
}

const ArrowTitle = ({ name, size = 'md' }: ArrowTitle) => {
  return (
    <Container>
      <Title size={size} fontWeight={700}>
        {name}
      </Title>
      <MoveIcon name="arrow" size={size === 'md' ? 25 : 23} />
    </Container>
  );
};

export default ArrowTitle;

const Container = styled.div`
  margin-bottom: 30px;
  display: inline-flex;
  align-items: center;
`;

const MoveIcon = styled(Icon)`
  margin-left: 6px;
  margin-top: 2px;
`;
