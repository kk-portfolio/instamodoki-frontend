import { MouseOverPopoverProvider } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';
import { ROUTER_BASENAME } from '@/config';
import { useAuth } from '@/lib/auth';
import { formatDateDistance } from '@/utils/format';
import { HeartIcon, TrashIcon } from '@heroicons/react/solid';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmDelete } from '../components/ConfirmDelete';
import { usePost } from '../hooks';
import { useDeletePost } from '../hooks/useDeletePost';
import { useLikePost } from '../hooks/useLikePost';

type PostDetailParamsType = {
  id?: string;
};

export const PostDetail = () => {
  const params: PostDetailParamsType = useParams<PostDetailParamsType>();
  const postId = params.id ? params.id : 'dummy';

  const { user: me } = useAuth();
  const { data } = usePost(postId);
  const navigate = useNavigate();
  const likePostMutation = useLikePost(postId);
  const deletePostMutation = useDeletePost(postId);

  const post = data?.post;

  if (!me) return <></>;
  if (!post) return <></>;

  console.log(post);

  const isMyPost = me.name === post.profile.name;
  const isLike = post.likes.includes(me.id);
  console.log(isLike);

  return (
    <ContentLayout title="投稿詳細">
      <div className="w-fit mx-auto">
        <div
          className="flex items-center gap-4 ml-8 my-4 cursor-pointer"
          onClick={() => {
            navigate(`${ROUTER_BASENAME}app/profile/${post.profile.name}`);
          }}
        >
          <img src={post.profile.photo.secure_url} alt="" className="w-10 h-10 rounded-full" />
          <span className="text-xl">{post.profile.username}</span>
        </div>
        <div className="flex justify-center">
          <div className="">
            <img
              src={data?.post.image[0].url}
              alt={data?.post.id}
              style={{ width: 480 }}
              className="px-8 w-full"
            />
          </div>
        </div>
        <div className="flex justify-between items-start mx-8 my-2">
          <div>
            <MouseOverPopoverProvider
              message={isLike ? 'Like解除' : 'Like'}
              anchorOriginHorizontal="right"
              transformOriginHorizontal="left"
            >
              <HeartIcon
                className={`w-10 h-10 cursor-pointer ${isLike && ' text-rose-600'}`}
                onClick={() => {
                  likePostMutation.mutate({ id: postId });
                }}
              />
            </MouseOverPopoverProvider>
            {`${post.likes.length} like`}
          </div>
          {isMyPost ? (
            <ConfirmDelete
              deleteFn={() => {
                deletePostMutation.mutate({ id: postId });
                navigate(`${ROUTER_BASENAME}app/profile`);
              }}
            >
              <MouseOverPopoverProvider
                message="投稿を削除"
                anchorOriginHorizontal="right"
                transformOriginHorizontal="left"
              >
                <TrashIcon className="w-10 h-10 cursor-pointer text-rose-600" />
              </MouseOverPopoverProvider>
            </ConfirmDelete>
          ) : (
            <></>
          )}
        </div>
        <div className="flex items-center gap-4 ml-8 my-2 text-lg">{post.caption}</div>
        <div className="ml-8 text-sm text-gray-500">
          {formatDateDistance(new Date(post.createdAt))}
        </div>
      </div>
    </ContentLayout>
  );
};
