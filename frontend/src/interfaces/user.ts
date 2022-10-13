export interface UserCreation {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_admin: boolean;
  avatar_url?: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  is_admin: boolean;
  avatar_url?: string;
}

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

export interface Follower {
  id: number,
  followerId: number,
  follwerName: string,
}

export interface Following {
  id: number,
  followingId: number,
  follwingName: string,
}

export interface UserProfileRelations {
  id: number,
  fullName: string,
  avatarUrl?: string,
  followingNumber: number,
  followingRelation: Following[],
  followerNumber: number,
  followerRelation: Follower[],
}
