import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './OurClientsCard.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';

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
  const view = useView();
  return (
    <div
      className={clsx(
        styles.root,
        { [styles.rootMobile]: view === EView.MOBILE },
        className,
      )}
    >
      {view !== EView.MOBILE ? (
        <>
          <img
            src={props.icon}
            className={clsx(styles.img, {
              [styles.imgMobile]: view === EView.MOBILE,
            })}
            alt={props.icon}
          />
          <div>
            <Text weight={700} size={view === EView.MOBILE ? '12px' : '22px'}>
              {props.title}
            </Text>
            {view !== EView.MOBILE && <div className={styles.border} />}
          </div>
        </>
      ) : (
        <div className={styles.titleMobile}>
          <img
            src={props.icon}
            className={clsx(styles.img, {
              [styles.imgMobile]: view === EView.MOBILE,
            })}
            alt={props.icon}
          />
          <Text weight={700} size={view === EView.MOBILE ? '12px' : '22px'}>
            {props.title}
          </Text>
        </div>
      )}
      <Text className={clsx(view === EView.MOBILE && styles.text)}>
        {props.text}
      </Text>
    </div>
  );
};
