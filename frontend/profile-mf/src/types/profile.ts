export interface UserProfile {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatar: {
    url: string;
    publicId: string;
  };
  followers: string[];
  following: string[];
  blockedUsers?: string[];
  isVerified: boolean;
  role: "USER" | "ADMIN";
  isActive: boolean;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  username: string;
  avatar: {
    url: string;
    publicId: string;
  };
}

export interface Media {
  url: string;
  publicId: string;
  mediaType: string;
}

export interface Comment {
  _id: string;
  user: string;
  text: string;
  createdAt: string;
}

export interface Post {
  _id: string;
  author: User;
  content: string;
  caption: string;
  media: Media[];
  likes: string[];
  comments: Comment[];
  tags: string[];
  location: string;
  visibility: "PUBLIC" | "FOLLOWERS" | "PRIVATE";
  repostOf: string | null;
  repostCount: number;
  shareCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Story {
  _id: string;
  username: string;
  imageUrl: string;
}