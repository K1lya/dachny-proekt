import styles from './WorksPage.module.css';
import { works } from '@/shared/constants/worksPage/works.ts';
import { WorkCard } from '@/shared/ui/WorkCard/WorkCard.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';
import clsx from 'clsx';
import { DescInfo } from './components/DescInfo/DescInfo.tsx';
import { TabletInfo } from './components/TabletInfo/TabletInfo.tsx';
import { Button } from '@/shared/ui/Button/Button.tsx';

export const WorksPage = () => {
  // consts
  const view = useView();
  return (
    <section
      className={clsx(styles.root, { [styles.rootTablet]: view === EView.TABLET })}
    >
      {view === EView.DESC && <DescInfo />}
      {view === EView.TABLET && <TabletInfo />}
      <div
        className={clsx(styles.works, {
          [styles.worksTablet]: view === EView.TABLET,
        })}
      >
        {works.map((work) => (
          <WorkCard key={work.title} {...work} view={view} />
        ))}
      </div>
      {view !== EView.DESC && (
        <Button
          width={'219px'}
          weight={600}
          height={'44px'}
          fontSize={'16px'}
          className={styles.buttonTablet}
        >
          ОСТАВИТЬ ЗАЯВКУ
        </Button>
      )}
    </section>
  );
};
