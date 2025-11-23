import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './TopContent.module.css';
import { topIcons } from '@/shared/constants/secondPage/topIcons.ts';
import { IconText } from '@/shared/ui/IconText/IconText.tsx';

interface TopContentProps {
  className?: string;
}

export const TopContent: FC<PropsWithChildren<TopContentProps>> = (props) => {
  // consts
  const { className } = props;
  return (
    <div className={clsx(styles.root, className)}>
      {topIcons.map((icon) => (
        <IconText key={icon.text} icon={icon.icon} text={icon.text} />
      ))}
    </div>
  );
};
