'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function SignOutPage() {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Content */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white z-10">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              HelpDeskPro
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign Out
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to sign out?
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <Button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Yes, Sign Out
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Gradient */}
      <div className="hidden lg:block relative w-0 flex-1 overflow-hidden">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-emerald-600 to-green-800">
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:20px_20px]" />
          <div className="flex flex-col justify-center items-center h-full text-white px-12 text-center">
            <h2 className="text-4xl font-bold mb-6">See you soon!</h2>
            <p className="text-lg text-emerald-100 max-w-md">
              Thank you for using HelpDeskPro. We hope to see you back again shortly.
            </p>
            
            {/* Decorative Elements */}
            <div className="mt-12 relative w-full max-w-md aspect-video bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="space-y-3">
                <div className="h-2 bg-white/20 rounded w-3/4"></div>
                <div className="h-2 bg-white/20 rounded w-1/2"></div>
                <div className="h-2 bg-white/20 rounded w-5/6"></div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500 rounded-full blur-2xl opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
