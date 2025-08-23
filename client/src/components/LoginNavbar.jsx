import { Link } from 'react-router-dom';
import { ShieldCheckIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/solid';

export default function LoginNavbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-50 via-white to-purple-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo & Tagline */}
          <Link to="/" className="flex flex-col">
            <div className="flex items-center space-x-3">
              <ShieldCheckIcon className="h-10 w-10 text-indigo-600 drop-shadow-md" />
              <span className="text-3xl font-extrabold text-indigo-700 hover:text-indigo-900 transition-colors">
                LeadSphere
              </span>
            </div>
            <span className="text-sm text-gray-500 mt-1 flex items-center gap-1 font-medium">
              <ArrowsRightLeftIcon className="h-4 w-4 text-gray-400" />
              A Central Hub for Managing Leads
            </span>
          </Link>

          {/* Placeholder for future nav items */}
          <div></div>
        </div>
      </div>
    </nav>
  );
}
