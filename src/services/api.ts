// src/services/api.ts
import { ApiResponse } from '../types';

const API_KEY = '497584ycgrio4h93tbtz0u';
const BASE_URL = 'https://doodapi.com/api';
const PROXY_URL = 'https://corsproxy.io/?';

export const fetchVideos = async (page = 1, perPage = 20): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${PROXY_URL}${encodeURIComponent(`${BASE_URL}/file/list?key=${API_KEY}&page=${page}&per_page=${perPage}`)}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    
    const data = await response.json();
    console.log('fetchVideos response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return {
      status: 0,
      msg: 'Error fetching videos',
      total_count: 0,
      result: []
    };
  }
};

export const searchVideos = async (query: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${PROXY_URL}${encodeURIComponent(`${BASE_URL}/search/videos?key=${API_KEY}&search_term=${encodeURIComponent(query)}`)}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search videos');
    }
    
    const data = await response.json();
    console.log('searchVideos response:', data);
    return data;
  } catch (error) {
    console.error('Error searching videos:', error);
    return {
      status: 0,
      msg: 'Error searching videos',
      total_count: 0,
      result: []
    };
  }
};

export const getVideoInfo = async (fileCode: string): Promise<any> => {
  try {
    const response = await fetch(
      `${PROXY_URL}${encodeURIComponent(`${BASE_URL}/file/info?key=${API_KEY}&file_code=${fileCode}`)}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to get video info');
    }
    
    const data = await response.json();
    console.log('getVideoInfo response:', data);
    return data;
  } catch (error) {
    console.error('Error getting video info:', error);
    return {
      status: 0,
      msg: 'Error getting video info',
      result: null
    };
  }
};
