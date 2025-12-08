import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './PutBidPage.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { Button } from '@/shared/ui/Button/Button.tsx';

interface PutBidPageProps {
  className?: string;
}

export const PutBidPage: FC<PropsWithChildren<PutBidPageProps>> = (props) => {
  // consts
  const { className } = props;
  return (
    <section className={clsx(styles.root, className)}>
      <div className={styles.image}>
        <div className={styles.content}>
          <div className={styles.text}>
            <Text weight={400} size={'102px'} color={'#FFFFFF'}>
              ОСТАВИТЬ
            </Text>
            <Text weight={400} size={'102px'} color={'#E85A4F'}>
              ЗАЯВКУ
            </Text>
          </div>
          <div className={styles.containerDiv}>
            <div className={styles.container}>
              <Text
                weight={400}
                size={'22px'}
                color={'#FFFFFF'}
                className={styles.contentText}
              >
                Оставьте заявку, мы перезвоним Вам в ближайшее время и всё обсудим
              </Text>
              <Button width={'258px'} weight={600} fontSize={'16px'}>
                ЗАКАЗАТЬ ЗВОНОК
              </Button>
            </div>
            <div className={styles.container}>
              <Text
                weight={400}
                size={'22px'}
                color={'#FFFFFF'}
                className={styles.contentText}
              >
                Либо напишите нам
                <br />в Telegram
              </Text>
              <Button
                width={'258px'}
                weight={600}
                fontSize={'16px'}
                className={styles.button}
              >
                Написать в Telegram
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
