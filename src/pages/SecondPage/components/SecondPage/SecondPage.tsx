import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './SecondPage.module.css';
import { TopContent } from '../TopContent/TopContent.tsx';
import { BottomContent } from '../BottomContent/BottomContent.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';

interface SecondPageProps {
  className?: string;
}

export const SecondPage: FC<PropsWithChildren<SecondPageProps>> = (props) => {
  // consts
  const { className } = props;
  const view = useView();
  return (
    <section className={clsx(styles.root, className)}>
      <div
        className={clsx(styles.content, {
          [styles.contentTablet]: view === EView.TABLET,
        })}
      >
        <TopContent />
        <BottomContent />
      </div>
    </section>
  );
};
