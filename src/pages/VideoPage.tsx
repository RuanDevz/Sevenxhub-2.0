// src/pages/VideoPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import VideoPlayer from '../components/VideoPlayer';
import Footer from '../components/Footer';
import { fetchVideos, getVideoInfo } from '../services/api';
import { Video } from '../types';
import { ArrowLeft, Clock, Eye, Calendar } from 'lucide-react';
import VideoGrid from '../components/VideoGrid';

interface VideoDetails extends Video {
  description?: string;
}

const VideoPage: React.FC = () => {
  const { fileCode } = useParams<{ fileCode: string }>();
  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!fileCode) return;
      
      setLoading(true);
      setError(null);
      try {
        const data = await getVideoInfo(fileCode);
        if (data.status === 200 && data.result) {
          setVideo(data.result);
        } else {
          setError('Unable to load video details. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching video details:', error);
        setError('Unable to load video details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedVideos = async () => {
      setRelatedLoading(true);
      try {
        const data = await fetchVideos(1, 8);
        if (data.status === 200 && Array.isArray(data.result)) {
          // Filter out the current video if it's in the results
          const filtered = data.result.filter(v => v.file_code !== fileCode);
          setRelatedVideos(filtered.slice(0, 4));
        } else {
          setRelatedVideos([]);
        }
      } catch (error) {
        console.error('Error fetching related videos:', error);
        setRelatedVideos([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchVideoDetails();
    fetchRelatedVideos();
    
    // Scroll to top when video changes
    window.scrollTo(0, 0);
  }, [fileCode]);

  const handleSearch = (query: string) => {
    // Navigate to home page with search query
    window.location.href = `/?search=${encodeURIComponent(query)}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatViews = (views: number) => {
    if (!views && views !== 0) return 'Unknown';
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Header onSearch={handleSearch} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-red-800 dark:hover:text-red-500 mb-6 transition-colors duration-300"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to videos
        </Link>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-400">{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        ) : (
          <>
            {fileCode && <VideoPlayer fileCode={fileCode} />}
            
            {video ? (
              <div className="mt-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {video.title}
                </h1>
                
                <div className="flex flex-wrap items-center mt-4 text-sm text-gray-600 dark:text-gray-400 space-x-6">
                  <div className="flex items-center">
                    <Eye size={16} className="mr-2" />
                    <span>{formatViews(video.views)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span>{video.length}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>{formatDate(video.created)}</span>
                  </div>
                </div>
                
                {video.description && (
                  <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {video.description}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-6 text-center py-12">
                <h3 className="text-xl text-gray-700 dark:text-gray-300">Video not found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">The requested video could not be loaded.</p>
              </div>
            )}
          </>
        )}
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Videos</h2>
          <VideoGrid videos={relatedVideos} loading={relatedLoading} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VideoPage;
