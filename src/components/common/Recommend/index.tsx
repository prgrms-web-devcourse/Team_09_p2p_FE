import styled from '@emotion/styled';
import { Icon, Text } from '~/components/atom';
import theme from '~/styles/theme';

interface RecommendProps {
  active?: boolean;
}

const Recommend = ({ active, ...props }: RecommendProps) => {
  const iconName = active ? 'recommendActive' : 'recommendInactive';
  return (
    <IconContainer active={active} {...props}>
      <Icon name={iconName} size={16} block />
      <Text color={active ? 'main' : 'lightGray'}>추천</Text>
    </IconContainer>
  );
};

export default Recommend;

const { mainColor, borderDarkGray } = theme.color;

const IconContainer = styled.div<RecommendProps>`
  border: 1px solid ${({ active }) => (active ? mainColor : borderDarkGray)};
  border-radius: 20px;
  padding: 3px 13px 4px 12px;
  display: flex;
  align-items: center;
  background-color: ${({ active }) => (active ? '#f6faff' : '#F9F9F9')};

  i {
    margin-right: 2px;
    margin-top: 2px;
  }
`;
