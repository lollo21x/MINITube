import React, { useState } from 'react';

interface InputBarProps {
  onSubmit: (url: string) => void;
}

const InputBar: React.FC<InputBarProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste a YouTube link here..."
        className="w-full px-4 py-3 bg-gray-100/50 dark:bg-gray-900/50 border-2 border-transparent focus:border-red-500 focus:ring-0 rounded-2xl text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 outline-none"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-red-600 hover:brightness-110 text-white font-semibold rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105"
      >
        Watch
      </button>
    </form>
  );
};

export default InputBar;