import styled from '@emotion/styled';
import { Icon, Title } from '~/components/atom';

interface MainCategoryTitleProps {
  name: string;
}

const MainCategoryTitle = ({ name }: MainCategoryTitleProps) => {
  return (
    <Container>
      <Title size="md" fontWeight={700}>
        {name}
      </Title>
      <MoveIcon name="arrow" size={25} block />
    </Container>
  );
};

export default MainCategoryTitle;

const Container = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;

const MoveIcon = styled(Icon)`
  margin-left: 6px;
  margin-top: 2px;
`;
