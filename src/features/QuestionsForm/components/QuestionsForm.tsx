import type { FC, PropsWithChildren, ReactNode } from 'react';
import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import ReCAPTCHA from 'react-google-recaptcha';
import { createPortal } from 'react-dom';

import styles from './QuestionsForm.module.css';
import { Text } from '@/shared/ui/Text/Text';
import { useQuestionsFormModal } from '@/features/QuestionsForm/context/QuestionsFormContext.tsx';
import { Button } from '@/shared/ui/Button/Button.tsx';

interface QuestionsFormProps {
  children: ReactNode;
}

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  message: string;
};

const initialState: FormState = {
  fullName: '',
  phone: '',
  email: '',
  message: '',
};

const fakeSend = async (payload: unknown) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  await new Promise((r) => setTimeout(r, 900));
  if (!res.ok) throw new Error('Send failed');
  return res.json();
};

const HouseSvg = () => (
  <svg
    width='63'
    height='41'
    viewBox='0 0 63 41'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M10.5 23.5V38.5H54.5V7L10.5 23.5Z' fill='white' />
    <rect x='8.92188' y='14.957' width='3.92307' height='25.2548' fill='#C6AB83' />
    <path
      d='M62.125 2.45312L62.125 6.3762L3.03354 29.1791L3.03354 25.256L62.125 2.45312Z'
      fill='#C6AB83'
    />
    <rect x='52.0781' width='3.92307' height='37.024' fill='#C6AB83' />
    <rect x='30' y='21' width='4' height='19' fill='#C6AB83' />
    <rect x='41' y='21' width='4' height='19' fill='#C6AB83' />
    <rect
      x='43'
      y='21'
      width='4'
      height='13'
      transform='rotate(90 43 21)'
      fill='#C6AB83'
    />
    <rect
      x='62.125'
      y='36.2891'
      width='3.92308'
      height='58.3557'
      transform='rotate(90 62.125 36.2891)'
      fill='#C6AB83'
    />
    <path
      d='M19.2183 3.1875L19.2187 7.21068L12.5986 9.93028L12.5981 5.90711L19.2183 3.1875Z'
      fill='#C6AB83'
    />
    <path
      d='M2.54735 11.5234L2.54688 15.5466L9.16706 18.2662L9.16753 14.243L2.54735 11.5234Z'
      fill='#C6AB83'
    />
    <rect x='8.92188' width='3.92307' height='37.024' fill='#C6AB83' />
    <path
      d='M8.29517 6.78909C8.37318 7.02648 8.24284 7.28068 8.00454 7.35588C4.86941 8.34523 1.93581 6.84103 0.909382 3.71783C0.831367 3.48045 0.961713 3.22624 1.2 3.15104C4.33514 2.16169 7.26874 3.66589 8.29517 6.78909Z'
      fill='#C6AB83'
    />
    <path
      d='M13.9001 16.8438C13.8221 17.0812 13.9525 17.3354 14.1908 17.4106C17.3259 18.3999 20.2595 16.8957 21.2859 13.7725C21.3639 13.5351 21.2336 13.2809 20.9953 13.2057C17.8602 12.2164 14.9266 13.7206 13.9001 16.8438Z'
      fill='#C6AB83'
    />
  </svg>
);

export const QuestionsForm: FC<PropsWithChildren<QuestionsFormProps>> = (props) => {
  const { children } = props;
  const { isOpen, close } = useQuestionsFormModal();

  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
  const shouldShowCaptcha = Boolean(siteKey);

  const isValid = useMemo(() => {
    const requiredOk =
      form.fullName.trim().length > 0 &&
      form.phone.trim().length > 0 &&
      form.message.trim().length > 0;

    const captchaOk = shouldShowCaptcha ? Boolean(captchaToken) : true;
    return requiredOk && captchaOk;
  }, [form.fullName, form.phone, form.message, captchaToken, shouldShowCaptcha]);

  const onBackdropClick = () => {
    if (!isOpen) return;
    if (isSubmitting) return;
    close();
  };

  const onCloseClick = () => {
    if (!isOpen) return;
    if (isSubmitting) return;
    close();
  };

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        captchaToken,
        createdAt: new Date().toISOString(),
      };

      await fakeSend(payload);

      setForm(initialState);
      setCaptchaToken(null);
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalMarkup = (
    <>
      <div
        className={clsx(
          styles.backdrop,
          isOpen ? styles.backdropOpen : styles.backdropClosed,
        )}
        onPointerDown={onBackdropClick}
        aria-hidden={!isOpen}
      />

      <div
        className={clsx(
          styles.modal,
          isOpen ? styles.modalOpen : styles.modalClosed,
        )}
        role='dialog'
        aria-modal='true'
        aria-hidden={!isOpen}
      >
        <div className={styles.card} onPointerDown={(e) => e.stopPropagation()}>
          {/* ВОЛНА (SVG) */}
          <div className={styles.wave} aria-hidden='true'>
            <svg
              className={styles.waveSvg}
              viewBox='0 0 400 56'
              preserveAspectRatio='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {/* Заливка формы */}
              <path
                d='
                  M0,56
                  H400
                  V24
                  C400,18 395,14 389,14
                  H270
                  C252,14 246,6 200,6
                  C154,6 148,14 130,14
                  H11
                  C5,14 0,18 0,24
                  V56
                  Z
                '
                fill='#ffffff'
              />
              {/* ТОЛЬКО верхняя линия (без боков/низа) */}
              <path
                d='
                  M0,24
                  C0,18 5,14 11,14
                  H130
                  C148,14 154,6 200,6
                  C246,6 252,14 270,14
                  H389
                  C395,14 400,18 400,24
                '
                fill='none'
                stroke='#D8C3A5'
                strokeWidth='1'
                strokeLinejoin='round'
                strokeLinecap='round'
              />
            </svg>
          </div>

          {/* Домик */}
          <div className={styles.houseWrap} aria-hidden='true'>
            <HouseSvg />
          </div>

          <button
            type='button'
            className={clsx(
              styles.closeBtn,
              isSubmitting && styles.closeBtnDisabled,
            )}
            onClick={onCloseClick}
            aria-label='Закрыть'
          >
            ×
          </button>

          <div className={styles.header}>
            <Text size={'24px'} weight={700} className={styles.title}>
              Остались вопросы?
            </Text>
          </div>

          <div className={styles.subheader}>
            <Text size={'16px'} color={'#000000'} weight={400}>
              Напишите нам и наши специалисты помогут получить исчерпывающую
              информацию в самое короткое время
            </Text>
          </div>

          <form className={styles.form} onSubmit={onSubmit}>
            <label className={styles.field}>
              <input
                className={styles.input}
                value={form.fullName}
                onChange={onChange('fullName')}
                placeholder='Ваши ФИО *'
                disabled={isSubmitting}
              />
            </label>

            <label className={styles.field}>
              <input
                className={styles.input}
                value={form.phone}
                onChange={onChange('phone')}
                placeholder='Телефон *'
                disabled={isSubmitting}
              />
            </label>

            <label className={styles.field}>
              <input
                className={styles.input}
                value={form.email}
                onChange={onChange('email')}
                placeholder='E-mail'
                disabled={isSubmitting}
              />
            </label>

            <label className={styles.field}>
              <textarea
                className={clsx(styles.input, styles.textarea)}
                value={form.message}
                onChange={onChange('message')}
                placeholder='Сообщение *'
                disabled={isSubmitting}
              />
            </label>

            <div className={styles.note}>
              <Text color={'#000000'} size={'16px'}>
                <Text color={'RED'}>*</Text> - обязательные для заполнения поля
              </Text>
            </div>

            {shouldShowCaptcha && (
              <div className={styles.captcha}>
                <ReCAPTCHA
                  sitekey={siteKey!}
                  onChange={(token: string | null) => setCaptchaToken(token)}
                />
              </div>
            )}

            <div className={styles.consent}>
              <Text size={'16px'} weight={400} color={'#000000'}>
                Нажимая на кнопку "Отправить заявку", я подтверждаю{' '}
                <Text color={'#7B6A52'} size={'16px'} weight={400}>
                  согласие на обработку персональных данных
                </Text>
              </Text>
            </div>

            <Button
              type='submit'
              width={'100%'}
              fontSize={'16px'}
              weight={700}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <span className={styles.submitInner}>
                  <span className={styles.loader} />
                  <Text>Отправка…</Text>
                </span>
              ) : (
                'ОТПРАВИТЬ ЗАЯВКУ'
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );

  return (
    <>
      {children}
      {typeof document !== 'undefined'
        ? createPortal(modalMarkup, document.body)
        : null}
    </>
  );
};
