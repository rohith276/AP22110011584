export interface ApiUser {
  [key: string]: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  postCount: number;
}

export interface ApiPost {
  id: number;
  userid: number;
  content: string;
}

export interface ApiComment {
  id: number;
  postid: number;
  content: string;
}

export interface Post {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  comments: ApiComment[];
  imageUrl: string;
}

export interface PostWithUser extends Post {
  user: User;
}