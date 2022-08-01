import styled from '@emotion/styled';
import { Button, Image, Link, Title } from '~/components/atom';
import theme from '~/styles/theme';

interface CourseSliderItemProps {
  name: string;
  id: number;
  index: number;
  lastCount: number;
}

const DOT_BG = 'url(/assets/dot-gray.png)';
const LINE_BG = 'url(/assets/line-bluegray.png)';

const CourseSliderItem = ({ name, id, index, lastCount }: CourseSliderItemProps) => {
  const IS_START = index === 0;
  const IS_END = index === lastCount - 1;

  return (
    <div className="card-item">
      <CourseLine>
        <BackgroundLine>
          <Line style={{ backgroundImage: IS_START ? DOT_BG : LINE_BG }} />
          <Line
            style={{
              backgroundImage: IS_END ? DOT_BG : LINE_BG
            }}
          />
        </BackgroundLine>
        <Circle>{index + 1}</Circle>
      </CourseLine>
      <CourseCard>
        <CardImage style={{ backgroundImage: `url(/assets/location/jeju.jpg)` }}></CardImage>
        <CardInfo>
          <Title>{name}</Title>
          <Link href={`/place/${id}`}>
            <Button buttonType="borderPrimary">장소정보보기</Button>
          </Link>
        </CardInfo>
      </CourseCard>
    </div>
  );
};

export default CourseSliderItem;

const { borderGray, mainColor } = theme.color;

const CourseLine = styled.div`
  margin-bottom: 18px;
  position: relative;
`;

const BackgroundLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Line = styled.div`
  background: repeat-x;
  background-position-y: center;
  height: 48px;
  width: 50%;
`;

const Circle = styled.div`
  background-color: ${mainColor};
  color: white;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  line-height: 48px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const CourseCard = styled.div`
  overflow: hidden;
  padding: 10px;
`;

const CardImage = styled.div`
  border-radius: 8px 8px 0 0;
  height: 230px;
  background-size: cover;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 26px;
  border: 1px solid ${borderGray};
  border-top: none;
  border-radius: 0 0 8px 8px;
`;
