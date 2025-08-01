'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface DataRefreshContextType {
  refreshTrigger: number;
  refreshData: () => void;
  refreshKey: () => void;
}

const DataRefreshContext = createContext<DataRefreshContextType | undefined>(undefined);

export function DataRefreshProvider({ children }: { children: ReactNode }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshData = () => {
    // Simple global refresh - increment trigger to force all data to refetch
    setRefreshTrigger((prev) => prev + 1);
  };

  const refreshKey = () => {
    // For now, just do global refresh. Can be enhanced later if needed
    refreshData();
  };

  return (
    <DataRefreshContext.Provider value={{ refreshTrigger, refreshData, refreshKey }}>
      {children}
    </DataRefreshContext.Provider>
  );
}

export function useDataRefresh() {
  const context = useContext(DataRefreshContext);
  if (context === undefined) {
    throw new Error('useDataRefresh must be used within a DataRefreshProvider');
  }
  return context;
}
