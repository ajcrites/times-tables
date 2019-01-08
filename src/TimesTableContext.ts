import { createContext } from 'react';

export interface TimesTableContextProps {
  pointCount: number;
  timesTable: number;
  lineColor: string;

  setPointCount: (value) => void;
  setTimesTable: (value) => void;
  setLineColor: (value) => void;
}

export const TimesTableContext = createContext<TimesTableContextProps>(
  {} as any,
);
