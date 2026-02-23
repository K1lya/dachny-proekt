import styles from './WorksPage.module.css';
import { works } from '@/shared/constants/worksPage/works.ts';
import { WorkCard } from '@/shared/ui/WorkCard/WorkCard.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';
import clsx from 'clsx';
import { DescInfo } from './components/DescInfo/DescInfo.tsx';
import { TabletInfo } from './components/TabletInfo/TabletInfo.tsx';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { MobileInfo } from './components/MobileInfo/MobileInfo.tsx';
import { useQuestionsFormModal } from '@/features/QuestionsForm/context/QuestionsFormContext.tsx';

export const WorksPage = () => {
  // consts
  const view = useView();
  const { toggle } = useQuestionsFormModal();

  const getQuestionsForm = () => {
    toggle();
  };
  return (
    <section
      className={clsx(styles.root, {
        [styles.rootTablet]: view === EView.TABLET,
        [styles.rootMobile]: view === EView.MOBILE,
      })}
    >
      {view === EView.DESC && <DescInfo />}
      {view === EView.TABLET && <TabletInfo />}
      {view === EView.MOBILE && <MobileInfo />}
      <div
        className={clsx(styles.works, {
          [styles.worksTablet]: view === EView.TABLET,
          [styles.worksMobile]: view === EView.MOBILE,
        })}
      >
        {works.map((work) => (
          <WorkCard key={work.title} {...work} view={view} />
        ))}
      </div>
      {view !== EView.DESC && (
        <Button
          width={view === EView.MOBILE ? '100%' : '219px'}
          weight={600}
          height={'44px'}
          fontSize={'16px'}
          className={clsx(styles.buttonTablet, {
            [styles.buttonMobile]: view === EView.MOBILE,
          })}
          onClick={getQuestionsForm}
        >
          ОСТАВИТЬ ЗАЯВКУ
        </Button>
      )}
    </section>
  );
};
