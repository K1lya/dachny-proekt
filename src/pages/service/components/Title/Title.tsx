import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Title.module.css';
import { EView, useView } from '@/shared/hooks/useView.ts';
import { Text } from '@/shared/ui/Text/Text.tsx';

export interface ITitleProps {
  text: string;
}

export const Title: FC<PropsWithChildren<ITitleProps>> = (props) => {
  // consts
  const { text } = props;
  const view = useView();
  const size =
    view === EView.TABLET ? '24px' : view === EView.MOBILE ? '16px' : '36px';
  return (
    <div
      className={clsx(
        styles.root,
        {
          [styles.rootMobile]: view === EView.MOBILE,
          [styles.rootTablet]: view === EView.TABLET,
        },
        'serviceContainer',
      )}
    >
      <Text size={size} weight={500}>
        {text}
      </Text>
    </div>
  );
};
