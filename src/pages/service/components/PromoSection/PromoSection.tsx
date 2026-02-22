import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './PromoSection.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';

interface PromoSectionProps {
  data?: string[];
}

export const PromoSection: FC<PropsWithChildren<PromoSectionProps>> = (props) => {
  // consts
  const { data } = props;
  const view = useView();
  return (
    <div
      className={clsx(styles.root, { [styles.rootMobile]: view === EView.MOBILE })}
    >
      {data?.map((el) => (
        <div className={styles.item}>
          <Text size={'18px'}>{el}</Text>
        </div>
      ))}
    </div>
  );
};
