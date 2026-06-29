export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio: string;
  profilePicture: string;
  location: string;
  website: string;
  followers: number;
  following: number;
  posts: number;
  createdAt: string;
}

export interface Post {
  _id: string;
  userId: string;
  username: string;
  userProfileImage: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Story {
  _id: string;
  username: string;
  imageUrl: string;
}