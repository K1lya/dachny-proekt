import { type FC, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './AlertText.module.css';
import { EView, useView } from '@/shared/hooks/useView.ts';
import { Text } from '@/shared/ui/Text/Text.tsx';

{
  /* eslint-disable max-len */
}

export interface IAlertTextProps {
  text: string;
}

const icon = (
  <svg
    width='35'
    height='38'
    viewBox='0 0 35 38'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='17.5' cy='18.3535' r='17.5' fill='#E98074' />
    <path
      d='M15.8863 21.8537L15.6045 9.8683H19.5484L19.2411 21.8537H15.8863ZM17.5509 28.2305C17.1923 28.2305 16.8423 28.1451 16.5009 27.9744C16.1594 27.8037 15.8777 27.5561 15.6558 27.2317C15.4338 26.9073 15.3228 26.5061 15.3228 26.028C15.3228 25.5329 15.4253 25.1232 15.6302 24.7988C15.8521 24.4744 16.1338 24.2354 16.4753 24.0817C16.8167 23.911 17.1838 23.8256 17.5765 23.8256C18.1399 23.8256 18.6436 24.0134 19.0875 24.389C19.5484 24.7646 19.7789 25.311 19.7789 26.028C19.7789 26.5061 19.668 26.9073 19.446 27.2317C19.2411 27.5561 18.968 27.8037 18.6265 27.9744C18.285 28.1451 17.9265 28.2305 17.5509 28.2305Z'
      fill='white'
    />
  </svg>
);

const mobileIcon = (
  <svg
    width='24'
    height='25'
    viewBox='0 0 24 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='12' cy='12' r='12' fill='#E98074' />
    <path
      d='M10.9854 13.6L10.8084 6.06637H13.2874L13.0942 13.6H10.9854ZM12.0318 17.6083C11.8064 17.6083 11.5864 17.5547 11.3718 17.4473C11.1572 17.34 10.9801 17.1844 10.8406 16.9805C10.7011 16.7766 10.6313 16.5244 10.6313 16.2239C10.6313 15.9127 10.6957 15.6551 10.8245 15.4512C10.964 15.2473 11.1411 15.0971 11.3557 15.0005C11.5703 14.8932 11.8011 14.8395 12.0479 14.8395C12.402 14.8395 12.7186 14.9576 12.9976 15.1937C13.2874 15.4298 13.4323 15.7732 13.4323 16.2239C13.4323 16.5244 13.3625 16.7766 13.223 16.9805C13.0942 17.1844 12.9225 17.34 12.7079 17.4473C12.4933 17.5547 12.2679 17.6083 12.0318 17.6083Z'
      fill='white'
    />
  </svg>
);

export const AlertText: FC<PropsWithChildren<IAlertTextProps>> = (props) => {
  // consts
  const { text } = props;
  const view = useView();
  const size =
    view === EView.TABLET ? '18px' : view === EView.MOBILE ? '12px' : '18px';

  return (
    <div
      className={clsx(
        styles.root,
        {
          [styles.rootMobile]: view === EView.MOBILE,
        },
        'serviceContainer',
      )}
    >
      <div
        className={clsx(styles.icon, {
          [styles.iconMobile]: view === EView.MOBILE,
          [styles.iconTablet]: view === EView.TABLET,
        })}
      >
        {view === EView.MOBILE ? mobileIcon : icon}
      </div>
      <Text size={size} weight={400}>
        {text}
      </Text>
    </div>
  );
};
