import { Link } from 'react-router-dom';
import { ShieldCheckIcon, UserGroupIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-emerald-50 via-white to-teal-50 shadow-inner fixed bottom-0 left-0 w-full z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-2 mb-1">
            <ShieldCheckIcon className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-teal-700">LeadSphere</span>
          </div>
          <span className="text-sm text-gray-500">A Central Hub for Managing Leads</span>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          <Link to="/dashboard" className="text-gray-700 hover:text-emerald-600 transition-colors flex items-center gap-1">
            <ShieldCheckIcon className="h-4 w-4" /> Dashboard
          </Link>
          <Link to="/agents" className="text-gray-700 hover:text-emerald-600 transition-colors flex items-center gap-1">
            <UserGroupIcon className="h-4 w-4" /> Agents
          </Link>
          <Link to="/upload" className="text-gray-700 hover:text-emerald-600 transition-colors flex items-center gap-1">
            <ArrowUpTrayIcon className="h-4 w-4" /> Upload
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
            <FaTwitter className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
            <FaGithub className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-2 pb-2">
        &copy; {new Date().getFullYear()} LeadSphere. All rights reserved.
      </div>
    </footer>
  );
}
