import fs from 'fs';
import showdown from 'showdown';
import Storage from 'vanilla-storage';

import { C, cache, render } from '../common';

const { STORE } = C;
const converter = new showdown.Converter();

export default (req, res) => {
  const { params: { postUri } } = req;
  const keyCache = `post:${postUri}`;
  let html = cache.get(keyCache);

  if (!html) {
    const posts = new Storage(STORE.POSTS);
    posts.get('public');

    const post = posts.findOne({ uri: postUri });
    if (!post) throw new Error(`/${postUri} is not a valid url.`);

    const users = new Storage(STORE.USERS);
    users.get('admins');
    const author = users.findOne({ id: post.author });

    const uriFile = `posts/${post.uri}.md`;
    if (!fs.existsSync(uriFile)) throw new Error(`${uriFile} could not read correctly.`);

    html = render('index', {
      role: 'post',
      main: render('post', {
        ...post,
        author: author.name,
        avatar: author.avatar || '',
        markdown: converter.makeHtml(fs.readFileSync(uriFile, 'utf8')),
        banner: render('banners/banner'),
        bannerCourse: render('banners/bannerCourse'),
        bannerReport: render('banners/bannerReport'),
      }),
    });
  }

  cache.set(keyCache, html);

  res.send(html);
};
