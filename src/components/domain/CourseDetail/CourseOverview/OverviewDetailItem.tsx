import styled from '@emotion/styled';
import { Text } from '~/components/atom';

interface OverviewDetailItemProps {
  title: string;
  content: string;
}

const OverviewDetailItem = ({ title, content }: OverviewDetailItemProps) => {
  return (
    <Container>
      <Text size="sm" color="blueGray">
        {title}
      </Text>
      <Text fontWeight={500}>{content}</Text>
    </Container>
  );
};

export default OverviewDetailItem;

const Container = styled.li`
  margin-right: 30px;
  span {
    margin-left: 8px;
  }
`;
