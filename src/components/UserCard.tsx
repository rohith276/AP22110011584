import React from 'react';
import { User } from '../types';
import { Trophy } from 'lucide-react';

interface UserCardProps {
  user: User;
  rank: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, rank }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 transform transition-all hover:scale-105">
      <div className="relative">
        <img
          loading="lazy"
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        {rank <= 3 && (
          <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
            <Trophy className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.postCount} posts</p>
      </div>
      
      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
        <span className="text-indigo-600 font-semibold">#{rank}</span>
      </div>
    </div>
  );
};

export default UserCard;
