import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-red-800 dark:text-red-500">
              Sevenx<span className="text-gray-800 dark:text-white">hub</span>
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Premium entertainment for mature audiences
            </p>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>© {currentYear} Sevenxhub. All rights reserved.</p>
            <p className="mt-1">
              This site is intended for adults 18 years of age or older.
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-center text-gray-500 dark:text-gray-500">
            By accessing this website, you acknowledge that you are 18 years of age or older and agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;