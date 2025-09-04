
import React from 'react';

interface VideoPlayerProps {
  videoId: string | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  if (!videoId) {
    return null;
  }

  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&color=red&rel=0&loop=1&playlist=${videoId}`;
  
  return (
    <div className="w-full max-w-4xl aspect-video">
      <div className="relative w-full h-full bg-black rounded-3xl overflow-hidden border-4 border-gray-200/20 dark:border-gray-700/40">
        <iframe
          key={videoId}
          src={videoSrc}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
