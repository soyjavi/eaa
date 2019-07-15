import Storage from 'vanilla-storage';
import { C, render } from '../common';

const { STORE } = C;

export default (req, res) => {
  const posts = new Storage(STORE.POSTS);
  const articles = new Storage(STORE.CRONS);
  articles.get('articles');

  res.send(render('index', {
    role: 'admin',
    main: render('posts', {
      public: posts.get('public').value,
      private: posts.get('private').value,
      articles: articles.value,
    }),
  }));
};
