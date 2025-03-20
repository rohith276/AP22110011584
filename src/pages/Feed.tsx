import React, { useEffect, useState } from 'react';
import { fetchFeed } from '../api';
import { PostWithUser } from '../types';
import PostCard from '../components/PostCard';

const Feed = () => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
const loadFeed = async () => {
  try {
    const fetchedPosts = await fetchFeed(); // Fetch all posts initially

        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to fetch feed:', error);
        alert('There was an error fetching the feed. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadFeed();
    const interval = setInterval(() => loadFeed(), 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Feed</h1>
      <div>
        {posts.map((post: PostWithUser) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
