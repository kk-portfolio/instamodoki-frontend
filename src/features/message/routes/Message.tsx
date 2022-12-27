import { ContentLayout } from '@/components/Layout';

import { Chat } from '../components/Chat';
import { GroupSelector } from '../components/GroupSelector';
import { MessageProvider } from '../providers';

export const Message = () => {
  return (
    <MessageProvider>
      <ContentLayout title="Message">
        <div className="mt-4">
          <div className="flex flex-col sm:flex-row gap-2 bg-white ">
            <div className="bg-gray-50 w-full h-30v sm:w-2/5 sm:h-80v">
              <GroupSelector />
            </div>
            <div className="bg-gray-50 w-full h-50v sm:w-3/5 sm:h-80v">
              <Chat />
            </div>
          </div>
        </div>
      </ContentLayout>
    </MessageProvider>
  );
};
