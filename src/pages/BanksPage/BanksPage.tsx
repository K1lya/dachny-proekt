import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './BanksPage.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { Gallery } from '@/features/Gallery';
import { banks } from '@/shared/constants/banksPage/banks.ts';

interface BanksPageProps {
  className?: string;
}

export const BanksPage: FC<PropsWithChildren<BanksPageProps>> = (props) => {
  // consts
  const { className } = props;

  const items = banks.map((item) => ({
    key: item,
    node: <img src={item} alt='bank' />,
  }));
  return (
    <section className={clsx(styles.root, className)}>
      <div className={styles.title}>
        <div className={styles.text}>
          <Text weight={400} size={'56px'}>
            Сотрудничаем
            <br />с банками
          </Text>
          <div className={styles.border} />
        </div>
      </div>
      <Gallery items={items} centered rowItemsWidth='fit-content' gap={72} />
    </section>
  );
};
