export default {
  theme: () => {
    const root = document.documentElement;
    let bg = '#111';
    let bgOpacity = 'rgba(16,16,16,0.85)';
    let color = 'white';
    let colorSkeleton = '#222';

    if (root.style.getPropertyValue('--bg-color') === bg) {
      bg = 'white';
      bgOpacity = 'rgba(255,255,255,0.85)';
      color = 'black';
      colorSkeleton = '#ddd';
    }

    root.style.setProperty('--bg-color', bg);
    root.style.setProperty('--bg-opacity', bgOpacity);
    root.style.setProperty('--color', color);
    root.style.setProperty('--color-skeleton', colorSkeleton);
  },
};
