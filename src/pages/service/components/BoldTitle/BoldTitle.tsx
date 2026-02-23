import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './BoldTitle.module.css';
import { EView, useView } from '@/shared/hooks/useView.ts';
import { Text } from '@/shared/ui/Text/Text.tsx';

export interface IBoldTitleProps {
  text: string;
}

export const BoldTitle: FC<PropsWithChildren<IBoldTitleProps>> = (props) => {
  // consts
  const { text } = props;
  const view = useView();
  const size =
    view === EView.TABLET ? '36px' : view === EView.MOBILE ? '18px' : '44px';
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
      <Text size={size} weight={700} color={'#121212'}>
        {text}
      </Text>
    </div>
  );
};
