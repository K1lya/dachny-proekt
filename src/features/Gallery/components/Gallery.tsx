/* eslint-disable react/no-array-index-key */
import { useMemo, useRef } from 'react';
import styles from './Gallery.module.css';
import { IconButton } from '@/shared/ui/IconButton/IconButton.tsx';
import ArrowLeft from '@/shared/assets/icons/arrowLeft.svg?react';
import ArrowRight from '@/shared/assets/icons/arrowRight.svg?react';
import ArrowLeftActive from '@/shared/assets/icons/arrowLeftActive.svg?react';
import ArrowRightActive from '@/shared/assets/icons/arrowRightActive.svg?react';

const imageModules = import.meta.glob(
  '@/shared/assets/images/gallery/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, as: 'url' },
);

// Базовые высоты карточек (px)
const HEIGHT_VARIANTS = [190, 230, 270, 310, 350];

// Целевая высота колонки (контент), px
const MAX_COLUMN_HEIGHT = 620;

// Отступ между карточками в колонке (должен совпадать с CSS)
const VERTICAL_GAP = 22;

// Базовая ширина и множители для колонок
const BASE_COLUMN_WIDTH = 220; // условная «узкая» колонка
const WIDTH_MULTIPLIERS = [1, 1, 1.5, 2, 2.5, 3];
// будут колонки: 220, 330, 440, 550, 660 и т.д.

type ImgItem = {
  src: string;
  height: number;
};

type ColumnData = {
  images: ImgItem[];
  width: number;
};

export const Gallery = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const baseImages: ImgItem[] = useMemo(
    () =>
      Object.values(imageModules).map((src) => ({
        src,
        // eslint-disable-next-line react-hooks/purity
        height: HEIGHT_VARIANTS[Math.floor(Math.random() * HEIGHT_VARIANTS.length)],
      })),
    [],
  );

  const columns: ColumnData[] = useMemo(() => {
    if (!baseImages.length) return [];

    const cols: ImgItem[][] = [[]];
    const heights: number[] = [0];
    let currentCol = 0;

    baseImages.forEach((img) => {
      const col = cols[currentCol];
      const extraGap = col.length > 0 ? VERTICAL_GAP : 0;
      const nextHeight = heights[currentCol] + extraGap + img.height;

      if (col.length === 0 || nextHeight <= MAX_COLUMN_HEIGHT) {
        col.push({ ...img });
        heights[currentCol] = heights[currentCol] + extraGap + img.height;
      } else {
        currentCol += 1;
        cols[currentCol] = [{ ...img }];
        heights[currentCol] = img.height;
      }
    });

    // Выравниваем высоту колонок и задаём ширину
    const result: ColumnData[] = cols.map((col) => {
      if (!col.length) {
        const multiplier =
          // eslint-disable-next-line react-hooks/purity
          WIDTH_MULTIPLIERS[Math.floor(Math.random() * WIDTH_MULTIPLIERS.length)];
        return { images: [], width: BASE_COLUMN_WIDTH * multiplier };
      }

      const totalContentHeight =
        col.reduce((sum, img) => sum + img.height, 0) +
        VERTICAL_GAP * (col.length - 1);

      const leftover = MAX_COLUMN_HEIGHT - totalContentHeight;
      if (leftover > 0) {
        col[col.length - 1] = {
          ...col[col.length - 1],
          height: col[col.length - 1].height + leftover,
        };
      }

      const multiplier =
        // eslint-disable-next-line react-hooks/purity
        WIDTH_MULTIPLIERS[Math.floor(Math.random() * WIDTH_MULTIPLIERS.length)];
      const width = BASE_COLUMN_WIDTH * multiplier;

      return { images: col, width };
    });

    return result;
  }, [baseImages]);

  const handleScroll = (direction: 'left' | 'right') => {
    const node = scrollRef.current;
    if (!node) return;

    const step = node.clientWidth * 0.8;
    node.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.controls}>
          <IconButton
            icon={<ArrowLeft />}
            hoverIcon={<ArrowLeftActive />}
            onClick={() => handleScroll('left')}
          />
          <IconButton
            icon={<ArrowRight />}
            hoverIcon={<ArrowRightActive />}
            onClick={() => handleScroll('right')}
          />
        </div>
      </div>

      <div className={styles.wrapper} ref={scrollRef}>
        <div className={styles.track}>
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className={styles.column}
              style={{ width: `${column.width}px` }}
            >
              {column.images.map((img) => (
                <div
                  key={img.src}
                  className={styles.item}
                  style={{ height: `${img.height}px` }}
                >
                  <img
                    src={img.src}
                    alt=''
                    className={styles.image}
                    loading='lazy'
                    decoding='async'
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
