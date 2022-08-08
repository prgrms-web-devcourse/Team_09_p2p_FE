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
      <Wrapper>
        <Text size="sm" color="blueGray">
          {title}
        </Text>
      </Wrapper>
      <Wrapper>
        {list?.map((item, index) => (
          <Text key={item} fontWeight={500}>
            {theme && '#'}
            {item}
            {!theme && index !== LAST_INDEX && ','}
          </Text>
        ))}
      </Wrapper>
    </Container>
  );
};

export default OverviewDetailItem;

const Container = styled.li`
  margin-right: 30px;
  max-width: 50%;
  line-height: 1.5;
  display: flex;
  span {
    margin-left: 8px;
    white-space: nowrap;
  }
`;

const Wrapper = styled.div``;
