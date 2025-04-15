
import React from 'react';

const Header: React.FC = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="text-center mb-6 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight mb-1">
        Daily Spark
      </h1>
      <p className="text-sm text-muted-foreground">
        {formattedDate}
      </p>
    </header>
  );
};

export default Header;
