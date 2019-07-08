import { render } from '../modules';

export default (req, res) => {
  res.send(render('index', {
    role: 'dashboard',
    _script: '<script src="/dashboard.js" defer></script>',
    main: render('dashboard', {
    }),
  }));
};
