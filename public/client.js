const eaa = {
  events: {
    theme: () => {
      const root = document.documentElement;
      let bg = 'black';
      let color = 'white';
      
      if (root.style.getPropertyValue('--bg-color') === bg) {
        bg = 'white';
        color = 'black';
      }
      
      root.style.setProperty('--bg-color', bg);
      root.style.setProperty('--bg-color-opacity', bg);
      root.style.setProperty('--color', color);
    }
  },
};
