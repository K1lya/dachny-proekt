import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './SecondPage.module.css';
import { TopContent } from '../TopContent/TopContent.tsx';
import { BottomContent } from '../BottomContent/BottomContent.tsx';

interface SecondPageProps {
  className?: string;
}

export const SecondPage: FC<PropsWithChildren<SecondPageProps>> = (props) => {
  // consts
  const { className } = props;
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.content}>
        <TopContent />
        <BottomContent />
      </div>
    </div>
  );
};
