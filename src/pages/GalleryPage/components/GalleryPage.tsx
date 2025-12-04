import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './GalleryPage.module.css';
import { Gallery } from '@/features/Gallery';
import { Text } from '@/shared/ui/Text/Text.tsx';

interface GalleryPageProps {
  className?: string;
}

export const GalleryPage: FC<PropsWithChildren<GalleryPageProps>> = (props) => {
  // consts
  const { className } = props;
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.titleContainer}>
        <Text weight={400} size='56px' className={styles.title}>
          Вдохновляйтесь уютом,
          <br /> который мы создаём
        </Text>
      </div>
      <Gallery />
    </div>
  );
};
