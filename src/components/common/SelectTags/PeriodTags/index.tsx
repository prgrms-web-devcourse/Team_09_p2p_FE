import styled from '@emotion/styled';
import { Text } from '~/components/atom';
import { Period } from '~/types';
import { TAGS_PERIOD } from '~/utils/constants';
import Tag from './Tag';

export interface PeriodTagsProps {
  selectedPeriod: Period | null;
  onSelect: (period: Period) => void;
}

const PeriodTags = ({ selectedPeriod, onSelect }: PeriodTagsProps) => {
  return (
    <StyledTags>
      <TagName size="md" fontWeight={600}>
        기간
      </TagName>
      {TAGS_PERIOD.map((period) => (
        <Tag key={period} selectedPeriod={selectedPeriod} period={period} onSelect={onSelect} />
      ))}
    </StyledTags>
  );
};

export default PeriodTags;

const StyledTags = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TagName = styled(Text)`
  margin-right: 30px;
`;
