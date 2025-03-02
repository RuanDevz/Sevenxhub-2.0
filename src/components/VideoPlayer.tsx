// src/components/VideoPlayer.tsx
import React, { useEffect, useState } from 'react';
import { getVideoInfo } from '../services/api';
import { Loader } from 'lucide-react';

interface VideoPlayerProps {
  fileCode: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ fileCode }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getVideoInfo(fileCode);
        console.log('Video info data:', data);
        
        if (data.status === 200 && data.result && data.result.protected_embed) {
          setVideoUrl(data.result.protected_embed);
        } else {
          setError('Video not available');
        }
      } catch (err) {
        setError('Failed to load video');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoInfo();
  }, [fileCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <Loader className="animate-spin text-red-800 dark:text-red-500" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="text-center">
          <p className="text-gray-700 dark:text-gray-300 text-lg">{error}</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Please try another video.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-lg">
      {videoUrl ? (
        <iframe
          src={videoUrl}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          title="Video player"
        ></iframe>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-white">Video not available</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
