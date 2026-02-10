import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './BanksPage.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { Gallery } from '@/features/Gallery';
import { banks } from '@/shared/constants/banksPage/banks.ts';
import { EView, useView } from '@/shared/hooks/useView.ts';

interface BanksPageProps {
  className?: string;
}

export const BanksPage: FC<PropsWithChildren<BanksPageProps>> = (props) => {
  // consts
  const { className } = props;
  const view = useView();
  const titleSize =
    view === EView.TABLET ? '32px' : view === EView.MOBILE ? '24px' : '56px';

  const items = banks.map((item) => ({
    key: item,
    node: <img src={item} alt='bank' />,
  }));
  return (
    <section
      id={'mortgage'}
      className={clsx(
        styles.root,
        { [styles.rootMobile]: view === EView.MOBILE },
        className,
      )}
    >
      <div
        className={clsx({
          [styles.titleTablet]: view === EView.TABLET,
        })}
      >
        <div
          className={clsx(styles.text, {
            [styles.textTablet]: view === EView.TABLET,
            [styles.textMobile]: view === EView.MOBILE,
          })}
        >
          <Text weight={400} size={titleSize}>
            Сотрудничаем
            {(view === EView.DESC || view === EView.MOBILE) && <br />}
            {view === EView.TABLET && ' '}с банками
          </Text>
          <div
            className={clsx(styles.border, {
              [styles.borderTablet]: view === EView.TABLET,
              [styles.borderMobile]: view === EView.MOBILE,
            })}
          />
        </div>
      </div>
      <Gallery
        items={items}
        centered
        rowItemsWidth='fit-content'
        gap={view === EView.MOBILE ? 23 : 72}
        isMobile={view === EView.MOBILE}
      />
    </section>
  );
};
