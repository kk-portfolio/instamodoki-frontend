export type PostImage = {
  cloudinary_id: string;
  url: string;
};

export type Post = {
  caption: string;
  commentsPost: string[];
  hashtag: string[];
  id: string;
  image: PostImage[];
  likes: string[];
  profile: string;
  user: string;
  _id: string;
};

export type Photo = {
  public_id: string;
  secure_url: string;
};

export type UserProfile = {
  user: string;
  bio: string;
  email: string;
  accountType: 'public' | 'private';
  website: string;
  name: string;
  username: string;
  followers: Object;
  following: Object;
  posts: Post[];
  photo: Photo;
  id: string;

  // gender: string;
  // birthday: Date;
  // closeFriends: string;
};

export type AuthData = {
  token: string;
  profile: UserProfile;
};

export type UserResponse = {
  status: 'success' | 'failure';
  data: AuthData;
};
