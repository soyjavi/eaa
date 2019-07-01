import authors from './authors.json';
import unsortedPosts from './posts.json';

const posts = unsortedPosts.reverse(); // @TODO: We should order by .date

export {
  authors,
  posts,
};
