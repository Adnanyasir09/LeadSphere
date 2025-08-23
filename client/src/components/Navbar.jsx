import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldCheckIcon,
  HomeIcon,
  UserGroupIcon,
  ArrowUpTrayIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/solid';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <HomeIcon className="h-5 w-5 inline-block mr-1" /> },
    { name: 'Agents', path: '/agents', icon: <UserGroupIcon className="h-5 w-5 inline-block mr-1" /> },
    { name: 'Upload', path: '/upload', icon: <ArrowUpTrayIcon className="h-5 w-5 inline-block mr-1" /> },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-50 via-white to-purple-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">

            {/* Logo & Branding */}
            <Link to="/dashboard" className="flex flex-col">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="h-10 w-10 text-indigo-600 drop-shadow-md" />
                <span className="text-3xl font-extrabold text-indigo-700 hover:text-indigo-900 transition-colors">
                  LeadSphere
                </span>
              </div>
              <span className="text-sm text-gray-500 mt-1 flex items-center gap-1 font-medium">
                A Central Hub for Managing Leads
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center text-gray-700 font-medium hover:text-indigo-600 transition-colors ${
                    location.pathname === link.path ? 'text-indigo-600 underline' : ''
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
              >
                {menuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center text-gray-700 font-medium hover:text-indigo-600 transition-colors ${
                    location.pathname === link.path ? 'text-indigo-600 underline' : ''
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="flex items-center w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
}
