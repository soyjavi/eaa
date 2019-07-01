import fs from 'fs';
import showdown from 'showdown';

import { authors, posts } from '../../store';
import { cache, render } from '../modules';

const converter = new showdown.Converter();

export default (req, res) => {
  const { params: { postUri } } = req;
  const keyCache = `post:${postUri}`;
  let html = cache.get(keyCache);

  if (!html) {
    const post = posts.find(({ uri }) => uri === postUri);
    if (!post) throw new Error(`/${postUri} is not a valid url.`);

    const author = authors[post.author];
    const uriFile = `posts/${post.uri}.md`;

    if (!fs.existsSync(uriFile)) throw new Error(`${uriFile} could not read correctly.`);
    html = render('index', {
      role: 'post',
      main: render('post', {
        // ...post, @TODO: Babel config
        title: post.title,
        summary: post.summary,
        date: post.date,
        author: author.name,
        avatar: author.avatar || '',
        markdown: converter.makeHtml(fs.readFileSync(uriFile, 'utf8')),
      }),
    });
  }

  cache.set(keyCache, html);

  res.send(html);
};
