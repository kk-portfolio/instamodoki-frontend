import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';
import { ROUTER_BASENAME } from '@/config';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <ContentLayout title="Not Found">
      <div className="flex justify-center my-8">指定されたユーザーは存在しません。</div>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            navigate(`${ROUTER_BASENAME}app/home`);
          }}
        >
          ホームへ
        </Button>
      </div>
    </ContentLayout>
  );
};
