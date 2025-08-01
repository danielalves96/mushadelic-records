'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface DataRefreshContextType {
  refreshTrigger: number;
  refreshData: () => void;
  refreshKey: () => void;
  refreshArtists: () => void;
  refreshReleases: () => void;
  refreshProfile: () => void;
  artistsRefreshTrigger: number;
  releasesRefreshTrigger: number;
  profileRefreshTrigger: number;
}

const DataRefreshContext = createContext<DataRefreshContextType | undefined>(undefined);

export function DataRefreshProvider({ children }: { children: ReactNode }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [artistsRefreshTrigger, setArtistsRefreshTrigger] = useState(0);
  const [releasesRefreshTrigger, setReleasesRefreshTrigger] = useState(0);
  const [profileRefreshTrigger, setProfileRefreshTrigger] = useState(0);

  const refreshData = () => {
    // Global refresh - increment all triggers
    setRefreshTrigger((prev) => prev + 1);
    setArtistsRefreshTrigger((prev) => prev + 1);
    setReleasesRefreshTrigger((prev) => prev + 1);
    setProfileRefreshTrigger((prev) => prev + 1);
  };

  const refreshArtists = () => {
    setArtistsRefreshTrigger((prev) => prev + 1);
  };

  const refreshReleases = () => {
    setReleasesRefreshTrigger((prev) => prev + 1);
  };

  const refreshProfile = () => {
    setProfileRefreshTrigger((prev) => prev + 1);
  };

  const refreshKey = () => {
    // For now, just do global refresh. Can be enhanced later if needed
    refreshData();
  };

  return (
    <DataRefreshContext.Provider
      value={{
        refreshTrigger,
        refreshData,
        refreshKey,
        refreshArtists,
        refreshReleases,
        refreshProfile,
        artistsRefreshTrigger,
        releasesRefreshTrigger,
        profileRefreshTrigger,
      }}
    >
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
