import styles from './WorkStagesPage.module.css';
import Image from '@/shared/assets//backgrounds/DachaProject.svg?react';

export const WorkStagesPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <Image />
      </div>
      <div className={styles.content}>
        <div className={styles.content}>123</div>
      </div>
    </div>
  );
};
