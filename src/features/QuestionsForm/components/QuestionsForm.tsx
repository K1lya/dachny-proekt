import type { FC, PropsWithChildren, ReactNode } from 'react';
import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import ReCAPTCHA from 'react-google-recaptcha';

import styles from './QuestionsForm.module.css';
import { Text } from '@/shared/ui/Text/Text';
import { useQuestionsFormModal } from '@/features/QuestionsForm/context/QuestionsFormContext.tsx';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { createPortal } from 'react-dom';

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
        onClick={onBackdropClick}
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
        <div className={styles.card} onClick={(e) => e.stopPropagation()}>
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

            <Button type='submit' width={'100%'} fontSize={'16px'} weight={700}>
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
      {createPortal(modalMarkup, document.body)}
    </>
  );
};
