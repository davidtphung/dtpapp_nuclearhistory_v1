
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type ReadingLevel = 'kids' | 'novice' | 'college' | 'expert';

interface ReadingLevelContextType {
  readingLevel: ReadingLevel;
  setReadingLevel: (level: ReadingLevel) => void;
  labels: Record<ReadingLevel, string>;
}

const ReadingLevelLabels: Record<ReadingLevel, string> = {
  kids: 'Kids Edition',
  novice: 'High School',
  college: 'College Level',
  expert: 'Expert Scientist'
};

const ReadingLevelContext = createContext<ReadingLevelContextType>({
  readingLevel: 'novice',
  setReadingLevel: () => {},
  labels: ReadingLevelLabels
});

export const useReadingLevel = () => useContext(ReadingLevelContext);

interface ReadingLevelProviderProps {
  children: ReactNode;
}

export const ReadingLevelProvider: React.FC<ReadingLevelProviderProps> = ({ children }) => {
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>('novice');

  return (
    <ReadingLevelContext.Provider value={{ readingLevel, setReadingLevel, labels: ReadingLevelLabels }}>
      {children}
    </ReadingLevelContext.Provider>
  );
};
