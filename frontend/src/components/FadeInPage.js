import React, { useEffect, useState } from 'react';

const FadeInPage = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`fade-in-page ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

export default FadeInPage;