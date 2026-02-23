import type { IAlertTextProps } from '@/pages/service/components/AlertText/AlertText.tsx';
import type { IBigImageAndTitleProps } from '@/pages/service/components/BigImageAndTitle/BigImageAndTitle.tsx';
import type { IBoldTitleProps } from '@/pages/service/components/BoldTitle/BoldTitle.tsx';
import type { IBoxTextProps } from '@/pages/service/components/BoxText/BoxText.tsx';
import type { IDotsTextProps } from '@/pages/service/components/DotsText/DotsText.tsx';
import type { IFaqProps } from '@/pages/service/components/Faq/Faq.tsx';
import type { IGalleryProps } from '@/pages/service/components/Gallery/Gallery.tsx';
import type { IImageTitleTextProps } from '@/pages/service/components/ImageTitleText/ImageTitleText.tsx';
import type { ILeftLineTextProps } from '@/pages/service/components/LeftLineText/LeftLineText.tsx';
import type { IMainTitleProps } from '@/pages/service/components/MainTitle/MainTitle.tsx';
import type { INumberTextProps } from '@/pages/service/components/NumberText/NumberText.tsx';
import type { IPromoSectionProps } from '@/pages/service/components/PromoSection/PromoSection.tsx';
import type { ITableProps } from '@/pages/service/components/Table/Table.tsx';
import type { ITextProps } from '@/pages/service/components/Text/Text.tsx';
import type { ITitleProps } from '@/pages/service/components/Title/Title.tsx';

export enum EServiceName {
  countryHousesConstruction = 'countryHousesConstruction',
  extensionsConstruction = 'extensionsConstruction',
  gazebosConstruction = 'gazebosConstruction',
  reconstruction = 'reconstruction',
}

export enum EComponentName {
  alertText = 'alertText',
  bigImageAndTitle = 'bigImageAndTitle',
  boldTitle = 'boldTitle',
  boxText = 'boxText',
  dotsText = 'dotsText',
  faq = 'faq',
  gallery = 'gallery',
  imageTitleText = 'imageTitleText',
  leftLineText = 'leftLineText',
  mainTitle = 'mainTitle',
  numberText = 'numberText',
  promoSection = 'promoSection',
  table = 'table',
  text = 'text',
  title = 'title',
}

export type TComponentPropsByName = {
  [EComponentName.alertText]: IAlertTextProps;
  [EComponentName.bigImageAndTitle]: IBigImageAndTitleProps;
  [EComponentName.boldTitle]: IBoldTitleProps;
  [EComponentName.boxText]: IBoxTextProps;
  [EComponentName.dotsText]: IDotsTextProps;
  [EComponentName.faq]: IFaqProps;
  [EComponentName.gallery]: IGalleryProps;
  [EComponentName.imageTitleText]: IImageTitleTextProps;
  [EComponentName.leftLineText]: ILeftLineTextProps;
  [EComponentName.mainTitle]: IMainTitleProps;
  [EComponentName.numberText]: INumberTextProps;
  [EComponentName.promoSection]: IPromoSectionProps;
  [EComponentName.table]: ITableProps;
  [EComponentName.text]: ITextProps;
  [EComponentName.title]: ITitleProps;
};

export type TComponentData = Partial<{
  [K in EComponentName]: TComponentPropsByName[K];
}>;

export type TData = Partial<Record<EServiceName, TComponentData>>;
