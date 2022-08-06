import styled from '@emotion/styled';
import theme from '~/styles/theme';
import OverviewDetailItem from './OverviewDetailItem';
import OverviewItem from './OverviewItem';

interface CourseOverviewProps {
  region?: string;
  period?: string;
  courseCount?: number;
  themes?: string[];
  spots?: string[];
}

const CourseOverview = ({ region, period, courseCount, themes, spots }: CourseOverviewProps) => {
  return (
    <Container>
      <OverviewList>
        <OverviewItem title="여행지역" content={region} iconName="marker" />
        <OverviewItem title="여행기간" content={period} iconName="calendar" />
        <OverviewItem title="총 코스" content={courseCount + '코스'} iconName="route" />
      </OverviewList>
      <OverviewDetailList>
        <OverviewDetailItem title="여행테마" list={themes} theme />
        <OverviewDetailItem title="포함장소" list={spots} />
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
