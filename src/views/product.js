import { render } from '../common';

export default (req, res) => {
  const { params: { product } } = req;

  res.send(render('index', {
    role: 'product',
    main: render(product),
    dialog: render('dialogCheckout'),
    // script: render('scripts/drift'),
  }));
};
