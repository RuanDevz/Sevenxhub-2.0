import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Moon, Sun, Search, Menu, X, TrendingUp, Grid, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-red-800 dark:text-red-500">
              Sevenx<span className="text-gray-800 dark:text-white">hub</span>
            </span>
          </Link>

          {/* Desktop Navigation - centralizado */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-red-800 dark:hover:text-red-500 transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 dark:text-gray-300 hover:text-red-800 dark:hover:text-red-500 transition-colors duration-300"
              >
                Categories
              </Link>
              <Link
                to="/trending"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-800 dark:hover:text-red-500 transition-colors duration-300"
              >
                <TrendingUp size={16} className="mr-1" /> Trending
              </Link>
              <Link
                to="/new"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-800 dark:hover:text-red-500 transition-colors duration-300"
              >
                <Grid size={16} className="mr-1" /> New
              </Link>
              <Link
                to="/popular"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-800 dark:hover:text-red-500 transition-colors duration-300"
              >
                <Star size={16} className="mr-1" /> Popular
              </Link>
            </nav>
          </div>

          {/* Lado direito: Search e Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-800 dark:focus:ring-red-500 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-red-800 dark:hover:text-red-500"
              >
                <Search size={18} />
              </button>
            </form>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="text-yellow-400" size={22} />
              ) : (
                <Moon className="text-gray-700" size={22} />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fadeIn">
            <nav className="mb-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center text-gray-700 dark:text-gray-300 hover:text-red-800 dark:hover:text-red-500 transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center text-gray-700 dark:text-gray-300 hover:text-red-800 dark:hover:text-red-500 transition-colors duration-300"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/trending"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center text-gray-700 dark:text-gray-300 hover:text-red-800 dark:hover:text-red-500 transition-colors duration-300"
                  >
                    Trending
                  </Link>
                </li>
                <li>
                  <Link
                    to="/new"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center text-gray-700 dark:text-gray-300 hover:text-red-800 dark:hover:text-red-500 transition-colors duration-300"
                  >
                    New
                  </Link>
                </li>
                <li>
                  <Link
                    to="/popular"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center text-gray-700 dark:text-gray-300 hover:text-red-800 dark:hover:text-red-500 transition-colors duration-300"
                  >
                    Popular
                  </Link>
                </li>
              </ul>
            </nav>
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-800 dark:focus:ring-red-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-red-800 dark:hover:text-red-500"
              >
                <Search size={18} />
              </button>
            </form>
            <div className="flex justify-center">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="text-yellow-400" size={18} />
                    <span className="text-gray-800 dark:text-white">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="text-gray-700" size={18} />
                    <span className="text-gray-800 dark:text-white">Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
