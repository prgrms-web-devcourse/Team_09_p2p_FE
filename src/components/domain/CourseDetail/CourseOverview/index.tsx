import styled from '@emotion/styled';
import theme from '~/styles/theme';
import OverviewDetailItem from './OverviewDetailItem';
import OverviewItem from './OverviewItem';

const CourseOverview = () => {
  return (
    <Container>
      <OverviewList>
        <OverviewItem title="여행지역" content="제주" iconName="marker" />
        <OverviewItem title="여행기간" content="당일" iconName="calendar" />
        <OverviewItem title="총 코스" content="5코스" iconName="route" />
      </OverviewList>
      <OverviewDetailList>
        <OverviewDetailItem title="여행테마" content="#데이트코스 #힐링 #나혼자여행" />
        <OverviewDetailItem title="포함장소" content="카페, 바다, 테마파크, 음식점" />
      </OverviewDetailList>
    </Container>
  );
};

export default CourseOverview;

const { mainBackground } = theme.color;

const Container = styled.section`
  background-color: ${mainBackground};
  border-radius: 8px;
  padding: 48px 45px;
`;
const OverviewList = styled.ul`
  display: flex;
`;

const OverviewDetailList = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid #e5ebef;
`;
