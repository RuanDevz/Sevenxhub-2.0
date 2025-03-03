// src/components/VideoCard.tsx
import React from 'react';
import { Play, Clock, Eye } from 'lucide-react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  // Se a API retornar o download_url, use-o; caso contrário, gere o link com base no file_code.
  const videoLink = (video as any).download_url 
    ? (video as any).download_url 
    : `https://dooodster.com/d/${video.file_code}`;

  return (
    <a
      href={videoLink}
      target="_blank" // ou remova se quiser abrir na mesma aba
      rel="noopener noreferrer"
      className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.splash_img || 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop'}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        </div>
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-gray-900 dark:text-white font-medium line-clamp-2 mb-2 group-hover:text-red-800 dark:group-hover:text-red-500 transition-colors duration-300">
          {video.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{formatDate(video.uploaded)}</span>
          </div>
          <div className="flex items-center">
            <Eye size={14} className="mr-1" />
            <span>{formatViews(video.views)}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default VideoCard;
