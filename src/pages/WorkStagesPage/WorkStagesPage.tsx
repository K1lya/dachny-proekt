import styles from './WorkStagesPage.module.css';
import Image from '@/shared/assets/backgrounds/DachaProject.svg?react';
import { Text } from '@/shared/ui/Text/Text.tsx';
import clsx from 'clsx';
import { EView, useView } from '@/shared/hooks/useView.ts';
import { Button } from '@/shared/ui/Button/Button.tsx';

export const WorkStagesPage = () => {
  const view = useView();
  return (
    <section
      className={clsx(styles.root, { [styles.rootTable]: view === EView.TABLET })}
    >
      <div
        className={clsx(styles.image, {
          [styles.imageTablet]: view === EView.TABLET,
        })}
      >
        <Image />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <Text weight={400} size={'56px'}>
            Этапы работы
          </Text>
          <div className={styles.border} />
        </div>
        <div className={styles.stagesContainer}>
          <div className={styles.stageLine}>
            <div className={styles.stage}>
              <Text weight={400} size={'92px'} color={'#E98074'}>
                1
              </Text>
              <Text
                className={styles.text}
                weight={400}
                size={'16px'}
                color={'#000000'}
              >
                После первичного обращения наш специалист оперативно выезжает на
                объект. На этом этапе проводится визуальный осмотр участка,
                фиксируются особенности местности, коммуникаций и подъездных путей.
                Уточняются пожелания клиента, цели строительства, бюджет и сроки. Это
                позволяет заложить прочную основу для проектирования и сметирования.
              </Text>
            </div>
            <div className={styles.stage}>
              <Text weight={400} size={'92px'} color={'#E98074'}>
                2
              </Text>
              <Text
                className={styles.text}
                weight={400}
                size={'16px'}
                color={'#000000'}
              >
                На основе полученной информации мы подготавливаем техническое задание
                и детальную смету. Все работы и материалы подробно прописываются,
                чтобы у клиента было полное понимание бюджета и этапов строительства.
                После согласования сроков, стоимости и условий, заключается
                официальный договор, обеспечивающий юридические гарантии и
                прозрачность работы.
              </Text>
            </div>
          </div>
          <div className={styles.stageLine}>
            <div className={styles.stage}>
              <Text weight={400} size={'92px'} color={'#E98074'}>
                3
              </Text>
              <Text
                className={styles.text}
                weight={400}
                size={'16px'}
                color={'#000000'}
              >
                На основе полученной информации мы подготавливаем техническое задание
                и детальную смету. Все работы и материалы подробно прописываются,
                чтобы у клиента было полное понимание бюджета и этапов строительства.
                После согласования сроков, стоимости и условий, заключается
                официальный договор, обеспечивающий юридические гарантии и
                прозрачность работы.
              </Text>
            </div>
            <div className={styles.stage}>
              <Text weight={400} size={'92px'} color={'#E98074'}>
                4
              </Text>
              <Text
                className={styles.text}
                weight={400}
                size={'16px'}
                color={'#000000'}
              >
                После первичного обращения наш специалист оперативно выезжает на
                объект. На этом этапе проводится визуальный осмотр участка,
                фиксируются особенности местности, коммуникаций и подъездных путей.
                Уточняются пожелания клиента, цели строительства, бюджет и сроки. Это
                позволяет заложить прочную основу для проектирования и сметирования.
              </Text>
            </div>
          </div>
        </div>
        <Button
          width='322px'
          height='61px'
          fontSize='19px'
          weight={600}
          className={styles.button}
        >
          ОСТАВИТЬ ЗАЯВКУ
        </Button>
      </div>
    </section>
  );
};
