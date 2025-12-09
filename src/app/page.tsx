'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'client' | 'agent'>('client');

  const clientFeatures = [
    'Create tickets in seconds',
    'Real-time progress tracking',
    'Instant email notifications',
    'Direct agent messaging',
    'Satisfaction rating system'
  ];

  const agentFeatures = [
    'Smart automated assignment',
    'Advanced analytics dashboard',
    'SLA breach monitoring',
    'Bulk ticket operations',
    'Team performance insights'
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-50 via-white to-green-50"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-200/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute inset-0 bg-grid-emerald-900/[0.02] bg-[length:30px_30px]"></div>
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="px-6 py-6 border-b border-emerald-100 backdrop-blur-md sticky top-0 z-50 bg-white/50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="HelpDeskPro Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600">
                HelpDeskPro
              </span>
            </div>
            <div className="flex gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 border-0 shadow-lg shadow-emerald-500/25 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm font-medium backdrop-blur-sm">
               Reimagining Customer Support
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-gray-900">
              Support that <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">actually helps</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Stop losing tickets in email chaos. HelpDeskPro organizes, tracks, 
              and resolves support requests with a modern, intelligent platform designed for speed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
              <Link href="/auth/login">
                <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 border-0 shadow-xl shadow-emerald-500/20 px-8 py-4 text-lg">
                   Start Free Trial
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg">
                  View Features
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                Tailored for <span className="text-emerald-600">Everyone</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Whether you're asking for help or providing it, we've got you covered.
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-lg rounded-3xl border border-emerald-100 p-2 md:p-4 max-w-5xl mx-auto shadow-xl shadow-emerald-100/50">
              <div className="flex gap-2 mb-8 bg-emerald-50 p-1 rounded-xl w-fit mx-auto">
                <button
                  onClick={() => setActiveTab('client')}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'client' 
                      ? 'bg-white text-emerald-700 shadow-md' 
                      : 'text-gray-500 hover:text-emerald-600'
                  }`}
                >
                  For Clients
                </button>
                <button
                  onClick={() => setActiveTab('agent')}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'agent' 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'text-gray-500 hover:text-emerald-600'
                  }`}
                >
                  For Agents
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center p-4 md:p-12">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {activeTab === 'client' ? 'Experience Frictionless Support' : 'Empower Your Support Team'}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {activeTab === 'client' 
                      ? 'Get the help you need without the headache. Our intuitive portal makes submitting and tracking requests effortless.'
                      : 'Give your agents the tools they need to succeed. Automate routine tasks and focus on solving complex problems.'}
                  </p>
                  <ul className="space-y-4 pt-4">
                    {(activeTab === 'client' ? clientFeatures : agentFeatures).map((feature, i) => (
                      <li key={i} className="flex items-center gap-4 text-gray-700">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activeTab === 'client' ? 'bg-emerald-100 text-emerald-600' : 'bg-green-100 text-green-600'
                        }`}>
                          ✓
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    activeTab === 'client' ? 'from-emerald-500/10 to-transparent' : 'from-green-500/10 to-transparent'
                  } rounded-2xl blur-2xl`}></div>
                  <div className="relative bg-white border border-emerald-100 rounded-2xl p-8 aspect-square flex items-center justify-center shadow-lg">
                    {/* Icon/Illustration Placeholder */}
                    <div className={`text-9xl ${activeTab === 'client' ? 'text-emerald-500/50' : 'text-green-500/50'}`}>
                      {activeTab === 'client' ? '👤' : '⚡'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-y border-emerald-100 bg-emerald-50/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '99%', label: 'Satisfaction Rate', color: 'text-emerald-600' },
                { value: '< 5m', label: 'Response Time', color: 'text-green-600' },
                { value: '10k+', label: 'Tickets Solved', color: 'text-teal-600' },
                { value: '24/7', label: 'Support Active', color: 'text-emerald-500' }
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-200 transition-colors shadow-sm">
                  <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-200/30 to-green-200/30 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
              Ready to transform your support?
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Join the future of help desk management today. No credit card required.
            </p>
            <Link href="/auth/login">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 px-10 py-5 text-xl shadow-xl shadow-emerald-500/20">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-emerald-100 bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="HelpDeskPro Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-gray-900 font-semibold">HelpDeskPro</span>
            </div>
            <div className="text-gray-500 text-sm">
              © 2025 HelpDeskPro. All rights reserved.
            </div>
            <div className="flex gap-6 text-gray-500">
              <a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div> 
    </div>
  );
}