import styled from '@emotion/styled';
import { Text } from '~/components/atom';

interface OverviewDetailItemProps {
  title: string;
  list: string[];
}

const OverviewDetailItem = ({ title, list }: OverviewDetailItemProps) => {
  console.log(list, 'list');
  return (
    <Container>
      <Text size="sm" color="blueGray">
        {title}
      </Text>

      {list.map((item) => (
        <Text key={item} fontWeight={500}>
          {item}
        </Text>
      ))}
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
