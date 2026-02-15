import clsx from 'clsx';
import styles from './AboutCompanyPage.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import video from '@/shared/assets/video/sample-5s.mp4';
import { VideoPlayer } from '@/shared/ui/VideoPlayer/VideoPlayer.tsx';
import poster from '@/shared/assets/images/videoPoster.png';
import { EView, useView } from '@/shared/hooks/useView.ts';

export const AboutCompanyPage = () => {
  const view = useView();
  return (
    <section
      className={clsx(styles.root, {
        [styles.rootTablet]: view === EView.TABLET,
        [styles.rootMobile]: view === EView.MOBILE,
      })}
    >
      <div style={{ width: view === EView.DESC ? 'auto' : '100%' }}>
        <div>
          <Text
            weight={400}
            size={
              view === EView.DESC ? '56px' : view === EView.MOBILE ? '24px' : '36px'
            }
          >
            О компании
            {view === EView.DESC || view === EView.MOBILE ? <br /> : ' '}
            "Дачный проект"
          </Text>
          <div
            className={clsx(styles.border, {
              [styles.borderTablet]: view === EView.TABLET,
              [styles.borderMobile]: view === EView.MOBILE,
            })}
          />
        </div>
        <div
          className={clsx(styles.content, {
            [styles.contentTablet]: view === EView.TABLET,
            [styles.contentMobile]: view === EView.MOBILE,
          })}
        >
          <Text
            className={clsx(styles.text, {
              [styles.textTablet]: view === EView.TABLET,
            })}
            weight={400}
            size={view === EView.DESC ? '18px' : '15px'}
          >
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
          <VideoPlayer src={video} poster={poster} />
        </div>
      </div>
    </section>
  );
};
