import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './PeopleTalkCard.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';

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
  const { className } = props;
  const view = useView();
  const formatedText =
    props.text.length < (view === EView.MOBILE ? 300 : 501)
      ? props.text
      : props.text.slice(0, view === EView.MOBILE ? 299 : 500) + '...';
  return (
    <div
      className={clsx(
        styles.root,
        { [styles.rootMobile]: view === EView.MOBILE },
        className,
      )}
    >
      <div
        className={clsx(styles.topContainer, {
          [styles.topContainerMobile]: view === EView.MOBILE,
        })}
      >
        <div className={styles.images}>
          <div className={styles.phtCont}>
            <div className={styles.photoContainer}>
              <img
                src={props.photo}
                alt='photo'
                className={clsx(styles.photo, {
                  [styles.photoMobile]: view === EView.MOBILE,
                })}
              />
            </div>
          </div>
          <img
            src={props.image}
            className={clsx(styles.image, {
              [styles.imageMobile]: view === EView.MOBILE,
            })}
          />
        </div>
        <Text
          weight={400}
          size={view === EView.MOBILE ? '12px' : '15px'}
          className={clsx(styles.text, { [styles.rootText]: view === EView.MOBILE })}
        >
          {formatedText}
        </Text>
      </div>
      <div className={styles.bottomContainer}>
        <div
          className={clsx(styles.info, {
            [styles.infoMobile]: view === EView.MOBILE,
          })}
        >
          {view === EView.MOBILE ? null : (
            <img src={props.avatar} height={56} width={56} />
          )}
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
