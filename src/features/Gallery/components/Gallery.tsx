/* eslint-disable react/no-array-index-key */
import React, { useLayoutEffect, useMemo, useReducer, useRef } from 'react';
import styles from './Gallery.module.css';
import { IconButton } from '@/shared/ui/IconButton/IconButton.tsx';
import ArrowLeft from '@/shared/assets/icons/arrowLeft.svg?react';
import ArrowRight from '@/shared/assets/icons/arrowRight.svg?react';
import ArrowLeftActive from '@/shared/assets/icons/arrowLeftActive.svg?react';
import ArrowRightActive from '@/shared/assets/icons/arrowRightActive.svg?react';
import clsx from 'clsx';

const imageModules = import.meta.glob(
  '@/shared/assets/images/gallery/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, as: 'url' },
);

const HEIGHT_VARIANTS = [190, 230, 270, 310, 350];
const MAX_COLUMN_HEIGHT = 620;
const VERTICAL_GAP = 22;
const BASE_COLUMN_WIDTH = 220;
const WIDTH_MULTIPLIERS = [1, 1, 1.5, 2, 2.5, 3];

const MOBILE_MAX_ITEM_HEIGHT = 150;
const MOBILE_MAX_ITEM_WIDTH = 100;
const MOBILE_HEIGHT_VARIANTS = [70, 90, 110, 130, 150];
const MOBILE_VERTICAL_GAP = 12;
const MOBILE_MAX_COLUMN_HEIGHT = 320;

type ImgItem = { src: string; height: number };
type ColumnData = { images: ImgItem[]; width: number };

export type GalleryItem = {
  key?: React.Key;
  node: React.ReactNode;
};

type Props = {
  items?: GalleryItem[];

  centered?: boolean;
  singleCentered?: boolean;

  scrollStepRatio?: number;
  gap?: number;
  rowItemsWidth?: string;

  isMobile?: boolean;

  mobileGallery?: boolean;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const pickVariantByIndex = (index: number, variants: number[]) => {
  const x = (index * 9301 + 49297) % 233280;
  const r = x / 233280;
  return variants[Math.floor(r * variants.length)];
};

const fillColumnHeightPreserveVariety = (
  images: ImgItem[],
  targetHeight: number,
  gap: number,
  capHeight: number,
): ImgItem[] => {
  if (images.length === 0) return images;

  const totalHeights = images.reduce((s, i) => s + i.height, 0);
  const totalGaps = gap * (images.length - 1);
  let leftover = targetHeight - (totalHeights + totalGaps);

  if (leftover <= 0) return images;

  const result = images.map((i) => ({ ...i }));

  for (let idx = result.length - 1; idx >= 0 && leftover > 0; idx -= 1) {
    const current = result[idx].height;
    const canAdd = Math.max(0, capHeight - current);
    if (canAdd <= 0) continue;

    const add = Math.min(canAdd, leftover);
    result[idx].height = current + add;
    leftover -= add;
  }

  return result;
};

export const Gallery = ({
  items,
  centered = false,
  singleCentered = false,
  scrollStepRatio = 0.8,
  gap = 32,
  rowItemsWidth,
  isMobile = false,
  mobileGallery = false,
}: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  if (items !== undefined) {
    if (mobileGallery && items.length) {
      return (
        <div className={styles.mobileGalleryWrapper} ref={scrollRef}>
          <div className={styles.mobileGalleryTrack} style={{ gap: `${gap}px` }}>
            {items.map((it, index) => {
              const h = pickVariantByIndex(index, MOBILE_HEIGHT_VARIANTS);
              return (
                <div
                  key={it.key ?? index}
                  className={styles.mobileGalleryItem}
                  style={{ height: `${h}px` }}
                >
                  {it.node}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    const isSingleCentered = singleCentered === true;
    const isCenteredMode = centered === true || isSingleCentered;

    if (isCenteredMode) {
      const n = items.length;

      const maxStart = isSingleCentered ? Math.max(0, n - 1) : Math.max(0, n - 2);

      const getInitialIndex = (len: number) => {
        if (len <= 0) return 0;

        if (isSingleCentered) {
          return clamp(Math.floor((len - 1) / 2), 0, Math.max(0, len - 1));
        }

        if (len < 2) return 0;
        return clamp(Math.floor((len - 2) / 2), 0, Math.max(0, len - 2));
      };

      type CenterState = { activeStart: number; measured: boolean };
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

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dimsRef = useRef({ wrapperW: 0, itemW: 0 });
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [, forceRerender] = useReducer((x: number) => x + 1, 0);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useLayoutEffect(() => {
        const wrapper = scrollRef.current;
        if (!wrapper) return;

        const firstItem = wrapper.querySelector<HTMLElement>(
          '[data-gallery-item="center"]',
        );
        if (!firstItem) return;

        const measure = () => {
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

        const ro = new ResizeObserver(() => measure());
        ro.observe(wrapper);

        return () => ro.disconnect();
      }, [n]);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useLayoutEffect(() => {
        dispatch({ type: 'resetToMiddle', len: n });
        forceRerender();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [n, isSingleCentered]);

      const goPrev = () => {
        if (maxStart <= 0) return;
        dispatch({
          type: 'setActiveStart',
          value: clamp(state.activeStart - 1, 0, maxStart),
        });
      };

      const goNext = () => {
        if (maxStart <= 0) return;
        dispatch({
          type: 'setActiveStart',
          value: clamp(state.activeStart + 1, 0, maxStart),
        });
      };

      const translateX = (() => {
        if (n <= 0) return 0;

        const { itemW, wrapperW } = dimsRef.current;
        if (!itemW || !wrapperW) return 0;

        const visibleW = isSingleCentered ? itemW : itemW * 2 + gap;
        const centerOffset = (wrapperW - visibleW) / 2;

        return centerOffset - state.activeStart * (itemW + gap);
      })();

      if (isMobile && items.length) {
        return (
          <div className={styles.mobileContainer} style={{ gap: `${gap}px` }}>
            {items.map((el) => el.node)}
          </div>
        );
      }

      return (
        <div className={styles.section}>
          <div className={styles.header}>
            <div
              className={clsx(styles.controls, isMobile && styles.controlsMobile)}
            >
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
                const isCenter = isSingleCentered
                  ? index === state.activeStart
                  : index === state.activeStart || index === state.activeStart + 1;

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
          <div className={clsx(styles.controls, isMobile && styles.controlsMobile)}>
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const baseImages: ImgItem[] = useMemo(
    () =>
      Object.values(imageModules).map((src, index) => ({
        src,
        height: mobileGallery
          ? pickVariantByIndex(index, MOBILE_HEIGHT_VARIANTS)
          : pickVariantByIndex(index, HEIGHT_VARIANTS),
      })),
    [mobileGallery],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const columns: ColumnData[] = useMemo(() => {
    if (!baseImages.length) return [];

    const maxColumnH = mobileGallery ? MOBILE_MAX_COLUMN_HEIGHT : MAX_COLUMN_HEIGHT;
    const gapV = mobileGallery ? MOBILE_VERTICAL_GAP : VERTICAL_GAP;
    const baseW = mobileGallery ? MOBILE_MAX_ITEM_WIDTH : BASE_COLUMN_WIDTH;
    const multipliers = mobileGallery ? [1] : WIDTH_MULTIPLIERS;

    const cols: ImgItem[][] = [[]];
    const heights: number[] = [0];
    let currentCol = 0;

    baseImages.forEach((img) => {
      const col = cols[currentCol];
      const extraGap = col.length > 0 ? gapV : 0;
      const nextHeight = heights[currentCol] + extraGap + img.height;

      if (col.length === 0 || nextHeight <= maxColumnH) {
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
          WIDTH_MULTIPLIERS[Math.floor(Math.random() * WIDTH_MULTIPLIERS.length)];
        return { images: [], width: BASE_COLUMN_WIDTH * multiplier };
      }

      if (!mobileGallery) {
        // Обычный режим: дотягиваем последнюю карточку
        const totalContentHeight =
          col.reduce((sum, img) => sum + img.height, 0) + gapV * (col.length - 1);

        const leftover = maxColumnH - totalContentHeight;
        if (leftover > 0) {
          col[col.length - 1] = {
            ...col[col.length - 1],
            height: col[col.length - 1].height + leftover,
          };
        }
      } else {
        // mobileGallery: заполняем колонку, но не превращаем всё в одинаковые плитки
        const filled = fillColumnHeightPreserveVariety(
          col,
          maxColumnH,
          gapV,
          MOBILE_MAX_ITEM_HEIGHT,
        );
        col.splice(0, col.length, ...filled);
      }

      const multiplier = multipliers[0] ?? 1;
      const width = baseW * multiplier;

      return { images: col, width };
    });

    return result;
  }, [baseImages, mobileGallery]);

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
    <div className={clsx(styles.section, mobileGallery && styles.sectionMobile)}>
      {!mobileGallery && (
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
      )}

      <div
        className={mobileGallery ? styles.wrapperMobile : styles.wrapper}
        ref={scrollRef}
      >
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
                  style={{
                    height: `${
                      mobileGallery
                        ? Math.min(img.height, MOBILE_MAX_ITEM_HEIGHT)
                        : img.height
                    }px`,
                  }}
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
