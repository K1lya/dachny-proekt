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

const Service = () => {
  // consts
  const view = useView();

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
      <div
        className={clsx(styles.content, {
          [styles.contentTablet]: view === EView.TABLET,
          [styles.contentMobile]: view === EView.MOBILE,
        })}
      >
        <MainTitle text={'О компании'} />
        <LeftLineText
          text={'Cтроительство деревянных домов.\n' + 'Деревянные дома под ключ'}
        />
        <BoldTitle
          text={
            'Деревянные дома во Владимире и Владимирской области под ключ. Цены на строительство'
          }
        />
        <Text
          text={
            'Строительство деревянных домов становится довольно востребованным во всех регионах.' +
            ' Это происходи за счет большого количества преимуществ этих' +
            ' строений. Прежде всего, деревянные дома привлекают  тем,' +
            ' что являются экологически чистыми.' +
            ' Кроме того, при заказе строительства деревянного дома, можно выбрать' +
            ' один из актуальных способов оформления строения. Однако,' +
            ' этот вид возведения домов имеет свои особенности.\n\n' +
            'Прежде всего, это объясняется особым свойством древесины,' +
            ' которая требует к себе тщательного внимания.' +
            ' Например, деревянные дома обладают свойством' +
            ' усадки, которое представляет собой уменьшение объемов строения за счет испарения влаги.'
          }
        />
        <Title text={'1. Создание проекта деревянного дома и его согласование'} />
        <DotsText
          text={[
            'Осмотр и анализ территории, на которой будет возведен дом.',
            'Измерение всех необходимых параметров.',
            '',
            'Четкое распределение всех объектов.',
          ]}
        />
        <AlertText
          text={
            // eslint-disable-next-line max-len
            'Если пренебречь данными правилами и завершить строительство в один этап, то в дальнейшем вы можете столкнуться с серьезными проблемами.'
          }
        />
        <NumberText
          text={[
            'Для того чтобы создать действительно качественное',
            ' и износостойкое строение, необходимо более внимательно подходить' +
              '  как это вряд ли говорит о высоком профессионализме сотрудников.',
          ]}
        />
        <BoxText
          text={
            // eslint-disable-next-line max-len
            'Для того чтобы создать действительно качественное и износостойкое строение, необходимо более внимательно подходить к выбору строительных материалов. При заказе строительства деревянных домов  в одной из компаний, вы можете воспользоваться услугой, при которой представитель строительной организации сопровождает клиента в магазин и помогает с выбором всей необходимой продукции. Специалисты имеют большой опыт в данном вопросе, поэтому без труда смогут определить качественный товар.'
          }
          title={'Выделенный текст + Заголовок '}
        />
      </div>
    </div>
  );
};

export default Service;
