import React, { createContext, useContext, useState, useEffect } from 'react';

const ComparisonContext = createContext();

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

export const ComparisonProvider = ({ children }) => {
  const [comparisonList, setComparisonList] = useState(() => {
    const saved = localStorage.getItem('comparison');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('comparison', JSON.stringify(comparisonList));
  }, [comparisonList]);

  const addToComparison = (property) => {
    if (comparisonList.length < 3 && !comparisonList.find(p => p.id === property.id)) {
      setComparisonList(prev => [...prev, property]);
      return true;
    }
    return false;
  };

  const removeFromComparison = (propertyId) => {
    setComparisonList(prev => prev.filter(p => p.id !== propertyId));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const isInComparison = (propertyId) => {
    return comparisonList.some(p => p.id === propertyId);
  };

  return (
    <ComparisonContext.Provider value={{
      comparisonList,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};