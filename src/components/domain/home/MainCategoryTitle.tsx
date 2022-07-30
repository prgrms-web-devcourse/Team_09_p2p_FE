import styled from '@emotion/styled';
import { Icon, Title } from '~/components/atom';

interface MainCategoryTitleProps {
  name: string;
}

const MainCategoryTitle: React.FC<MainCategoryTitleProps> = ({ name }) => {
  return (
    <Container>
      <Title size="md" fontWeight={700}>
        {name}
      </Title>
      <Icon name="arrow" size={25} />
    </Container>
  );
};

export default MainCategoryTitle;

const Container = styled.div`
  margin-bottom: 30px;
`;
