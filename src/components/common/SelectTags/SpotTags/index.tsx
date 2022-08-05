import styled from '@emotion/styled';
import { Text } from '~/components/atom';
import { Spot } from '~/types';
import { TAGS_SPOT } from '~/utils/constants';
import Tag from './Tag';

export interface SpotTagsProps {
  selectedSpots: Spot[];
  onSelect: (spot: Spot, isSelected: boolean) => void;
}

const SpotTags = ({ selectedSpots, onSelect }: SpotTagsProps) => {
  return (
    <StyledTags>
      <TagName size="md" fontWeight={600}>
        테마
      </TagName>
      {TAGS_SPOT.map((spot) => (
        <Tag key={spot} selectedSpots={selectedSpots} spot={spot} onSelect={onSelect} />
      ))}
    </StyledTags>
  );
};

export default SpotTags;

const StyledTags = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TagName = styled(Text)`
  margin-right: 30px;
`;
