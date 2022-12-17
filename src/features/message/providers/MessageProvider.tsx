import React, { ReactNode, useState } from 'react';
import { MessageContext } from '.';

type MessageProviderProps = {
  children: ReactNode;
};

export const MessageProvider = ({ children }: MessageProviderProps) => {
  const [activeGroupId, setActiveGroupId] = useState<string>('');
  return (
    <>
      <MessageContext.Provider value={{ activeGroupId, setActiveGroupId }}>
        {children}
      </MessageContext.Provider>
    </>
  );
};
