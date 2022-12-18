import { Post } from '@/features/auth';

export type PostImageRequestDTO = {
  image: Blob;
  caption: string;
};

export type PostDetailResponseDTO = {
  status: string;
  post: Post;
};

export type LikePostResponseDTO = {
  status: string;
  post: Post;
};
