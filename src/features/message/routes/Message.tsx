import { ContentLayout } from '@/components/Layout';

import { Chat } from '../components/Chat';
import { GroupSelector } from '../components/GroupSelector';
import { MessageProvider } from '../providers';

export const Message = () => {
  return (
    <MessageProvider>
      <ContentLayout title="Message">
        <div className="mt-4">
          <div className="flex gap-2 bg-white" style={{ height: '85vh' }}>
            <div className="w-2/5 bg-gray-50">
              <GroupSelector />
            </div>
            <div className="w-3/5 bg-gray-50">
              <Chat />
            </div>
          </div>
        </div>
      </ContentLayout>
    </MessageProvider>
  );
};
