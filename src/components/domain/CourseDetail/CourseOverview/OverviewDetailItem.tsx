import styled from '@emotion/styled';
import { Text } from '~/components/atom';

interface OverviewDetailItemProps {
  title?: string;
  list?: string[];
  theme?: boolean;
}

const OverviewDetailItem = ({ title, list, theme }: OverviewDetailItemProps) => {
  const LAST_INDEX = list !== undefined && list.length - 1;

  return (
    <Container>
      <Text size="sm" color="blueGray">
        {title}
      </Text>

      {list?.map((item, index) => (
        <Text key={item} fontWeight={500}>
          {theme && '#'}
          {item}
          {!theme && index !== LAST_INDEX && ','}
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
