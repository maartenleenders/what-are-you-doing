import React from "react";
import { useLocalStorage } from "./../../shared/hooks/use-local-storage-hook";

type LogEntry = {
  activity: string;
  date: Date;
};

type LogEntriesState = {
  entries: LogEntry[];
};

export interface LogEntriesContextState {
  state: LogEntriesState;
  addLogEntry: (entry: LogEntry) => LogEntriesState;
  clearLogEntries: () => void;
}

const initialState: LogEntriesState = { entries: [] };

export const LogEntriesContext = React.createContext<LogEntriesContextState>({
  state: initialState,
  addLogEntry: () => initialState,
  clearLogEntries: () => {
    /*do nothing*/
  },
});

export const useLogEntriesContext = (): LogEntriesContextState =>
  React.useContext(LogEntriesContext);

export const LogEntriesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [state, setState] = useLocalStorage<LogEntriesState>(
    "log-entries",
    initialState,
  );

  const clearLogEntries = () => {
    setState(initialState);
  };

  const addLogEntry = (entry: LogEntry) => {
    const ret = {
      ...state,
      entries: [...state.entries, entry],
    };

    setState(ret);

    return ret;
  };

  return (
    <LogEntriesContext.Provider value={{ state, clearLogEntries, addLogEntry }}>
      {children}
    </LogEntriesContext.Provider>
  );
};
