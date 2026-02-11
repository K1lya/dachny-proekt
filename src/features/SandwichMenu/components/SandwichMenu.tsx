import React from 'react';
import styles from './SandwichMenu.module.css';
import { useSandwichMenuModal } from '../context/SandwichMenuContext.tsx';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { IconButton } from '@/shared/ui/IconButton/IconButton.tsx';
import TelegramIcon from '@/shared/assets/icons/telegram.svg?react';
import TelegramHoveredIcon from '@/shared/assets/icons/telegramHover.svg?react';
import WhatsAppIcon from '@/shared/assets/icons/whatsapp.svg?react';
import WhatsAppHoveredIcon from '@/shared/assets/icons/whatsappHover.svg?react';
import { headerLinks } from '@/shared/constants/headerLinks.ts';
import { LinkButton } from '@/shared/ui/LinkButton/LinkButton.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';

type Props = {
  children: React.ReactNode;
};

export const SandwichMenu = ({ children }: Props) => {
  const { isOpen, close } = useSandwichMenuModal();
  const view = useView();

  return (
    <>
      {children}
      {Boolean(view === EView.MOBILE) && (
        <div
          className={`${styles.sheet} ${isOpen ? styles.sheetOpen : styles.sheetClosed}`}
          aria-hidden={!isOpen}
        >
          <button
            className={styles.closeBtn}
            type='button'
            onClick={close}
            aria-label='Close menu'
          >
            ×
          </button>
          <div className={styles.content}>
            <div className={styles.mainContainer}>
              <div className={styles.links}>
                {headerLinks.map((link) => (
                  <LinkButton
                    key={link.name}
                    link={`#${link.link}`}
                    className={styles.footerMobileLink}
                    onClick={() => close()}
                    noBorder
                  >
                    {link.name}
                  </LinkButton>
                ))}
              </div>
              <div>
                <Button width={'100%'} fontSize={'12px'} className={styles.button}>
                  ЗАКАЗАТЬ ЗВОНОК
                </Button>
                <div className={styles.line}>
                  <Text size={'12px'} weight={600}>
                    +7 960 734 6828
                  </Text>
                  <IconButton
                    icon={<TelegramIcon />}
                    hoverIcon={<TelegramHoveredIcon />}
                  />
                  <IconButton
                    icon={<WhatsAppIcon />}
                    hoverIcon={<WhatsAppHoveredIcon />}
                  />
                </div>
                <Text size={'11px'} weight={400}>
                  г. Владимир, ул. Куйбышева, 16А
                </Text>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
