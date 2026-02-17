const rawImages = import.meta.glob('@/pages/service/images/*', {
  eager: true,
  as: 'url',
});

export const imagesMap: Record<string, string> = Object.fromEntries(
  Object.entries(rawImages).map(([path, url]) => {
    const fileName = path.split('/').pop()!;
    return [fileName, url as string];
  }),
);
