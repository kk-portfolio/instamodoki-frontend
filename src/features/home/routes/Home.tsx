import { ArchiveIcon } from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import userPhotoPlaceholder from '@/assets/portrait-placeholder.png';
import { MouseOverPopoverProvider } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';
import { ROUTER_BASENAME } from '@/config';
import { Post } from '@/features/auth';
import { usePost } from '@/features/post/hooks';
import { useLikePost } from '@/features/post/hooks/useLikePost';
import { fetchUserProfile } from '@/features/profile/api';
import { useMyProfile } from '@/features/profile/hooks';
import { useAuth } from '@/lib/auth';
import { formatDateDistance } from '@/utils/format';

type HomePostDTO = {
  name: string;
  username: string;
  imageSource: string;
  post: Post;
};

type HomePostCardProps = {
  dto: HomePostDTO;
};

const HomePostCard = ({ dto }: HomePostCardProps) => {
  const navigate = useNavigate();
  const { user: me } = useAuth();
  const { data } = usePost(dto.post.id);
  const likePostMutation = useLikePost(dto.post.id);

  const post = data?.post;

  if (!me) return <></>;
  if (!post) return <></>;

  const isLike = post.likes.includes(me?.id ? me.id : '');

  return (
    <>
      <div className=" rounded-lg overflow-hidden shadow-lg bg-gray-50">
        <div
          className="flex items-center gap-2 pl-2 py-2 cursor-pointer"
          onClick={() => {
            navigate(`${ROUTER_BASENAME}app/profile/${dto.name}`);
          }}
        >
          <img src={dto.imageSource} alt="" className="w-10 h-10 rounded-full" />
          <span className="text-xl">{dto.username}</span>
        </div>
        <img
          src={post.image[0].url}
          className="w-full cursor-pointer"
          onClick={() => {
            navigate(`${ROUTER_BASENAME}app/post/${post.id}`);
          }}
        />
        <div className="flex items-center">
          <MouseOverPopoverProvider
            message={isLike ? 'Like解除' : 'Like'}
            anchorOriginHorizontal="right"
            transformOriginHorizontal="left"
          >
            <HeartIcon
              className={`w-7 h-7 mr-1 cursor-pointer ${isLike && ' text-rose-600'}`}
              onClick={() => {
                likePostMutation.mutate({ id: post.id });
              }}
            />
          </MouseOverPopoverProvider>
          {`${post.likes.length} like`}
        </div>
        <div className="text-gray-800 px-2 py-1">{post.caption}</div>
        <div className="text-gray-500 text-sm px-2 py-1">
          {formatDateDistance(new Date(post.createdAt))}
        </div>
      </div>
    </>
  );
};

const NoPosts = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-gray-500 bg-pink-50 h-80">
        <ArchiveIcon className="w-16 h-16" />
        ご自分かフォロワーの投稿をここに表示します
      </div>{' '}
    </>
  );
};

export const Home = () => {
  const { user: me } = useAuth();
  const { data } = useMyProfile();
  const [posts, setPosts] = useState<HomePostDTO[]>([]);

  const sortFn = (a: HomePostDTO, b: HomePostDTO) => {
    if (a.post.createdAt > b.post.createdAt) return -1;
    return 1;
  };

  useEffect(() => {
    if (!me?.posts) return;

    const myPostDTO = me?.posts.map((post) => {
      const dto: HomePostDTO = {
        name: me.name,
        username: me.username,
        imageSource: me.photo.secure_url !== '' ? me.photo.secure_url : userPhotoPlaceholder,
        post: post,
      };
      return dto;
    });
    if (myPostDTO) setPosts(myPostDTO);

    if (!data?.profile) return;

    Object.keys(data.profile.following).forEach((name) => {
      fetchUserProfile(name).then((user) => {
        const dtos = user.data.profile.posts.map((post) => {
          const dto: HomePostDTO = {
            name: name,
            username: user.data.profile.username,
            imageSource:
              user.data.profile.photo.secure_url !== ''
                ? user.data.profile.photo.secure_url
                : userPhotoPlaceholder,
            post: post,
          };
          return dto;
        });

        setPosts((prev) => {
          return [...prev, ...dtos];
        });
      });
    });
  }, []);

  return (
    <ContentLayout title="Home">
      {posts.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 mt-4">
          {posts.sort(sortFn).map((dto, index) => {
            return <HomePostCard dto={dto} key={index} />;
          })}
        </div>
      ) : (
        <div className="mt-4">
          <NoPosts />
        </div>
      )}
    </ContentLayout>
  );
};
