// src/types.ts
export interface Video {
  title: string;
  file_code: string;
  length: string;
  splash_img: string;
  created: string;
  size: string;
  views: number;
  protected: number;
  single_img: string;
  uploaded: string
}

export interface VideoResult {
  files: Video[];
  results_total: string;
}

export interface ApiResponse {
  status: number;
  msg: string;
  total_count: number;
  result: VideoResult;
}

export interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}
