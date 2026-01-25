import {
  type FC,
  type PropsWithChildren,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import styles from './NavigationBar.module.css';
import Logo from '@/shared/assets/logo/logo.svg?react';
import LogoTablet from '@/shared/assets/logo/logoTablet.svg?react';
import LogoMobile from '@/shared/assets/logo/logoMobile.svg?react';
import LogoBottom from '@/shared/assets/logo/logoBottom.svg?react';
import LogoBottomTablet from '@/shared/assets/logo/logoBottomTablet.svg?react';
import LogoBottomMobile from '@/shared/assets/logo/logoBottomMobile.svg?react';
import TelegramIcon from '@/shared/assets/icons/telegram.svg?react';
import TelegramHoveredIcon from '@/shared/assets/icons/telegramHover.svg?react';
import WhatsAppIcon from '@/shared/assets/icons/whatsapp.svg?react';
import WhatsAppHoveredIcon from '@/shared/assets/icons/whatsappHover.svg?react';
import SandwitchIcon from '@/shared/assets/icons/sandwitch.svg?react';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { IconButton } from '@/shared/ui/IconButton/IconButton.tsx';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { LinkButton } from '@/shared/ui/LinkButton/LinkButton.tsx';
import { headerLinks } from '@/shared/constants/headerLinks.ts';
import { EView, useView } from '@/shared/hooks/useView.ts';

interface HeaderProps {
  position?: 'top' | 'bottom';
  className?: string;
}

const getLogo = (position: 'top' | 'bottom', view: EView) => {
  if (position === 'top') {
    switch (view) {
      case EView.DESC:
        return <Logo />;
      case EView.TABLET:
        return <LogoTablet />;
      case EView.MOBILE:
        return <LogoMobile />;
      default:
        return <LogoMobile />;
    }
  } else {
    switch (view) {
      case EView.DESC:
        return <LogoBottom />;
      case EView.TABLET:
        return <LogoBottomTablet />;
      case EView.MOBILE:
        return <LogoBottomMobile />;
      default:
        return <LogoBottomMobile />;
    }
  }
};

export const NavigationBar: FC<PropsWithChildren<HeaderProps>> = (props) => {
  const { className, position = 'top' } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [margin, setMargin] = useState(260);
  const view = useView();

  useLayoutEffect(() => {
    if (ref.current) {
      setMargin(ref.current.getBoundingClientRect().left);
    }
  }, []);

  return (
    <>
      <header
        className={clsx(
          styles.root,
          {
            [styles.rootBottom]: position === 'bottom',
            [styles.rootTablet]: view === EView.TABLET && position === 'bottom',
          },
          className,
        )}
      >
        {view === EView.DESC && (
          <div className={styles.logo} ref={ref}>
            {getLogo(position, view)}
          </div>
        )}
        <div
          className={clsx(styles.content, {
            [styles.contentTablet]: view === EView.TABLET,
          })}
        >
          <div className={styles.topContent}>
            <div
              className={clsx(styles.leftSideOfTopContent, {
                [styles.leftSideOfTopContentTablet]: view === EView.TABLET,
              })}
            >
              {view === EView.TABLET && getLogo(position, view)}
              <div className={styles.address}>
                {view === EView.TABLET && (
                  <Text weight={600} size={'17px'} color={'#EAE7DC'}>
                    +7 960 734 6828
                  </Text>
                )}
                <Text
                  size={
                    view === EView.TABLET
                      ? '12px'
                      : view === EView.MOBILE
                        ? '12px'
                        : '14px'
                  }
                  weight={400}
                  color={position === 'bottom' ? '#FFFFFF' : undefined}
                >
                  г. Владимир, ул. Куйбышева, 16A
                </Text>
                <Text
                  size={
                    view === EView.TABLET
                      ? '12px'
                      : view === EView.MOBILE
                        ? '12px'
                        : '14px'
                  }
                  weight={400}
                  color='#8E8D8A'
                >
                  территория «Мир дерева»
                </Text>
              </div>
            </div>
            <div className={styles.sideOfTopContent}>
              {view === EView.DESC && (
                <Text
                  size='17px'
                  weight={600}
                  className={styles.phone}
                  color={position === 'bottom' ? '#EAE7DC' : undefined}
                >
                  +7 960 734 6828
                </Text>
              )}
              <div className={styles.messengers}>
                <IconButton
                  icon={<TelegramIcon />}
                  hoverIcon={<TelegramHoveredIcon />}
                />
                <IconButton
                  icon={<WhatsAppIcon />}
                  hoverIcon={<WhatsAppHoveredIcon />}
                />
              </div>
              <Button width='180px' weight={500} className={styles.getCall}>
                Заказать звонок
              </Button>
            </div>
          </div>
          <div className={styles.bottomContent}>
            <div
              className={clsx(styles.links, {
                [styles.linksTablet]: view === EView.TABLET,
              })}
            >
              {view !== EView.MOBILE && (
                <Button
                  width={view === EView.TABLET ? '123px' : '217px'}
                  weight={500}
                >
                  <SandwitchIcon style={{ marginRight: '10px' }} />
                  Услуги
                </Button>
              )}
              {headerLinks.map((link) => (
                <LinkButton
                  key={link.name}
                  link={link.link}
                  className={position === 'bottom' ? styles.bottomLink : undefined}
                >
                  {link.name}
                </LinkButton>
              ))}
            </div>
          </div>
        </div>
      </header>
      {position === 'bottom' && (
        <div
          className={clsx(styles.bottomInfo, {
            [styles.bottomInfoTablet]: view === EView.TABLET,
          })}
          style={view === EView.DESC ? { paddingLeft: `${margin}px` } : undefined}
        >
          <Text color={'#8E8D8A'}>© 2025 Дачный Проект</Text>
          <Text color={'#8E8D8A'}>Политика конфиденциальности</Text>
        </div>
      )}
    </>
  );
};
