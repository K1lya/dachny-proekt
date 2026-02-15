import styles from './WorkStagesPage.module.css';
import Image from '@/shared/assets/backgrounds/DachaProject.svg?react';
import { Text } from '@/shared/ui/Text/Text.tsx';
import clsx from 'clsx';
import { EView, useView } from '@/shared/hooks/useView.ts';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { useEffect, useRef, useState } from 'react';

export const WorkStagesPage = () => {
  const view = useView();
  const isMobile = view === EView.MOBILE;
  const [activeBlock, setActiveBlock] = useState(1);

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index || 0);

          if (entry.isIntersecting && idx) {
            setActiveBlock(idx);
          }
        });
      },
      { threshold: 0.6 },
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={'stages'}
      className={clsx(styles.root, {
        [styles.rootTable]: view === EView.TABLET,
        [styles.rootMobile]: isMobile,
      })}
    >
      {!isMobile && (
        <div
          className={clsx(styles.image, {
            [styles.imageTablet]: view === EView.TABLET,
          })}
        >
          <Image />
        </div>
      )}
      <div className={styles.content}>
        <div className={clsx(styles.title, { [styles.titleMobile]: isMobile })}>
          <Text weight={400} size={isMobile ? '24px' : '56px'}>
            Этапы работы
          </Text>
          <div
            className={clsx(styles.border, { [styles.borderMobile]: isMobile })}
          />
        </div>
        {isMobile && (
          <>
            <div className={styles.mobileContainer}>
              <div
                className={styles.block}
                data-index='1'
                //@ts-ignore
                ref={(el) => (refs.current[0] = el)}
              >
                <Text size={'36px'} color={'#E98074'}>
                  1
                </Text>
                <Text size={'12px'} color={'#000000'} className={styles.textMobile}>
                  После первичного обращения наш специалист оперативно выезжает на
                  объект. На этом этапе проводится визуальный осмотр участка,
                  фиксируются особенности местности, коммуникаций и подъездных путей.
                  Уточняются пожелания клиента, цели строительства, бюджет и сроки.
                  Это позволяет заложить прочную основу для проектирования и
                  сметирования.
                </Text>
              </div>
              <div
                className={styles.block}
                data-index='2'
                //@ts-ignore
                ref={(el) => (refs.current[1] = el)}
              >
                <Text size={'36px'} color={'#E98074'}>
                  2
                </Text>
                <Text size={'12px'} color={'#000000'} className={styles.textMobile}>
                  На основе полученной информации мы подготавливаем техническое
                  задание и детальную смету. Все работы и материалы подробно
                  прописываются, чтобы у клиента было полное понимание бюджета и
                  этапов строительства. После согласования сроков, стоимости и
                  условий, заключается официальный договор, обеспечивающий
                  юридические гарантии и прозрачность работы.
                </Text>
              </div>
              <div
                className={styles.block}
                data-index='3'
                //@ts-ignore
                ref={(el) => (refs.current[2] = el)}
              >
                <Text size={'36px'} color={'#E98074'}>
                  3
                </Text>
                <Text size={'12px'} color={'#000000'} className={styles.textMobile}>
                  На основе полученной информации мы подготавливаем техническое
                  задание и детальную смету. Все работы и материалы подробно
                  прописываются, чтобы у клиента было полное понимание бюджета и
                  этапов строительства. После согласования сроков, стоимости и
                  условий, заключается официальный договор, обеспечивающий
                  юридические гарантии и прозрачность работы.
                </Text>
              </div>
              <div
                className={styles.block}
                data-index='4'
                //@ts-ignore
                ref={(el) => (refs.current[3] = el)}
              >
                <Text size={'36px'} color={'#E98074'}>
                  4
                </Text>
                <Text size={'12px'} color={'#000000'} className={styles.textMobile}>
                  На основе полученной информации мы подготавливаем техническое
                  задание и детальную смету. Все работы и материалы подробно
                  прописываются, чтобы у клиента было полное понимание бюджета и
                  этапов строительства. После согласования сроков, стоимости и
                  условий, заключается официальный договор, обеспечивающий
                  юридические гарантии и прозрачность работы.
                </Text>
              </div>
            </div>
            <div className={styles.numbers}>
              <Text size={'16px'} color={activeBlock === 1 ? '#E98074' : '#8E8D8A'}>
                1
              </Text>
              <Text size={'16px'} color={activeBlock === 2 ? '#E98074' : '#8E8D8A'}>
                2
              </Text>
              <Text size={'16px'} color={activeBlock === 3 ? '#E98074' : '#8E8D8A'}>
                3
              </Text>
              <Text size={'16px'} color={activeBlock === 4 ? '#E98074' : '#8E8D8A'}>
                4
              </Text>
            </div>
          </>
        )}
        {!isMobile && (
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
                  Уточняются пожелания клиента, цели строительства, бюджет и сроки.
                  Это позволяет заложить прочную основу для проектирования и
                  сметирования.
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
                  На основе полученной информации мы подготавливаем техническое
                  задание и детальную смету. Все работы и материалы подробно
                  прописываются, чтобы у клиента было полное понимание бюджета и
                  этапов строительства. После согласования сроков, стоимости и
                  условий, заключается официальный договор, обеспечивающий
                  юридические гарантии и прозрачность работы.
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
                  На основе полученной информации мы подготавливаем техническое
                  задание и детальную смету. Все работы и материалы подробно
                  прописываются, чтобы у клиента было полное понимание бюджета и
                  этапов строительства. После согласования сроков, стоимости и
                  условий, заключается официальный договор, обеспечивающий
                  юридические гарантии и прозрачность работы.
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
                  Уточняются пожелания клиента, цели строительства, бюджет и сроки.
                  Это позволяет заложить прочную основу для проектирования и
                  сметирования.
                </Text>
              </div>
            </div>
          </div>
        )}
        {!isMobile && (
          <Button
            width='322px'
            height='61px'
            fontSize='19px'
            weight={600}
            className={styles.button}
          >
            ОСТАВИТЬ ЗАЯВКУ
          </Button>
        )}
      </div>
    </section>
  );
};
