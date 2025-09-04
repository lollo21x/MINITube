
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent pb-2">
        MINITube
      </h1>
      <p className="text-base text-gray-500 dark:text-gray-400 mt-1 tracking-wide font-medium">
        No ads, no cookie, auto-repeat
      </p>
    </header>
  );
};

export default Header;
