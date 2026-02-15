import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './TopContent.module.css';
import { topIcons } from '@/shared/constants/secondPage/topIcons.ts';
import { IconText } from '@/shared/ui/IconText/IconText.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';

interface TopContentProps {
  className?: string;
}

export const TopContent: FC<PropsWithChildren<TopContentProps>> = (props) => {
  // consts
  const { className } = props;
  const view = useView();
  return (
    <div
      className={clsx(
        styles.root,
        { [styles.rootTable]: view === EView.TABLET },
        { [styles.rootMobile]: view === EView.MOBILE },
        className,
      )}
    >
      {topIcons.map((icon) => (
        <IconText
          key={icon.text}
          icon={icon.icon}
          text={icon.text}
          textSize={'12px'}
          className={view === EView.MOBILE ? styles.iconTextMobile : undefined}
        />
      ))}
    </div>
  );
};
