import { fetchTopUsers, fetchTrendingPosts, fetchFeed, postUser, postPost, postComment } from './index';

describe('API Functions', () => {
  test('fetchTopUsers should return users', async () => {
    const users = await fetchTopUsers();
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
  });

  test('fetchTrendingPosts should return posts', async () => {
    const posts = await fetchTrendingPosts();
    expect(posts).toBeDefined();
    expect(Array.isArray(posts)).toBe(true);
  });

  test('fetchFeed should return posts', async () => {
    const feed = await fetchFeed();
    expect(feed).toBeDefined();
    expect(Array.isArray(feed)).toBe(true);
  });

  test('postUser should create a new user', async () => {
    const newUser = { name: 'Test User', avatar: 'test-avatar.png', postCount: 0 };
    const user = await postUser(newUser);
    expect(user).toBeDefined();
    expect(user.name).toBe(newUser.name);
  });

  test('postPost should create a new post', async () => {
    const newPost = { userid: 1, content: 'Test Post', imageUrl: 'test-image.png' };
    const post = await postPost(newPost);
    expect(post).toBeDefined();
    expect(post.content).toBe(newPost.content);
  });

  test('postComment should create a new comment', async () => {
    const newComment = { postid: 1, content: 'Test Comment' };
    const comment = await postComment(newComment);
    expect(comment).toBeDefined();
    expect(comment.content).toBe(newComment.content);
  });
});
