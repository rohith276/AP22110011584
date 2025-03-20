import React from 'react';
import { PostWithUser } from '../types';
import { MessageCircle, Heart } from 'lucide-react';

interface PostCardProps {
  post: PostWithUser;
  trending?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, trending = false }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${trending ? 'border-2 border-indigo-500' : ''}`}>
      <img
        src={post.imageUrl}
        alt="Post"
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            loading="lazy"
            src={post.user.avatar}
            alt={post.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900">{post.user.name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{post.content}</p>
        
        <div className="flex items-center space-x-4 text-gray-500">
          <div className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-1" />
            <span>{post.comments.length} comments</span>
          </div>
          <div className="flex items-center">
            <Heart className="h-5 w-5 mr-1" />
            <span>Like</span>
          </div>
        </div>
        
        {trending && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold text-gray-900 mb-2">Recent Comments</h4>
            {post.comments.slice(0, 3).map((comment) => (
              <div key={comment.id} className="text-sm text-gray-700 mb-2">
                {comment.content}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
