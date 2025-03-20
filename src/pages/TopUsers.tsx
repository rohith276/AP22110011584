import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { fetchTopUsers } from '../api';
import UserCard from '../components/UserCard';
import sampleData from '../db.json'; // Import sample data

interface SampleUser {
  id: string;
  name: string;
  postCount: number;
}

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopUsers = async () => {
      try {
        const apiUsers = await fetchTopUsers();
        
        // Convert sampleData.users object to an array of user objects
        const sampleUsers: SampleUser[] = Object.keys(sampleData.users).map(key => ({
          id: key,
          name: sampleData.users[key as keyof typeof sampleData.users], // Access user name with type assertion
          postCount: Math.floor(Math.random() * 20) // Random post count for sample users
        }));

        // Combine API and sample users
        const combinedUsers = [...apiUsers, ...sampleUsers];

        // Sort users by post count and take the top 5
        const sortedUsers = combinedUsers.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
        setTopUsers(sortedUsers);
      } catch (error) {
        console.error('Failed to fetch top users:', error);
        alert('There was an error fetching the top users. Please try again later.');
        setTopUsers([]); // Set to empty array to prevent map error
      } finally {
        setLoading(false);
      }
    };

    loadTopUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Top Users</h1>
      <div>
        {topUsers.map((user: User, index: number) => (
          <UserCard key={user.id} user={user} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default TopUsers;
