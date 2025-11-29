'use client';

import { RoleSwitcher } from '@/components/RoleSwitcher';
import { DashboardContent } from '@/components/DashboardContent';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-50 border-r border-gray-200 p-6 hidden md:flex flex-col">
        {/* Logo */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">W</span>
            </div>
            <h2 className="text-sm font-bold text-gray-900">Willow</h2>
          </div>
          <p className="text-xs text-gray-500 ml-7">Education</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-200 text-gray-900 text-sm font-medium">
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium">
            <span>Students</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium">
            <span>Careers</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium">
            <span>Schools</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium">
            <span>Letters</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium">
            <span>Curriculum</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium">
            <span>Settings</span>
          </a>
        </nav>

        {/* Logout */}
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium border-t border-gray-200 pt-4">
          <span>Logout</span>
        </a>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <RoleSwitcher />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}
