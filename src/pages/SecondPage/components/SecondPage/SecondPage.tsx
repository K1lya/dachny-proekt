import clsx from 'clsx';
import styles from './SecondPage.module.css';
import { TopContent } from '../TopContent/TopContent.tsx';
import { BottomContent } from '../BottomContent/BottomContent.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';

export const SecondPage = () => {
  const view = useView();
  return (
    <section
      className={clsx(styles.root, { [styles.rootMobile]: view === EView.MOBILE })}
    >
      <div
        className={clsx(styles.content, {
          [styles.contentTablet]: view === EView.TABLET,
          [styles.contentMobile]: view === EView.MOBILE,
        })}
      >
        <TopContent />
        <BottomContent />
      </div>
    </section>
  );
};
