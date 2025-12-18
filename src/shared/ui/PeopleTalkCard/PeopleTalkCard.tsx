import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './PeopleTalkCard.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';

interface PeopleTalkCardProps {
  className?: string;
  photo: string;
  image: string;
  avatar: string;
  text: string;
  name: string;
  infoText: string;
}

export const PeopleTalkCard: FC<PropsWithChildren<PeopleTalkCardProps>> = (
  props,
) => {
  // consts
  const formatedText =
    props.text.length < 501 ? props.text : props.text.slice(0, 500) + '...';
  const { className } = props;
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.topContainer}>
        <div className={styles.images}>
          <div className={styles.phtCont}>
            <div className={styles.photoContainer}>
              <img src={props.photo} alt='photo' className={styles.photo} />
            </div>
          </div>
          <img src={props.image} className={styles.image} />
        </div>
        <Text weight={400} size={'15px'} className={styles.text}>
          {formatedText}
        </Text>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.info}>
          <img src={props.avatar} height={56} width={56} />
          <div className={styles.infoTextContainer}>
            <Text weight={700} size='15px'>
              {props.name}
            </Text>
            <Text weight={400} size='15px' color='#8E8D8A'>
              {props.infoText}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
