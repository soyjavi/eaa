import { render } from '../common';

export default (req, res) => {
  res.send(render('index', {
    role: 'affiliates',
    main: render('affiliates', {
      banner: render('banners/banner'),
    }),
  }));
};
