import styled from '@emotion/styled';
import { Image, Text, Title } from '~/components/atom';
import { IPlace } from '~/types/place';

interface CourseDetailList {
  places?: IPlace[];
}

const CourseDetailList = ({ places }: CourseDetailList) => {
  /* TODO:
    1. 추천아이콘 변경하기
  */

  return (
    <Container>
      {places?.map((place, index) => (
        <CourseDetailItem key={place.id}>
          <CourseDetailTitle>
            <Title size="md" fontWeight={700}>
              {index + 1}. {place.name}
            </Title>
            {place.isRecommended && <button>추천 아이콘</button>}
          </CourseDetailTitle>
          <Address size="md" color="gray">
            {place.address}
          </Address>
          <Image src={place.imageUrl} alt={place.name} style={{ borderRadius: 8 }} />
          <CourseDescription>
            <ContentText size="lg" color="dark" paragraph>
              {place.description}
            </ContentText>
          </CourseDescription>
        </CourseDetailItem>
      ))}
    </Container>
  );
};

export default CourseDetailList;

const Container = styled.div`
  margin-top: 70px;
`;
const CourseDetailItem = styled.div`
  margin-bottom: 70px;
`;
const CourseDetailTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  button {
    margin-left: 8px;
  }
`;
const CourseDescription = styled.div`
  margin-top: 37px;
  line-height: 1.7;
`;

const Address = styled(Text)`
  margin-bottom: 37px;
`;

const ContentText = styled(Text)`
  white-space: pre;
`;
