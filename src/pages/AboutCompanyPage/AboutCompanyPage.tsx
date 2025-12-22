import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './AboutCompanyPage.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';

interface AboutCompanyPageProps {
  className?: string;
}

export const AboutCompanyPage: FC<PropsWithChildren<AboutCompanyPageProps>> = (
  props,
) => {
  // consts
  const { className } = props;
  return (
    <section className={clsx(styles.root, className)}>
      <div>
        <div>
          <Text weight={400} size={'56px'}>
            О компании
            <br />
            "Дачный проект"
          </Text>
          <div className={styles.border} />
        </div>
        <div className={styles.content}>
          <Text className={styles.text} weight={400} size={'18px'}>
            Опыт работы более 10 лет! Построенные объекты и довольные клиенты говорят
            сами за себя! Каждому клиенту предлагается экскурсия по уже завершённым
            проектам — вы лично убедитесь в качестве наших работ.
            <br />
            <br />
            Мы сопровождаем клиента на всех этапах — от консультации и проектирования
            до сдачи объекта «под ключ». Используем только проверенные материалы и
            современные технологии строительства. Индивидуальный подход, прозрачность
            в работе и строгое соблюдение сроков — вот что делает нас надёжным
            партнёром в реализации вашего проекта.
            <br />
            <br />
            Нам доверяют семьи, бизнес и застройщики — потому что мы строим, как для
            себя!
            <br />
            <br />
            Участникам СВО предоставляем скидки.
          </Text>
          <video src={'https://vksport.vkvideo.ru/video-16824047_456254517'} />
        </div>
      </div>
    </section>
  );
};
