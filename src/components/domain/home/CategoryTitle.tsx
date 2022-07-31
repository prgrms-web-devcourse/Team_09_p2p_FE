import styled from '@emotion/styled';
import { Icon, Title } from '~/components/atom';

interface CategoryTitleProps {
  name: string;
}

const CategoryTitle: React.FC<CategoryTitleProps> = ({ name }) => {
  return (
    <Container>
      <Title size="md" fontWeight={700}>
        {name}
      </Title>
      <Icon name="arrow" size={25} />
    </Container>
  );
};

export default CategoryTitle;

const Container = styled.div`
  margin-bottom: 30px;
`;
