import React, { useState, useEffect } from 'react';
import DynamicLoading from './Loading';

const LoadingWrapper = ({ children, isLoading, minDisplayTime = 2000 }) => {
  const [showLoading, setShowLoading] = useState(isLoading);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (isLoading) {
      setStartTime(Date.now());
      setShowLoading(true);
    } else if (startTime) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      const timer = setTimeout(() => {
        setShowLoading(false);
        setStartTime(null);
      }, remainingTime);

      return () => clearTimeout(timer);
    }
  }, [isLoading, startTime, minDisplayTime]);

  if (showLoading) {
    return <DynamicLoading />;
  }

  return children;
};

export default LoadingWrapper;
