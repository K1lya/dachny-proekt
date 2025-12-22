/* eslint-disable react/no-array-index-key */
import React, { useLayoutEffect, useMemo, useReducer, useRef } from 'react';
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

// ===== OLD (не трогаем) =====
const HEIGHT_VARIANTS = [190, 230, 270, 310, 350];
const MAX_COLUMN_HEIGHT = 620;
const VERTICAL_GAP = 22;
const BASE_COLUMN_WIDTH = 220;
const WIDTH_MULTIPLIERS = [1, 1, 1.5, 2, 2.5, 3];

type ImgItem = { src: string; height: number };
type ColumnData = { images: ImgItem[]; width: number };

// ===== NEW =====
export type GalleryItem = {
  key?: React.Key;
  node: React.ReactNode;
};

type Props = {
  /**
   * Если передан items — включаем универсальный режим.
   * Если НЕ передан — поведение 100% старое.
   */
  items?: GalleryItem[];

  /**
   * Новый режим:
   * - true: две карточки по центру (1x), боковые -30% (0.7), листание по 1, с анимацией
   * - false/undefined: простой горизонтальный режим (как раньше в новом режиме)
   */
  centered?: boolean;

  /** Используется в простом новом режиме и в старом режиме (скролл) */
  scrollStepRatio?: number;

  /** Расстояние между айтемами (px) в items-режимах. По умолчанию 32 */
  gap?: number;

  rowItemsWidth?: string;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const Gallery = ({
  items,
  centered = false,
  scrollStepRatio = 0.8,
  gap = 32,
  rowItemsWidth,
}: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ===========================
  // NEW MODE: items передан
  // ===========================
  if (items !== undefined) {
    // ---------- centered mode ----------
    if (centered) {
      const n = items.length;
      const isTiny = n < 2;

      const getInitialIndex = (len: number) => {
        if (len < 2) return 0;
        return clamp(Math.floor((len - 2) / 2), 0, len - 2);
      };

      type CenterState = {
        activeStart: number;
        measured: boolean;
      };

      type Action =
        | { type: 'setActiveStart'; value: number }
        | { type: 'markMeasured' }
        | { type: 'resetToMiddle'; len: number };

      const initialState: CenterState = {
        activeStart: getInitialIndex(n),
        measured: false,
      };

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [state, dispatch] = useReducer(
        (s: CenterState, a: Action): CenterState => {
          switch (a.type) {
            case 'setActiveStart':
              return { ...s, activeStart: a.value };
            case 'markMeasured':
              return { ...s, measured: true };
            case 'resetToMiddle':
              return { activeStart: getInitialIndex(a.len), measured: s.measured };
            default:
              return s;
          }
        },
        initialState,
      );

      // размеры храним в ref, чтобы не зависеть от transform
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dimsRef = useRef({
        wrapperW: 0,
        itemW: 0,
      });

      // форс-рендер (без useState)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [, forceRerender] = useReducer((x: number) => x + 1, 0);

      // измерения + ResizeObserver
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useLayoutEffect(() => {
        const wrapper = scrollRef.current;
        if (!wrapper) return;

        const track = wrapper.querySelector<HTMLElement>(
          '[data-gallery-track="center"]',
        );
        const firstItem = wrapper.querySelector<HTMLElement>(
          '[data-gallery-item="center"]',
        );
        if (!track || !firstItem) return;

        const measure = () => {
          // offsetWidth не учитывает scale(transform)
          const itemW = firstItem.offsetWidth;
          const wrapperW = wrapper.clientWidth;

          const prev = dimsRef.current;
          const changed = prev.itemW !== itemW || prev.wrapperW !== wrapperW;

          dimsRef.current = { itemW, wrapperW };

          if (changed) {
            dispatch({ type: 'markMeasured' });
            forceRerender();
          }
        };

        measure();

        const ro = new ResizeObserver(() => {
          measure();
        });

        ro.observe(wrapper);

        return () => {
          ro.disconnect();
        };
      }, [n]);

      // если длина изменилась — сбросить активную пару в центр
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useLayoutEffect(() => {
        dispatch({ type: 'resetToMiddle', len: n });
        forceRerender();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [n]);

      const goPrev = () => {
        if (isTiny) return;
        dispatch({
          type: 'setActiveStart',
          value: clamp(state.activeStart - 1, 0, n - 2),
        });
      };

      const goNext = () => {
        if (isTiny) return;
        dispatch({
          type: 'setActiveStart',
          value: clamp(state.activeStart + 1, 0, n - 2),
        });
      };

      const translateX = (() => {
        if (isTiny) return 0;

        const { itemW, wrapperW } = dimsRef.current;
        if (!itemW || !wrapperW) return 0;

        const pairW = itemW * 2 + gap;
        const centerOffset = (wrapperW - pairW) / 2;

        // центрируем пару (activeStart, activeStart+1)
        return centerOffset - state.activeStart * (itemW + gap);
      })();

      return (
        <div className={styles.section}>
          <div className={styles.header}>
            <div className={styles.controls}>
              <IconButton
                icon={<ArrowLeft />}
                hoverIcon={<ArrowLeftActive />}
                onClick={goPrev}
              />
              <IconButton
                icon={<ArrowRight />}
                hoverIcon={<ArrowRightActive />}
                onClick={goNext}
              />
            </div>
          </div>

          <div className={styles.wrapperRowCentered} ref={scrollRef}>
            <div
              className={styles.trackRowCentered}
              data-gallery-track='center'
              style={{
                gap: `${gap}px`,
                transform: `translate3d(${translateX}px, 0, 0)`,
              }}
            >
              {items.map((it, index) => {
                const isCenter =
                  !isTiny &&
                  (index === state.activeStart || index === state.activeStart + 1);

                return (
                  <div
                    key={it.key ?? index}
                    className={[
                      styles.rowItemCentered,
                      isCenter || rowItemsWidth
                        ? styles.rowItemCenteredActive
                        : styles.rowItemCenteredSide,
                      state.measured
                        ? styles.rowItemCenteredMeasured
                        : styles.rowItemCenteredPre,
                    ].join(' ')}
                    style={{ width: rowItemsWidth }}
                    data-gallery-item='center'
                  >
                    {it.node}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    // ---------- simple row mode ----------
    const handleScroll = (direction: 'left' | 'right') => {
      const node = scrollRef.current;
      if (!node) return;

      const step = node.clientWidth * scrollStepRatio;
      node.scrollBy({
        left: direction === 'left' ? -step : step,
        behavior: 'smooth',
      });
    };

    return (
      <div className={styles.section}>
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

        <div className={styles.wrapperRow} ref={scrollRef}>
          <div className={styles.trackRow} style={{ gap: `${gap}px` }}>
            {items.map((it, index) => (
              <div key={it.key ?? index} className={styles.rowItem}>
                {it.node}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // OLD MODE: items НЕ передан → ВЕСЬ СТАРЫЙ КОД БЕЗ ИЗМЕНЕНИЙ
  // ============================================================

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const baseImages: ImgItem[] = useMemo(
    () =>
      Object.values(imageModules).map((src) => ({
        src,
        // eslint-disable-next-line react-hooks/purity
        height: HEIGHT_VARIANTS[Math.floor(Math.random() * HEIGHT_VARIANTS.length)],
      })),
    [],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const oldHandleScroll = (direction: 'left' | 'right') => {
    const node = scrollRef.current;
    if (!node) return;

    const step = node.clientWidth * scrollStepRatio;
    node.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.controls}>
          <IconButton
            icon={<ArrowLeft />}
            hoverIcon={<ArrowLeftActive />}
            onClick={() => oldHandleScroll('left')}
          />
          <IconButton
            icon={<ArrowRight />}
            hoverIcon={<ArrowRightActive />}
            onClick={() => oldHandleScroll('right')}
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
    </div>
  );
};
