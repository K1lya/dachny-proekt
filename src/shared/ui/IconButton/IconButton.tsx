import { type FC, type PropsWithChildren, useState } from 'react';
import clsx from 'clsx';
import styles from './IconButton.module.css';

interface IconButtonProps {
  className?: string;
  icon: React.ReactNode;
  hoverIcon?: React.ReactNode;
  onClick?: () => void;
}

export const IconButton: FC<PropsWithChildren<IconButtonProps>> = (props) => {
  // consts
  const { className, icon, hoverIcon, onClick } = props;
  const [hovered, setHovered] = useState(false);

  const computedIcon = hovered && hoverIcon ? hoverIcon : icon;

  const onHover = () => {
    const isTouchDevice = window.matchMedia(
      '(hover: none) and (pointer: coarse)',
    ).matches;
    if (!isTouchDevice) setHovered(true);
  };
  return (
    <div
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={() => setHovered(false)}
      className={clsx(styles.root, className)}
    >
      {computedIcon}
    </div>
  );
};
