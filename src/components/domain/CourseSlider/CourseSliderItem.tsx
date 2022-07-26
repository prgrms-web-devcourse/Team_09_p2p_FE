import styled from '@emotion/styled';
import { Button, Link, Title } from '~/components/atom';
import theme from '~/styles/theme';
import { IMAGE_URL } from '~/utils/constants/images';

interface CourseSliderItemProps {
  name: string;
  placeId: number;
  index: number;
  lastCount: number;
  imageUrl: string;
}

const DOT_BG = `url(${IMAGE_URL}/assets/dot-gray.png)`;
const LINE_BG = `url(${IMAGE_URL}/assets/line-bluegray.png)`;

const CourseSliderItem = ({ name, placeId, index, lastCount, imageUrl }: CourseSliderItemProps) => {
  const IS_START = index === 0;
  const IS_END = index === lastCount - 1;

  const IMAGE_URL = imageUrl ? imageUrl : '';

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
        <CardImage style={{ backgroundImage: `url(${IMAGE_URL})` }}></CardImage>
        <CardInfo>
          <TitleContainer>
            <Title size={22} ellipsis>
              {name}
            </Title>
          </TitleContainer>
          <Link href={`/place/${placeId}`}>
            <Button buttonType="borderPrimary">장소정보보기</Button>
          </Link>
        </CardInfo>
      </CourseCard>
    </div>
  );
};

export default CourseSliderItem;

const { borderGray, mainColor, backgroundGray } = theme.color;

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
  height: 210px;
  background-size: cover;
  background-color: ${backgroundGray};
  background-position: center;
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
  width: 100%;
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
`;
