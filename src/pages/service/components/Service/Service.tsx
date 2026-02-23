import clsx from 'clsx';
import styles from './Service.module.css';
import { NavigationBar } from '@/widgets/NavigationBar';
import { EView, useView } from '@/shared/hooks/useView.ts';
import { MainTitle } from '@/pages/service/components/MainTitle/MainTitle.tsx';
import { LeftLineText } from '@/pages/service/components/LeftLineText/LeftLineText.tsx';
import { BoldTitle } from '@/pages/service/components/BoldTitle/BoldTitle.tsx';
import { Text } from '@/pages/service/components/Text/Text.tsx';
import { Title } from '@/pages/service/components/Title/Title.tsx';
import { DotsText } from '@/pages/service/components/DotsText/DotsText.tsx';
import { AlertText } from '@/pages/service/components/AlertText/AlertText.tsx';
import { NumberText } from '@/pages/service/components/NumberText/NumberText.tsx';
import { BoxText } from '@/pages/service/components/BoxText/BoxText.tsx';
import { ImageTitleText } from '@/pages/service/components/ImageTitleText/ImageTitleText.tsx';
import { BigImageAndTitle } from '@/pages/service/components/BigImageAndTitle/BigImageAndTitle.tsx';
import { Gallery } from '@/pages/service/components/Gallery/Gallery.tsx';
import { Table } from '@/pages/service/components/Table/Table.tsx';
import { Faq } from '@/pages/service/components/Faq/Faq.tsx';
import { PromoSection } from '@/pages/service/components/PromoSection/PromoSection.tsx';
import { BanksPage } from '@/pages/main/BanksPage';
import { AboutCompanyPage } from '@/pages/main/AboutCompanyPage';
import { useParams } from 'wouter';
import { EComponentName, type EServiceName } from '@/pages/service/types/type.ts';
import { useCallback } from 'react';
import { data } from '@/pages/service/constants/data.ts';

const componentsMap = {
  [EComponentName.alertText]: AlertText,
  [EComponentName.bigImageAndTitle]: BigImageAndTitle,
  [EComponentName.boldTitle]: BoldTitle,
  [EComponentName.boxText]: BoxText,
  [EComponentName.dotsText]: DotsText,
  [EComponentName.faq]: Faq,
  [EComponentName.gallery]: Gallery,
  [EComponentName.imageTitleText]: ImageTitleText,
  [EComponentName.leftLineText]: LeftLineText,
  [EComponentName.mainTitle]: MainTitle,
  [EComponentName.numberText]: NumberText,
  [EComponentName.promoSection]: PromoSection,
  [EComponentName.table]: Table,
  [EComponentName.text]: Text,
  [EComponentName.title]: Title,
};

const Service = () => {
  // consts
  const view = useView();
  const paramsName = useParams()[0] as EServiceName | undefined;

  const getComponents = useCallback(() => {
    if (paramsName) {
      const componentsByParam = data[paramsName];

      //@ts-ignore
      const componentsNamesWithProps = Object.entries(componentsByParam);

      const components = componentsNamesWithProps.map((el) => {
        //@ts-ignore
        const component = componentsMap[el[0]];

        return component(el[1]);
      });

      return <>{components}</>;
    }

    return null;
  }, [paramsName]);

  // @ts-ignore
  return (
    <div className={clsx(styles.root)}>
      <div
        className={clsx(styles.navigation, {
          [styles.navigationTablet]: view === EView.TABLET,
          [styles.navigationMobile]: view === EView.MOBILE,
        })}
      >
        <NavigationBar />
      </div>
      {Boolean(paramsName) && (
        <div
          className={clsx(styles.content, {
            [styles.contentTablet]: view === EView.TABLET,
            [styles.contentMobile]: view === EView.MOBILE,
          })}
        >
          {getComponents()}
        </div>
      )}
      <BanksPage isService />
      <AboutCompanyPage />
      <NavigationBar position={'bottom'} />
    </div>
  );
};

export default Service;
