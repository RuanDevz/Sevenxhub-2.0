// src/components/VideoGrid.tsx
import React from 'react';
import VideoCard from './VideoCard';
import { Video } from '../types';
import { Loader } from 'lucide-react';

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-red-800 dark:text-red-500" size={40} />
      </div>
    );
  }

  if (!videos || !Array.isArray(videos) || videos.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-700 dark:text-gray-300">No videos found</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Try a different search term or check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.file_code} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
