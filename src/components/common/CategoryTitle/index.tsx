import styled from '@emotion/styled';
import { Title } from '~/components/atom';

interface CategoryTitleProps {
  name: string;
}

const CategoryTitle = ({ name }: CategoryTitleProps) => {
  return (
    <Container>
      <Title size="sm" fontWeight={700}>
        {name}
      </Title>
    </Container>
  );
};

export default CategoryTitle;

const Container = styled.div`
  margin-top: 40px;
  margin-bottom: 30px;
`;
