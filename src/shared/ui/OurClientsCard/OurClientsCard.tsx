import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './OurClientsCard.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';

interface OurClientsCardProps {
  title: string;
  text: string;
  icon: string;
  className?: string;
}

export const OurClientsCard: FC<PropsWithChildren<OurClientsCardProps>> = (
  props,
) => {
  // consts
  const { className } = props;
  return (
    <div className={clsx(styles.root, className)}>
      <img src={props.icon} className={styles.img} />
      <div>
        <Text weight={700} size={'22px'}>
          {props.title}
        </Text>
        <div className={styles.border} />
      </div>
      <Text className={styles.text}>{props.text}</Text>
    </div>
  );
};
