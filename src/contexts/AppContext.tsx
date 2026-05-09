import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { FieldAppSDK } from "@contentful/app-sdk";
import { createCMAClient, fetchContentTypes } from "../utils/entryUtils";

interface AppContextType {
  showDefaultField: boolean;
  toggleDefaultField: () => void;
  isExpanded: boolean;
  showSearch: boolean;
  Refresh: () => void;
  toggleExpand: () => void;
  toggleSearch: () => void;
  cma: any;
  contentTypes: Record<string, any>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{
  children: ReactNode;
  sdk: FieldAppSDK;
}> = ({ children, sdk }) => {
  const [showDefaultField, setShowDefaultField] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [cma, setCma] = useState<any>(null);
  const [contentTypes, setContentTypes] = useState<Record<string, any>>({});

  useEffect(() => {
    const client = createCMAClient(sdk);
    setCma(client);

    const fetchTypes = async () => {
      const types = await fetchContentTypes(client);
      console.log(types);
      setContentTypes(types);
    };

    fetchTypes();
  }, []);

  const toggleDefaultField = () => setShowDefaultField(!showDefaultField);
  const Refresh = () => {
    // Implement Refresh logic
  };
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const toggleSearch = () => setShowSearch(!showSearch);

  const value = {
    showDefaultField,
    setShowDefaultField,
    isExpanded,
    showSearch,
    toggleDefaultField,
    Refresh,
    toggleExpand,
    toggleSearch,
    cma,
    contentTypes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
