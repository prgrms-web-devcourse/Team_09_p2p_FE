import styled from '@emotion/styled';
import { Icon, Text } from '~/components/atom';
import { IconName } from '~/components/atom/Icon/types';

interface OverViewItemProps {
  title: string;
  content: string;
  iconName: IconName;
}

const OverviewItem = ({ title, content, iconName }: OverViewItemProps) => {
  return (
    <Container>
      <StyledIcon name={iconName} size={38} />
      <CourseInfoText>
        <Text size="sm" color="blueGray">
          {title}
        </Text>
        <Text size="md" fontWeight={500}>
          {content}
        </Text>
      </CourseInfoText>
    </Container>
  );
};

export default OverviewItem;

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 33.3%;
`;

const StyledIcon = styled(Icon)`
  background-color: white;
  padding: 18px;
  border-radius: 50%;
`;

const CourseInfoText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  gap: 8px;
`;
