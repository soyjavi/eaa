import { render } from '../common';

export default (req, res) => {
  res.send(render('index', {
    role: 'products',
    main: render('products'),
    dialog: render('dialogCheckout'),
    script: render('scripts/drift'),
  }));
};
