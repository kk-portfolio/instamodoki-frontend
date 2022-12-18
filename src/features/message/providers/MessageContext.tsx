import { createContext } from 'react';

export const MessageContext = createContext(
  {} as {
    activeGroupId: string;
    setActiveGroupId: React.Dispatch<React.SetStateAction<string>>;
  }
);
