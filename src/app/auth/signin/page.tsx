'use client';

import { signIn } from 'next-auth/react';
import { FiFeather } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  const continueAsGuest = async () => {
    // Sign in as demo user with credentials provider
    await signIn('credentials', {
      redirect: true,
      callbackUrl: '/'
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div className="text-center">
          <div className="flex justify-center">
            <FiFeather className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to BlogAI</h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your account to create and manage blog posts
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleSignIn}
            className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FcGoogle className="h-5 w-5" />
            </span>
            Sign in with Google
          </button>
          
          <div className="text-center">
            <button
              onClick={continueAsGuest}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Continue as guest (DemoUser)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 