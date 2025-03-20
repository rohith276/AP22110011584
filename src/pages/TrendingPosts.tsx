import React, { useEffect, useState } from 'react';
import { PostWithUser, User } from '../types';
import { fetchTrendingPosts } from '../api';
import PostCard from '../components/PostCard';
import sampleData from '../db.json'; // Import sample data

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState<PostWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendingPosts = async () => {
      try {
        const apiPosts = await fetchTrendingPosts();
        
        // Combine API posts with sample posts from db.json
        const samplePosts: PostWithUser[] = sampleData.posts.map(post => ({
          id: post.id,
          userId: post.userid,
          content: post.content,
          comments: [], // Initialize comments as an empty array for sample posts
          user: { 
            id: post.userid.toString(), // Convert user ID to string
            name: sampleData.users[post.userid.toString() as keyof typeof sampleData.users], // Access user name with type assertion
            avatar: 'https://example.com/sample-avatar.png', // Placeholder avatar URL
            postCount: Math.floor(Math.random() * 20) // Random post count for sample users
          },
          createdAt: new Date().toISOString(), // Set a createdAt date
          imageUrl: 'https://example.com/sample-image.png' // Placeholder image URL
        }));

        const combinedPosts = [...apiPosts, ...samplePosts];

        // Find the post(s) with the maximum number of comments
        const maxComments = Math.max(...combinedPosts.map(post => post.comments.length));
        const trending = combinedPosts.filter(post => post.comments.length === maxComments);

        setTrendingPosts(trending);
      } catch (error) {
        console.error('Failed to fetch trending posts:', error);
        alert('There was an error fetching the trending posts. Please try again later.');
        setTrendingPosts([]); // Set to empty array to prevent map error
      } finally {
        setLoading(false);
      }
    };

    loadTrendingPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Trending Posts</h1>
      <div>
        {trendingPosts.map((post: PostWithUser) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default TrendingPosts;
