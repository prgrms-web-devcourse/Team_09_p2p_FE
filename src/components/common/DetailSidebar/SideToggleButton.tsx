import { useEffect, useState } from 'react';
import { Icon } from '~/components/atom';
import { IconName } from '~/components/atom/Icon/types';
import SideButton from './SideButton';

interface ToggleButtonProps {
  active: IconName;
  inactive: IconName;
  size: number;
  onClick: () => void;
  defaultValue: boolean;
  isLoggedIn: boolean;
}

const SideToggleButton = ({
  active,
  inactive,
  size,
  onClick,
  defaultValue,
  isLoggedIn
}: ToggleButtonProps) => {
  const [isClicked, setIsClicked] = useState(defaultValue);

  const handleClick = () => {
    if (isLoggedIn) {
      setIsClicked(!isClicked);
    }

    onClick();
  };

  useEffect(() => {
    setIsClicked(defaultValue);
  }, [defaultValue]);

  return (
    <SideButton onClick={handleClick}>
      {isClicked ? <Icon name={active} size={size} /> : <Icon name={inactive} size={size} />}
    </SideButton>
  );
};

export default SideToggleButton;
