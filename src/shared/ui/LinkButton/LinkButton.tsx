import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './LinkButton.module.css';

interface LinkButtonProps {
  className?: string;
  link?: string;
  noBorder?: boolean;
  onClick?: () => void;
}

export const LinkButton: FC<PropsWithChildren<LinkButtonProps>> = (props) => {
  // consts
  const { className, children, link, noBorder, onClick } = props;

  const onClickHandler = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <a
      onClick={onClickHandler}
      className={clsx(styles.root, noBorder && styles.noBorder, className)}
      href={link}
    >
      {children}
    </a>
  );
};
