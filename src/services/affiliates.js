import { render } from '../modules';

export default (req, res) => {
  res.send(render('index', {
    role: 'affiliates',
    main: render('affiliates'),
  }));
};
