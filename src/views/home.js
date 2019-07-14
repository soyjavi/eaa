import Storage from 'vanilla-storage';

import { C, render } from '../common';

const { STORE } = C;

export default (req, res) => {
  const posts = new Storage(STORE.POSTS);
  const users = new Storage(STORE.USERS);
  let postItems = '';
  let featured = '';

  users.get('admins');
  posts.get('public').value
    // .reverse()
    .forEach((post) => {
      const author = users.findOne({ id: post.author });
      postItems += render('post-item', { ...post, author: author.name });
    });

  posts.get('featured').value
    .slice(0, 2)
    .forEach((post) => {
      const author = users.findOne({ id: post.author });
      featured += render('post-item', { ...post, author: author.name, class: 'featured' });
    });


  res.send(render('index', {
    role: 'home',
    main: render('home', {
      banner: render('banners/banner'),
      bannerSmall: render('banners/banner', { type: 'small' }),
      bannerCourse: render('banners/bannerCourse', { type: 'small' }),
      posts: postItems,
      featured,
    }),
  }));
};
