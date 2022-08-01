import styled from '@emotion/styled';
import { Button, Image, Link, Title } from '~/components/atom';
import theme from '~/styles/theme';

interface CourseSliderItemProps {
  name: string;
  id: number;
}

const CourseSliderItem = ({ name, id }: CourseSliderItemProps) => {
  return (
    <CardContainer className="card-item">
      <Image src="/assets/location/jeju.jpg" />
      <CardInfo>
        <Title>{name}</Title>
        <Link href={`/place/${id}`}>
          <Button buttonType="borderPrimary">장소정보보기</Button>
        </Link>
      </CardInfo>
    </CardContainer>
  );
};

export default CourseSliderItem;

const { borderGray } = theme.color;
const CardContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 26px;
  border: 1px solid ${borderGray};
  border-top: none;
  border-radius: 0 0 8px 8px;
`;
