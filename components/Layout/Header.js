import Link from 'next/link';
import { useContext } from 'react';
import AuthContext from '../Auth/AuthProvider';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-extrabold text-gray-800 hover:text-gray-900 transition-colors">
              TaskBoard
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-lg font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Dashboard
            </Link>
            {!user ? (
              <>
                <Link href="/auth/login" className="text-lg font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/register" className="btn btn-primary">
                  Get Started
                </Link>
              </>
            ) : (
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Logout
              </button>
            )}
          </nav>
          <div className="md:hidden">
            {/* Mobile menu button */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
