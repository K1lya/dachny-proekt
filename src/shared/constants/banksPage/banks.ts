export const banks = Object.values(
  import.meta.glob('@/shared/assets/icons/banksPage/*.{jpg,jpeg,png,webp,avif}', {
    eager: true,
    as: 'url',
  }),
);
