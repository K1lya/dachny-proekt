import styles from './WorksPage.module.css';
import { WorkCard } from '@/shared/ui/WorkCard/WorkCard.tsx';
import { works } from '@/shared/constants/worksPage/works.ts';

export const WorksPage = () => {
  // consts
  return (
    <section className={styles.root}>
      {works.map((work) => (
        <WorkCard key={work.title} {...work} />
      ))}
    </section>
  );
};
