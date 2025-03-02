// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import VideoGrid from '../components/VideoGrid';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import { fetchVideos, searchVideos } from '../services/api';
import { Video } from '../types';

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const videosPerPage = 20;

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        
        if (searchQuery) {
          response = await searchVideos(searchQuery);
        } else {
          response = await fetchVideos(currentPage, videosPerPage);
        }
        
        console.log('HomePage response:', response);
        
        if (response.status === 200) {
          // Extrai os vídeos de response.result.files
          const videosArray = response.result.files || [];
          setVideos(videosArray);
          setTotalPages(Math.ceil(Number(response.result.results_total) / videosPerPage) || 1);
        } else {
          setVideos([]);
          setTotalPages(1);
          setError('Unable to load videos. Please try again later.');
        }
      } catch (error) {
        console.error('Error loading videos:', error);
        setVideos([]);
        setError('Unable to load videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    loadVideos();
  }, [currentPage, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Header onSearch={handleSearch} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {searchQuery ? `Search Results: "${searchQuery}"` : 'Premium Videos'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery 
              ? `Showing results for "${searchQuery}"`
              : 'Discover our exclusive collection of premium content'}
          </p>
        </div>
        
        {error && !loading && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-400">{error}</p>
          </div>
        )}
        
        <VideoGrid videos={videos} loading={loading} />
        
        {!loading && videos.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
