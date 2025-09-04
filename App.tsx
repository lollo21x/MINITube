
import React, { useState, useEffect, useCallback } from 'react';
import { Theme } from './types';
import Header from './components/Header';
import InputBar from './components/InputBar';
import VideoPlayer from './components/VideoPlayer';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark:bg-gray-900');
      document.body.classList.remove('bg-gray-100');
    } else {
      root.classList.remove('dark');
      document.body.classList.add('bg-gray-100');
      document.body.classList.remove('dark:bg-gray-900');
    }
  }, [theme]);

  // On initial load, check URL for a video ID
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoIdFromUrl = urlParams.get('v');
    if (videoIdFromUrl && videoIdFromUrl.length === 11) {
      setVideoId(videoIdFromUrl);
    }
  }, []);


  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);
  
  const extractYouTubeID = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
    return null;
  };

  const handleUrlSubmit = (url: string) => {
    setUrlError(null);
    const extractedId = extractYouTubeID(url);
    setVideoId(extractedId);

    // Update browser URL with the video ID
    const urlParams = new URLSearchParams(window.location.search);
    if (extractedId) {
      urlParams.set('v', extractedId);
      window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    } else {
      if(url.trim()){
        setUrlError('Invalid YouTube URL. Please make sure it\'s a valid video link.');
      }
      urlParams.delete('v');
      window.history.pushState({}, '', `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ''}`);
    }
  };
  
  const handleInputChange = () => {
    if(urlError) {
      setUrlError(null);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 font-sans">
      <div className="absolute top-6 right-6">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <main className="w-full max-w-4xl flex flex-col items-center space-y-6 sm:space-y-8">
        <Header />
        <div className="w-full max-w-2xl p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500">
          <InputBar onSubmit={handleUrlSubmit} onInputChange={handleInputChange} hasError={!!urlError} />
          {urlError && (
            <p className="mt-2 text-center text-red-600 dark:text-red-500 font-medium text-sm">
              {urlError}
            </p>
          )}
        </div>
        <VideoPlayer videoId={videoId} />

        {videoId && (
          <div className="mt-4">
            <a
              href={`https://www.youtube-nocookie.com/embed/${videoId}?playlist=${videoId}&autoplay=1&iv_load_policy=3&loop=1&start=`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-gray-200/40 dark:border-gray-700/40 text-gray-800 dark:text-gray-200 font-semibold rounded-2xl hover:bg-gray-200/60 dark:hover:bg-gray-700/60 transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Open in a new window
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;