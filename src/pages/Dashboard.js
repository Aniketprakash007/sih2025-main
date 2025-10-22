// src/pages/Dashboard.js
import React, { useState, useEffect, useRef } from 'react';

// Icons
import { Leaf, Star, Zap, Bell, Globe, Target, Award, Users, User, X, Menu, BookOpen, Trophy } from 'lucide-react';

// Common components
import TabButton from '../components/common/TabButton';

// Dashboard views
import DashboardView from '../components/dashboard/DashboardView';
import ChallengesView from '../components/dashboard/ChallengesView';
import LessonsView from '../components/dashboard/LessonsView';
import LeaderboardView from '../components/dashboard/LeaderboardView';
import ProfileView from '../components/dashboard/ProfileView';

const EcoLearnPlatform = () => {
  const [currentUser, setCurrentUser] = useState({
    name: 'Priya Sharma',
    school: 'Delhi Public School, Chandigarh',
    grade: '10th Grade',
    ecoPoints: 2450,
    level: 'Eco Champion',
    badges: ['Tree Planter', 'Waste Warrior', 'Energy Saver', 'Water Guardian', 'Climate Hero'],
    streak: 15,
    profilePic: null,
    joinDate: '2024-01-15',
    challengesCompleted: 23,
    lessonsCompleted: 34,
    carbonSaved: 45.6
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Other states removed for brevity (keep as before)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Leaf className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                    EcoLearn
                  </h1>
                  <div className="text-xs text-gray-500">Smart Environmental Education</div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {/* Points & Streak */}
              <div className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 rounded-xl border">
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-500" size={16} />
                  <span className="font-bold text-green-700">{currentUser.ecoPoints.toLocaleString()}</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center space-x-1 text-orange-600">
                  <Zap size={14} />
                  <span className="text-sm font-medium">{currentUser.streak}</span>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <Bell size={20} />
                  {/* Unread count */}
                  {0 /* Replace with notifications.filter(n => !n.read).length */ > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {/* Count */}
                    </span>
                  )}
                </button>
              </div>

              {/* Profile */}
              <button
                onClick={() => setActiveTab('profile')}
                className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
              >
                <User size={20} />
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className={`mb-6 ${mobileMenuOpen ? 'block' : 'hidden'} md:block`}>
          <div className="flex flex-wrap gap-3 p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
            <TabButton
              label="Dashboard"
              icon={Globe}
              active={activeTab === 'dashboard'}
              onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
            />
            <TabButton
              label="Challenges"
              icon={Target}
              active={activeTab === 'challenges'}
              onClick={() => { setActiveTab('challenges'); setMobileMenuOpen(false); }}
            />
            <TabButton
              label="Lessons"
              icon={BookOpen}
              active={activeTab === 'lessons'}
              onClick={() => { setActiveTab('lessons'); setMobileMenuOpen(false); }}
            />
            <TabButton
              label="Leaderboard"
              icon={Trophy}
              active={activeTab === 'leaderboard'}
              onClick={() => { setActiveTab('leaderboard'); setMobileMenuOpen(false); }}
            />
            <TabButton
              label="Profile"
              icon={User}
              active={activeTab === 'profile'}
              onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
            />
          </div>
        </nav>

        {/* Content */}
        <main>
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'challenges' && <ChallengesView />}
          {activeTab === 'lessons' && <LessonsView />}
          {activeTab === 'leaderboard' && <LeaderboardView />}
          {activeTab === 'profile' && <ProfileView />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl">
        <div className="flex justify-around py-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center p-3 transition-all ${activeTab === 'dashboard' ? 'text-green-500 transform scale-110' : 'text-gray-600'}`}
          >
            <Globe size={20} />
            <span className="text-xs font-medium mt-1">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex flex-col items-center p-3 transition-all ${activeTab === 'challenges' ? 'text-green-500 transform scale-110' : 'text-gray-600'}`}
          >
            <Target size={20} />
            <span className="text-xs font-medium mt-1">Challenges</span>
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex flex-col items-center p-3 transition-all ${activeTab === 'lessons' ? 'text-green-500 transform scale-110' : 'text-gray-600'}`}
          >
            <BookOpen size={20} />
            <span className="text-xs font-medium mt-1">Learn</span>
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex flex-col items-center p-3 transition-all ${activeTab === 'leaderboard' ? 'text-green-500 transform scale-110' : 'text-gray-600'}`}
          >
            <Trophy size={20} />
            <span className="text-xs font-medium mt-1">Ranks</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center p-3 transition-all ${activeTab === 'profile' ? 'text-green-500 transform scale-110' : 'text-gray-600'}`}
          >
            <User size={20} />
            <span className="text-xs font-medium mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default EcoLearnPlatform;
