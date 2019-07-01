import { authors, posts } from '../../store';
import { render } from '../modules';

export default (req, res) => {
  let postItems = '';
  posts
    // .reverse()
    .forEach((post) => {
      const author = authors[post.author];

      postItems += render('post-item', {
        // ...post, @TODO: Babel config
        uri: post.uri,
        title: post.title,
        summary: post.summary,
        thumbnail: post.thumbnail,
        date: post.date,
        author: author.name,
      });
    });

  res.send(render('index', {
    role: 'home',
    main: render('home', {
      posts: postItems,
    }),
  }));
};
