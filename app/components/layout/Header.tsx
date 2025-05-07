'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, profile, signOut, loading, signingOut } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Mencegah hydration mismatch dengan memastikan komponen hanya merender sepenuhnya di client
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    if (signingOut) return; // Prevent multiple sign out attempts
    
    await signOut();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Header markup yang akan digunakan oleh keduanya (server dan client)
  const headerMarkup = (
    <header className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container-custom py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-500 dark:text-blue-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6v12c0 1.6569 1.34315 3 3 3h8c1.6569 0 3-1.34315 3-3V9L13.5 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 3v6h6" />
            </svg>
            <span className="font-normal">Food</span><span className="font-bold">Order</span>
          </Link>

          {mounted ? (
            <>
              {/* Mobile menu button */}
              <button 
                className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
                onClick={toggleMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Desktop menu */}
              <nav className="hidden md:block">
                <ul className="flex space-x-6 items-center">
                  {!loading && (
                    <>
                      {user ? (
                        <>
                          {profile?.role === 'admin' && (
                            <li>
                              <Link
                                href="/admin"
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
                              >
                                Admin Panel
                              </Link>
                            </li>
                          )}
                          <li>
                            <div className="relative">
                              <button 
                                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full transition-colors"
                                onClick={toggleProfileMenu}
                              >
                                {profile?.avatar_url ? (
                                  <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2 border border-gray-300 dark:border-gray-600">
                                    <img 
                                      src={profile.avatar_url} 
                                      alt="Profile" 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                )}
                                <span className="mr-1">{profile?.full_name || user.email}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                                  <Link 
                                    href="/profile" 
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                  >
                                    Profile
                                  </Link>
                                  <button
                                    onClick={() => {
                                      setIsProfileMenuOpen(false);
                                      handleSignOut();
                                    }}
                                    disabled={signingOut}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400 disabled:opacity-50"
                                  >
                                    {signingOut ? 'Signing out...' : 'Sign Out'}
                                  </button>
                                </div>
                              )}
                            </div>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link
                              href="/login"
                              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
                            >
                              Login
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/register"
                              className="btn-primary"
                            >
                              Register
                            </Link>
                          </li>
                        </>
                      )}
                    </>
                  )}
                </ul>
              </nav>
            </>
          ) : (
            // Placeholder untuk navigasi agar markup tetap konsisten
            <div className="hidden md:block">
              <div className="h-10 w-48"></div>
            </div>
          )}
        </div>
        
        {/* Mobile menu - hanya ditampilkan setelah hydration */}
        {mounted && isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-4">
              {!loading && (
                <>
                  {user ? (
                    <>
                      {profile?.role === 'admin' && (
                        <li>
                          <Link
                            href="/admin"
                            className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Admin Panel
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link 
                          href="/profile" 
                          className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="flex items-center">
                            {profile?.avatar_url ? (
                              <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2 border border-gray-300 dark:border-gray-600">
                                <img 
                                  src={profile.avatar_url} 
                                  alt="Profile" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            )}
                            Profile
                          </div>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleSignOut}
                          disabled={signingOut}
                          className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium disabled:opacity-50"
                        >
                          {signingOut ? 'Signing out...' : 'Sign Out'}
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/login"
                          className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Login
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link
                          href="/register"
                          className="btn-primary inline-block"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );

  return headerMarkup;
} 