import { render } from '../modules';

export default (req, res) => {
  res.send(render('index', {
    role: 'products',
    main: render('products'),
    dialog: render('dialogCheckout'),
  }));
};
