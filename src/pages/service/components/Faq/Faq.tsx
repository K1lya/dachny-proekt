import { useMemo, useState } from 'react';
import styles from './Faq.module.css';
import { Text } from '@/shared/ui/Text/Text';
/* eslint-disable */
type Props = {
  data: string[][];
};

const IconClosed = () => (
  <svg
    width='45'
    height='45'
    viewBox='0 0 45 45'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect
      width='45'
      height='45'
      rx='8'
      transform='matrix(-4.37114e-08 1 1 4.37114e-08 1.96701e-06 0)'
      fill='#B2B2B2'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.2386 21.4287L22.4239 26.7549C22.7421 27.0817 23.2579 27.0817 23.5761 26.7549L28.7614 21.4287C29.0795 21.1019 29.0795 20.572 28.7614 20.2451C28.4432 19.9183 27.9273 19.9183 27.6091 20.2451L23 24.9795L18.3909 20.2451C18.0727 19.9183 17.5568 19.9183 17.2386 20.2451C16.9205 20.572 16.9205 21.1019 17.2386 21.4287Z'
      fill='white'
    />
  </svg>
);

const IconOpen = () => (
  <svg
    width='45'
    height='45'
    viewBox='0 0 45 45'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect
      x='1.96701e-06'
      y='45'
      width='45'
      height='45'
      rx='8'
      transform='rotate(-90 1.96701e-06 45)'
      fill='#E85A4F'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.2386 23.5713L22.4239 18.2451C22.7421 17.9183 23.2579 17.9183 23.5761 18.2451L28.7614 23.5713C29.0795 23.8981 29.0795 24.428 28.7614 24.7549C28.4432 25.0817 27.9273 25.0817 27.6091 24.7549L23 20.0205L18.3909 24.7549C18.0727 25.0817 17.5568 25.0817 17.2386 24.7549C16.9205 24.428 16.9205 23.8981 17.2386 23.5713Z'
      fill='white'
    />
  </svg>
);

export const Faq = ({ data }: Props) => {
  const rows = useMemo(
    () => (data ?? []).filter((pair) => Array.isArray(pair) && pair.length >= 2),
    [data],
  );

  const [openIndex, setOpenIndex] = useState<number>(0); // как на скрине: первый открыт

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {rows.map(([q, a], index) => {
          const isOpen = index === openIndex;

          return (
            <div key={`${q}-${index}`} className={styles.item}>
              <button
                type='button'
                className={`${styles.header} ${isOpen ? styles.headerOpen : ''}`}
                onClick={() => toggle(index)}
              >
                <div className={styles.question}>
                  <Text color={'#FFFFFF'}>{q}</Text>
                </div>

                <span
                  className={`${styles.icon} ${isOpen ? styles.iconOpen : styles.iconClosed}`}
                >
                  {isOpen ? <IconOpen /> : <IconClosed />}
                </span>
              </button>

              <div
                className={`${styles.answerWrap} ${isOpen ? styles.answerOpen : styles.answerClosed}`}
              >
                <div className={styles.answerInner}>
                  <Text>{a}</Text>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
