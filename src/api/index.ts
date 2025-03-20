import { PostWithUser } from '../types';

const API_URL = process.env.API_URL || 'http://20.244.56.144/test';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN; // Moved to environment variable, ensure it's set in .env

export const fetchTopUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
  });
  
  if (!response.ok) {
    console.error('Error fetching top users:', response.statusText);
    throw new Error('Failed to fetch top users');
  }

  const data = await response.json();
  return data.users;
}

export const fetchTrendingPosts = async (): Promise<PostWithUser[]> => {
  const response = await fetch(`${API_URL}/posts`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
  });
  
  if (!response.ok) {
    console.error('Error fetching trending posts:', response.statusText);
    throw new Error('Failed to fetch trending posts');
  }

  const data = await response.json();
  return data.posts.filter((post: PostWithUser) => post.comments && post.comments.length > 0)
                   .sort((a: PostWithUser, b: PostWithUser) => (b.comments.length - a.comments.length));
}

export const fetchFeed = async () => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
  });
  
  if (!response.ok) {
    console.error('Error fetching feed:', response.statusText);
    throw new Error('Failed to fetch feed');
  }

  const data = await response.json();
  return data.posts;
}

// Function to post a new user
export const postUser = async (user: { name: string; avatar: string; postCount: number }) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify(user),
  });
  
  if (!response.ok) {
    console.error('Error posting user:', response.statusText);
    throw new Error('Failed to post user');
  }

  return response.json();
}

// Function to post a new post
export const postPost = async (post: { userid: number; content: string; imageUrl: string }) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify(post),
  });
  
  if (!response.ok) {
    console.error('Error posting:', response.statusText);
    throw new Error('Failed to post');
  }

  return response.json();
}

// Function to post a new comment
export const postComment = async (comment: { postid: number; content: string }) => {
  const response = await fetch(`${API_URL}/posts/${comment.postid}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify(comment),
  });
  
  if (!response.ok) {
    console.error('Error posting comment:', response.statusText);
    throw new Error('Failed to post comment');
  }

  return response.json();
}
