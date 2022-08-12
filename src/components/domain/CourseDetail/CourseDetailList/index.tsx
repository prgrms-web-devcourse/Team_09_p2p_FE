import styled from '@emotion/styled';
import { Image, Text, Title } from '~/components/atom';
import Recommend from '~/components/common/Recommend';
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
            {place.isRecommended && <RecommendIcon active />}
          </CourseDetailTitle>
          <Address size="md" color="gray">
            {place.address}
          </Address>
          <ImageViewer>
            {place.imageUrl && <Image src={place.imageUrl} alt={place.name} height="100%" cover />}
          </ImageViewer>
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

const ImageViewer = styled.div`
  height: 500px;
  background-color: #ddd;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const RecommendIcon = styled(Recommend)`
  margin-left: 8px;
  margin-top: 2px;
`;
