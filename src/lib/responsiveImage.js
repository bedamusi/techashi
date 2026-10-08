export function unsplashResponsiveProps(source, sizes = '100vw') {
  if (!source?.startsWith('https://images.unsplash.com/')) return {};

  const imageUrl = new URL(source);
  const widths = [480, 800, 1200];
  const srcSet = widths.map((width) => {
    const candidate = new URL(imageUrl);
    candidate.searchParams.set('auto', 'format');
    candidate.searchParams.set('fit', 'crop');
    candidate.searchParams.set('w', String(width));
    candidate.searchParams.set('q', '75');
    return `${candidate.toString()} ${width}w`;
  }).join(', ');

  return { srcSet, sizes };
}
