import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Header.module.css';
import Logo from '@/shared/assets/logo/logo.svg?react';
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

interface HeaderProps {
  className?: string;
}

export const Header: FC<PropsWithChildren<HeaderProps>> = (props) => {
  // consts
  const { className } = props;

  return (
    <header className={clsx(styles.root, className)}>
      <div className={styles.content}>
        <div className={styles.topContent}>
          <div className={styles.leftSideOfTopContent}>
            <Logo />
            <div className={styles.address}>
              <Text size='14px' weight={400}>
                г. Владимир, ул. Куйбышева, 16A
              </Text>
              <Text size='14px' weight={400} color='#8E8D8A'>
                территория «Мир дерева»
              </Text>
            </div>
          </div>
          <div className={styles.sideOfTopContent}>
            <Text size='17px' weight={600} className={styles.phone}>
              +7 960 734 6828
            </Text>
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
          <div style={{ width: '187.1px' }} />
          <div className={styles.links}>
            <Button width='217px' weight={500}>
              <SandwitchIcon style={{ marginRight: '10px' }} />
              Услуги
            </Button>
            {headerLinks.map((link) => (
              <LinkButton key={link.name} link={link.link}>
                {link.name}
              </LinkButton>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
