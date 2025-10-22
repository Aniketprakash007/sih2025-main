import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, Leaf, Users, BookOpen, Target, Award, Star, TreePine, 
  Recycle, Zap, Globe, Camera, CheckCircle, Play, User, Menu, X, 
  MapPin, Clock, Upload, Search, Bell, TrendingUp, BarChart3, Map, 
  Wind, Droplets, Sun, Sparkles 
} from 'lucide-react';
import './App.css';


const EcoLearnPlatform = () => {
  const [currentUser, setCurrentUser] = useState({
    name: 'Admin',
    school: 'Delhi Public School, Kanpur',
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
  const [completedChallenges, setCompletedChallenges] = useState([1, 4]);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New challenge: Plant a sapling and earn 50 eco-points!', type: 'challenge', time: '2 hours ago', read: false },
    { id: 2, text: 'Your school ranked #3 in this week\'s leaderboard!', type: 'achievement', time: '5 hours ago', read: false },
    { id: 3, text: 'Ravi Kumar completed the same challenge as you!', type: 'social', time: '1 day ago', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [weatherData, setWeatherData] = useState({ temp: 28, condition: 'sunny', aqi: 95 });
  const [realTimeStats, setRealTimeStats] = useState({
    treesPlanted: 1234,
    wasteRecycled: 567,
    carbonSaved: 89.2,
    studentsActive: 2456
  });
  const [mapView, setMapView] = useState('schools');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Advanced challenges with dynamic content
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'Tree Planting Mission',
      description: 'Plant a sapling and upload photo proof with GPS location',
      points: 50,
      difficulty: 'Medium',
      category: 'Conservation',
      timeLimit: '7 days',
      participants: 234,
      completed: false,
      trending: true,
      location: 'Chandigarh',
      requirements: ['GPS location', 'Photo proof', 'Species identification'],
      impact: 'Saves 22kg CO2 annually',
      sponsored: true
    },
    {
      id: 2,
      title: 'Waste Segregation Master',
      description: 'Create a waste segregation system at home and track for a week',
      points: 30,
      difficulty: 'Easy',
      category: 'Waste Management',
      timeLimit: '7 days',
      participants: 456,
      completed: false,
      trending: false,
      location: 'Any',
      requirements: ['Daily photos', 'Weight tracking', 'Weekly report'],
      impact: 'Reduces landfill waste by 70%'
    },
    {
      id: 3,
      title: 'Energy Conservation Detective',
      description: 'Audit your home energy usage and implement 5 saving measures',
      points: 40,
      difficulty: 'Medium',
      category: 'Energy',
      timeLimit: '10 days',
      participants: 189,
      completed: false,
      trending: true,
      location: 'Home',
      requirements: ['Energy bill analysis', 'Before/after photos', 'Savings calculation'],
      impact: 'Saves 15% monthly electricity'
    },
    {
      id: 4,
      title: 'Biodiversity Documentation',
      description: 'Document 10 different species in your local area using our AI identifier',
      points: 60,
      difficulty: 'Hard',
      category: 'Conservation',
      timeLimit: '14 days',
      participants: 123,
      completed: true,
      trending: true,
      location: 'Local area',
      requirements: ['AI species identification', 'Location mapping', 'Behavior notes'],
      impact: 'Contributes to biodiversity database'
    },
    {
      id: 5,
      title: 'Water Quality Testing',
      description: 'Test and analyze local water sources using our digital kit',
      points: 45,
      difficulty: 'Medium',
      category: 'Water',
      timeLimit: '5 days',
      participants: 298,
      completed: false,
      trending: false,
      location: 'Local water bodies',
      requirements: ['pH testing', 'Turbidity check', 'Pollution assessment'],
      impact: 'Monitors community water health'
    }
  ]);

  // Interactive lessons with progress tracking
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: 'Climate Change Science',
      description: 'Understanding the greenhouse effect and global warming',
      duration: '25 min',
      progress: 100,
      category: 'Climate Science',
      level: 'Beginner',
      modules: 4,
      completed: true,
      rating: 4.8,
      interactive: true,
      hasQuiz: true,
      difficulty: 'Easy'
    },
    {
      id: 2,
      title: 'Indian Biodiversity Hotspots',
      description: 'Exploring Western Ghats, Himalayas, and other biodiversity regions',
      duration: '35 min',
      progress: 60,
      category: 'Conservation',
      level: 'Intermediate',
      modules: 6,
      completed: false,
      rating: 4.9,
      interactive: true,
      hasQuiz: true,
      difficulty: 'Medium'
    },
    {
      id: 3,
      title: 'Renewable Energy Technologies',
      description: 'Solar, wind, hydro, and biomass energy solutions for India',
      duration: '40 min',
      progress: 0,
      category: 'Energy',
      level: 'Advanced',
      modules: 8,
      completed: false,
      rating: 4.7,
      interactive: true,
      hasQuiz: true,
      difficulty: 'Hard'
    },
    {
      id: 4,
      title: 'Water Conservation Techniques',
      description: 'Rainwater harvesting, greywater recycling, and smart irrigation',
      duration: '30 min',
      progress: 85,
      category: 'Water Management',
      level: 'Intermediate',
      modules: 5,
      completed: false,
      rating: 4.6,
      interactive: true,
      hasQuiz: true,
      difficulty: 'Medium'
    },
    {
      id: 5,
      title: 'Sustainable Agriculture',
      description: 'Organic farming, crop rotation, and soil health management',
      duration: '45 min',
      progress: 25,
      category: 'Agriculture',
      level: 'Advanced',
      modules: 7,
      completed: false,
      rating: 4.8,
      interactive: true,
      hasQuiz: true,
      difficulty: 'Hard'
    }
  ]);

  // Dynamic leaderboard with real-time updates
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, school: 'DAV Public School, Mohali', points: 15420, students: 245, change: '+2', trend: 'up', badge: 'gold' },
    { rank: 2, school: 'St. John\'s High School, Chandigarh', points: 14250, students: 198, change: '-1', trend: 'down', badge: 'silver' },
    { rank: 3, school: 'Delhi Public School, Chandigarh', points: 13890, students: 220, change: '+1', trend: 'up', badge: 'bronze' },
    { rank: 4, school: 'Sacred Heart School, Ludhiana', points: 12760, students: 185, change: '0', trend: 'same', badge: null },
    { rank: 5, school: 'Ryan International, Amritsar', points: 11980, students: 167, change: '-2', trend: 'down', badge: null }
  ]);

  // Quiz questions for interactive learning
  const quizQuestions = [
    {
      question: "What is the main cause of global warming?",
      options: ["Deforestation", "Greenhouse gases", "Ocean pollution", "Ozone depletion"],
      correct: 1,
      explanation: "Greenhouse gases trap heat in the atmosphere, causing global temperatures to rise."
    },
    {
      question: "Which renewable energy source is most abundant in India?",
      options: ["Wind", "Solar", "Hydro", "Biomass"],
      correct: 1,
      explanation: "India receives abundant solar radiation throughout the year, making solar energy highly viable."
    },
    {
      question: "What percentage of waste can be recycled from household garbage?",
      options: ["30%", "50%", "70%", "90%"],
      correct: 2,
      explanation: "Around 70% of household waste can be recycled or composted with proper segregation."
    }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        treesPlanted: prev.treesPlanted + Math.floor(Math.random() * 3),
        wasteRecycled: prev.wasteRecycled + Math.floor(Math.random() * 2),
        carbonSaved: prev.carbonSaved + (Math.random() * 0.1),
        studentsActive: prev.studentsActive + Math.floor(Math.random() * 5) - 2
      }));
      
      setWeatherData(prev => ({
        ...prev,
        temp: prev.temp + (Math.random() * 2 - 1),
        aqi: Math.max(0, Math.min(500, prev.aqi + Math.floor(Math.random() * 10 - 5)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Animation trigger
  useEffect(() => {
    setAnimationTrigger(true);
    setTimeout(() => setAnimationTrigger(false), 1000);
  }, [activeTab]);

  // Camera functionality
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Camera access denied or not available');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, 300, 200);
      const imageData = canvasRef.current.toDataURL('image/png');
      setUploadedImage(imageData);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChallengeComplete = (challengeId) => {
    const challenge = challenges.find(c => c.id === challengeId);
    setChallenges(prev => prev.map(c => 
      c.id === challengeId ? { ...c, completed: true, participants: c.participants + 1 } : c
    ));
    setCompletedChallenges([...completedChallenges, challengeId]);
    setCurrentUser(prev => ({
      ...prev,
      ecoPoints: prev.ecoPoints + challenge.points,
      challengesCompleted: prev.challengesCompleted + 1
    }));
    setNotifications(prev => [
      { 
        id: Date.now(), 
        text: `🎉 Congratulations! You earned ${challenge.points} eco-points for "${challenge.title}"!`, 
        type: 'achievement', 
        time: 'just now',
        read: false 
      },
      ...prev
    ]);
    setAnimationTrigger(true);
  };

  const startQuiz = (lessonId) => {
    setShowQuiz(true);
    setCurrentQuizQuestion(0);
    setQuizScore(0);
  };

  const answerQuiz = (selectedAnswer) => {
    if (selectedAnswer === quizQuestions[currentQuizQuestion].correct) {
      setQuizScore(prev => prev + 1);
    }
    
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(prev => prev + 1);
    } else {
      // Quiz completed
      const points = quizScore * 10;
      setCurrentUser(prev => ({
        ...prev,
        ecoPoints: prev.ecoPoints + points
      }));
      setShowQuiz(false);
      setNotifications(prev => [
        { 
          id: Date.now(), 
          text: `Quiz completed! You earned ${points} points with ${quizScore}/${quizQuestions.length} correct answers!`, 
          type: 'achievement', 
          time: 'just now',
          read: false 
        },
        ...prev
      ]);
    }
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Dynamic Welcome Section with Weather */}
      <div className="bg-blue-500 text-white p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back, {currentUser.name}! 🌱</h2>
              <p className="opacity-90">{currentUser.school} • {currentUser.grade}</p>
            </div>
            <div className="text-right bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Sun className="text-yellow-300" size={20} />
                <span className="text-lg font-bold">{Math.round(weatherData.temp)}°C</span>
              </div>
              <div className="text-sm">AQI: {Math.round(weatherData.aqi)}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg transform hover:scale-105 transition-transform">
              <div className={`text-3xl font-bold transition-all duration-1000 ${animationTrigger ? 'animate-bounce' : ''}`}>
                {currentUser.ecoPoints.toLocaleString()}
              </div>
              <div className="text-sm opacity-80">Eco Points</div>
            </div>
            <div className="text-center p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold">{currentUser.streak}</div>
              <div className="text-sm opacity-80">Day Streak 🔥</div>
            </div>
            <div className="text-center p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold">{currentUser.badges.length}</div>
              <div className="text-sm opacity-80">Badges</div>
            </div>
            <div className="text-center p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg transform hover:scale-105 transition-transform">
              <div className="text-lg font-bold">{currentUser.level}</div>
              <div className="text-sm opacity-80">Level</div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Environmental Impact */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-green-500" />
          Live Environmental Impact
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <TreePine className="mx-auto text-green-500 mb-2" size={32} />
            <div className="text-2xl font-bold text-green-600">{realTimeStats.treesPlanted.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Trees Planted Today</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <Recycle className="mx-auto text-green-500 mb-2" size={32} />
            <div className="text-2xl font-bold text-green-600">{realTimeStats.wasteRecycled} kg</div>
            <div className="text-sm text-gray-600">Waste Recycled</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <Wind className="mx-auto text-green-500 mb-2" size={32} />
            <div className="text-2xl font-bold text-green-600">{realTimeStats.carbonSaved.toFixed(1)} kg</div>
            <div className="text-sm text-gray-600">CO2 Saved</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <Users className="mx-auto text-green-500 mb-2" size={32} />
            <div className="text-2xl font-bold text-green-600">{realTimeStats.studentsActive.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Active Students</div>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold flex items-center">
            <Map className="mr-2 text-blue-500" />
            Environmental Activity Map
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setMapView('schools')}
              className={`px-3 py-1 rounded-lg text-sm ${mapView === 'schools' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              Schools
            </button>
            <button
              onClick={() => setMapView('challenges')}
              className={`px-3 py-1 rounded-lg text-sm ${mapView === 'challenges' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
            >
              Challenges
            </button>
          </div>
        </div>
        <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-green-500 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          <div className="text-center z-10">
            <MapPin className="mx-auto text-green-600 mb-2" size={48} />
            <h4 className="text-lg font-semibold">Punjab Environmental Activity</h4>
            <p className="text-gray-600">
              {mapView === 'schools' ? '245 schools participating' : '1,234 active challenges'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => setActiveTab('challenges')}
          className=" bg-green-500 text-white p-6 rounded-2xl hover:scale-105 transform transition-all"
        >
          <Target className="mb-3" size={32} />
          <h4 className="text-lg font-bold mb-2">New Challenges</h4>
          <p className="text-sm opacity-90">5 challenges waiting for you</p>
        </button>
        
        <button
          onClick={() => setActiveTab('lessons')}
          className=" bg-green-500 text-white p-6 rounded-2xl hover:scale-105 transform transition-all"
        >
          <BookOpen className="mb-3" size={32} />
          <h4 className="text-lg font-bold mb-2">Continue Learning</h4>
          <p className="text-sm opacity-90">3 lessons in progress</p>
        </button>
        
        <button
          onClick={() => setActiveTab('leaderboard')}
          className=" bg-green-500 text-white p-6 rounded-2xl hover:scale-105 transform transition-all"
        >
          <Trophy className="mb-3" size={32} />
          <h4 className="text-lg font-bold mb-2">School Ranking</h4>
          <p className="text-sm opacity-90">Your school is #3</p>
        </button>
      </div>
    </div>
  );

  const ChallengesView = () => (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold text-gray-800">Environmental Challenges</h2>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full md:w-64"
              />
            </div>
            
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Conservation">Conservation</option>
              <option value="Waste Management">Waste Management</option>
              <option value="Energy">Energy</option>
              <option value="Water">Water</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges
          .filter(challenge => 
            (selectedFilter === 'all' || challenge.category === selectedFilter) &&
            (searchQuery === '' || challenge.title.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map((challenge) => (
          <div key={challenge.id} className={`bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all transform hover:scale-105 border ${
            challenge.completed ? 'border-green-200 bg-green-50' : 'border-gray-100'
          }`}>
            {/* Challenge Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`p-3 rounded-xl ${
                  challenge.category === 'Conservation' ? 'bg-green-100 text-green-600' :
                  challenge.category === 'Waste Management' ? 'bg-orange-100 text-orange-600' :
                  challenge.category === 'Energy' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {challenge.category === 'Conservation' ? <TreePine size={24} /> :
                   challenge.category === 'Waste Management' ? <Recycle size={24} /> :
                   challenge.category === 'Energy' ? <Zap size={24} /> :
                   <Droplets size={24} />}
                </div>
                <div>
                  {challenge.trending && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 mb-1">
                      🔥 Trending
                    </span>
                  )}
                  {challenge.sponsored && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 mb-1 ml-1">
                      ✨ Sponsored
                    </span>
                  )}
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-500">+{challenge.points}</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
            
            {/* Challenge Content */}
            <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
            <p className="text-gray-600 mb-4">{challenge.description}</p>
            
            {/* Challenge Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="mr-2" size={16} />
                {challenge.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="mr-2" size={16} />
                {challenge.timeLimit}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="mr-2" size={16} />
                {challenge.participants} participating
              </div>
            </div>
            
            {/* Impact Badge */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center text-green-700">
                <Sparkles className="mr-2" size={16} />
                <span className="text-sm font-medium">{challenge.impact}</span>
              </div>
            </div>
            
            {/* Requirements */}
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2">Requirements:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {challenge.requirements.map((req, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="mr-2 text-green-500" size={12} />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Action Button */}
            <button
              onClick={() => challenge.completed ? null : setSelectedChallenge(challenge)}
              disabled={challenge.completed}
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                challenge.completed
                  ? 'bg-green-200 text-green-800 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600 transform hover:scale-105'
              }`}>

              {challenge.completed ? '✓ Completed' : 'Accept Challenge'}
            </button>
          </div>
        ))}
      </div>

      {/* Challenge Detail Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold">{selectedChallenge.title}</h3>
                <button
                  onClick={() => setSelectedChallenge(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Challenge Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Points:</span>
                      <div className="text-2xl font-bold text-green-500">+{selectedChallenge.points}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Difficulty:</span>
                      <div className="font-semibold">{selectedChallenge.difficulty}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Time Limit:</span>
                      <div className="font-semibold">{selectedChallenge.timeLimit}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Participants:</span>
                      <div className="font-semibold">{selectedChallenge.participants}</div>
                    </div>
                  </div>
                </div>

                {/* Photo Upload Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <h4 className="font-semibold mb-4">Upload Proof</h4>
                  
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img src={uploadedImage} alt="Uploaded proof" className="mx-auto max-w-full h-48 object-cover rounded-lg" />
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => setUploadedImage(null)}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => handleChallengeComplete(selectedChallenge.id)}
                          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          Submit Challenge
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera className="mx-auto text-gray-400" size={48} />
                      
                      {cameraActive ? (
                        <div className="space-y-4">
                          <video ref={videoRef} autoPlay className="mx-auto rounded-lg" width="300" height="200" />
                          <canvas ref={canvasRef} width="300" height="200" className="hidden" />
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={capturePhoto}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                              Capture
                            </button>
                            <button
                              onClick={stopCamera}
                              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={startCamera}
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            <Camera className="mr-2" size={16} />
                            Take Photo
                          </button>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          >
                            <Upload className="mr-2" size={16} />
                            Upload File
                          </button>
                        </div>
                      )}
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const LessonsView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Interactive Lessons</h2>
          <div className="flex space-x-4">
            <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
              <option>All Categories</option>
              <option>Climate Science</option>
              <option>Conservation</option>
              <option>Energy</option>
              <option>Water Management</option>
              <option>Agriculture</option>
            </select>
            <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-blue-500 text-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold mb-4">Your Learning Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{lessons.filter(l => l.completed).length}</div>
            <div className="text-sm opacity-80">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{lessons.filter(l => l.progress > 0 && !l.completed).length}</div>
            <div className="text-sm opacity-80">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{Math.round(lessons.reduce((acc, l) => acc + l.progress, 0) / lessons.length)}%</div>
            <div className="text-sm opacity-80">Overall Progress</div>
          </div>
        </div>
      </div>
      
      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all border border-gray-100">
            {/* Lesson Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl ${
                  lesson.category === 'Climate Science' ? 'bg-blue-100 text-blue-600' :
                  lesson.category === 'Conservation' ? 'bg-green-100 text-green-600' :
                  lesson.category === 'Energy' ? 'bg-yellow-100 text-yellow-600' :
                  lesson.category === 'Water Management' ? 'bg-cyan-100 text-cyan-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{lesson.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{lesson.category}</span>
                    <span>•</span>
                    <span>{lesson.level}</span>
                    <span>•</span>
                    <span>{lesson.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <button className={`p-3 rounded-xl text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${
                  lesson.completed ? 'bg-gray-500' : lesson.progress > 0 ? 'bg-gray-500' : 'bg-gray-500'
                }`}>
                  {lesson.completed ? <CheckCircle size={20} /> : <Play size={20} />}
                </button>
                
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-500" size={16} />
                  <span className="text-sm font-medium">{lesson.rating}</span>
                </div>
              </div>
            </div>
            
            {/* Lesson Content */}
            <p className="text-gray-600 mb-4">{lesson.description}</p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Progress</span>
                <span className="text-gray-500">{lesson.progress}% • {lesson.modules} modules</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    lesson.completed ? 'bg-green-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${lesson.progress}%` }}
                />
              </div>
            </div>
            
            {/* Features */}
            <div className="flex items-center space-x-4 mb-4 text-sm">
              {lesson.interactive && (
                <span className="flex items-center text-blue-600">
                  <Zap className="mr-1" size={12} />
                  Interactive
                </span>
              )}
              {lesson.hasQuiz && (
                <span className="flex items-center text-purple-600">
                  <Target className="mr-1" size={12} />
                  Quiz
                </span>
              )}
              <span className={`px-2 py-1 rounded-full text-xs ${
                lesson.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                lesson.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {lesson.difficulty}
              </span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                lesson.completed 
                  ? 'bg-blue-500 text-gray-200'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}>
                {lesson.progress === 0 ? 'Start Lesson' : lesson.completed ? 'Review' : 'Continue'}
              </button>
              
              {lesson.hasQuiz && (
                <button
                  onClick={() => startQuiz(lesson.id)}
                  className="px-4 py-3 bg-gray-500 text-white rounded-xl hover:bg-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Target size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Environmental Quiz</h3>
              <button
                onClick={() => setShowQuiz(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Question {currentQuizQuestion + 1} of {quizQuestions.length}</span>
                <span>Score: {quizScore}/{currentQuizQuestion}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuizQuestion + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-xl font-semibold mb-4">
                  {quizQuestions[currentQuizQuestion].question}
                </h4>
                
                <div className="space-y-3">
                  {quizQuestions[currentQuizQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => answerQuiz(index)}
                      className="w-full text-left p-4 bg-white rounded-lg hover:bg-blue-50 border-2 border-transparent hover:border-blue-200 transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const LeaderboardView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Punjab Schools Leaderboard</h2>
        <p className="text-gray-600">Top performing schools this month</p>
        <div className="flex justify-center space-x-4 mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">This Month</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">All Time</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">This Week</button>
        </div>
      </div>

      {/* Top 3 Schools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leaderboard.slice(0, 3).map((school, index) => (
          <div key={school.rank} className={`relative text-center p-6 rounded-2xl shadow-xl ${
            index === 0 ? 'bg-green-400 text-white transform scale-105' :
            index === 1 ? 'bg-blue-400 text-white' :
            'bg-purple-400 text-white'
          }`}>
            <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
              index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'
            }`}>
              {school.rank}
            </div>
            
            <div className="mt-6">
              <Trophy className="mx-auto mb-3" size={48} />
              <h3 className="text-xl font-bold mb-2">{school.school}</h3>
              <div className="text-3xl font-bold mb-1">{school.points.toLocaleString()}</div>
              <div className="text-sm opacity-90">eco-points</div>
              <div className="text-sm opacity-75 mt-2">{school.students} students</div>
              
              <div className={`inline-flex items-center mt-3 px-3 py-1 rounded-full text-sm ${
                school.trend === 'up' ? 'bg-gray-100 text-green-600' :
                school.trend === 'down' ? 'bg-gray-100 text-red-600' : 'bg-white-500'
              }`}>
                {school.trend === 'up' ? '↑' : school.trend === 'down' ? '↓' : '→'} {school.change}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Full Leaderboard */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600  p-6 text-white">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <BarChart3 className="mr-2" />
            Complete Rankings
          </h3>
        </div>
        
        <div className="divide-y">
          {leaderboard.map((school, index) => (
            <div key={school.rank} className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${
              school.rank === 3 ? 'bg-green-50 border-l-4 border-green-500' : ''
            }`}>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  school.rank === 1 ? 'bg-yellow-500 text-white' :
                  school.rank === 2 ? 'bg-gray-400 text-white' :
                  school.rank === 3 ? 'bg-orange-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {school.rank}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{school.school}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Users className="mr-1" size={16} />
                      {school.students} students
                    </span>
                    <span className={`flex items-center px-2 py-1 rounded-full ${
                      school.trend === 'up' ? 'bg-green-100 text-green-800' :
                      school.trend === 'down' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {school.trend === 'up' ? '↑' : school.trend === 'down' ? '↓' : '→'} {school.change}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-500">{school.points.toLocaleString()}</div>
                <div className="text-sm text-gray-500">eco-points</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Individual Student Rankings */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Top Students This Week</h3>
          <button className="text-blue-500 hover:text-blue-600 font-medium">View All</button>
        </div>
        
        <div className="space-y-4">
          {[
            { name: 'Arjun Kumar', school: 'DAV Public School', points: 580, avatar: 'AK', badge: 'Tree Master' },
            { name: 'Sneha Patel', school: 'St. John\'s High School', points: 545, avatar: 'SP', badge: 'Eco Warrior' },
            { name: 'Priya Sharma', school: 'Delhi Public School', points: 520, avatar: 'PS', badge: 'Climate Hero' },
            { name: 'Rahul Singh', school: 'Sacred Heart School', points: 498, avatar: 'RS', badge: 'Energy Saver' },
            { name: 'Maya Gupta', school: 'Ryan International', points: 476, avatar: 'MG', badge: 'Water Guardian' }
          ].map((student, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-orange-500' :
                  'bg-blue-500'
                }`}>
                  {student.avatar}
                </div>
                <div>
                  <div className="font-bold text-lg">{student.name}</div>
                  <div className="text-sm text-gray-600">{student.school}</div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                    {student.badge}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-green-500">{student.points}</div>
                <div className="text-sm text-gray-500">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-blue-500 text-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <div className="w-32 h-32 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl font-bold">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2">
              <Star className="text-white" size={20} />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold mb-2">{currentUser.name}</h2>
            <p className="text-xl opacity-90 mb-1">{currentUser.level}</p>
            <p className="opacity-75">{currentUser.school} • {currentUser.grade}</p>
            <p className="text-sm opacity-75 mt-2">
              Joined {new Date(currentUser.joinDate).toLocaleDateString('en-IN', { 
                year: 'numeric', month: 'long', day: 'numeric' 
              })}
            </p>
            
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <button className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all">
                Edit Profile
              </button>
              <button className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all">
                Share Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 hover:shadow-2xl transition-shadow">
          <div className="text-3xl font-bold text-green-500">{currentUser.ecoPoints.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Total Eco-Points</div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-green-500 rounded-full" style={{width: '75%'}}></div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 hover:shadow-2xl transition-shadow">
          <div className="text-3xl font-bold text-green-500">{currentUser.challengesCompleted}</div>
          <div className="text-sm text-gray-600 mt-1">Challenges</div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-green-500 rounded-full" style={{width: '60%'}}></div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 hover:shadow-2xl transition-shadow">
          <div className="text-3xl font-bold text-green-500">{currentUser.lessonsCompleted}</div>
          <div className="text-sm text-gray-600 mt-1">Lessons</div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-green-500 rounded-full" style={{width: '85%'}}></div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 hover:shadow-2xl transition-shadow">
          <div className="text-3xl font-bold text-green-500">{currentUser.carbonSaved}</div>
          <div className="text-sm text-gray-600 mt-1">CO₂ Saved (kg)</div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-green-500 rounded-full" style={{width: '45%'}}></div>
          </div>
        </div>
      </div>

      {/* Achievement Showcase */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Award className="mr-3 text-yellow-500" />
          Badges & Achievements
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {currentUser.badges.map((badge, index) => (
            <div key={index} className="text-center p-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all">
              <Star className="mx-auto mb-2" size={24} />
              <div className="font-bold text-sm">{badge}</div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
          <h4 className="font-bold text-lg mb-4">Recent Achievements</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Trophy className="text-white" size={16} />
              </div>
              <div>
                <div className="font-semibold">Climate Hero Badge Earned</div>
                <div className="text-sm text-gray-600">Completed 15 climate-related challenges</div>
                <div className="text-xs text-gray-500">2 days ago</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <BookOpen className="text-white" size={16} />
              </div>
              <div>
                <div className="font-semibold">Knowledge Seeker</div>
                <div className="text-sm text-gray-600">Completed 20 lessons with 95%+ score</div>
                <div className="text-xs text-gray-500">1 week ago</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <Users className="text-white" size={16} />
              </div>
              <div>
                <div className="font-semibold">Community Leader</div>
                <div className="text-sm text-gray-600">Inspired 10+ classmates to join challenges</div>
                <div className="text-xs text-gray-500">2 weeks ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Clock className="mr-3 text-blue-500" />
          Recent Activity
        </h3>
        
        <div className="space-y-4">
          {[
            { action: 'Completed', item: 'Water Conservation Quiz', points: 25, time: '2 hours ago', icon: Droplets, color: 'blue' },
            { action: 'Uploaded proof for', item: 'Tree Planting Challenge', points: 50, time: '1 day ago', icon: TreePine, color: 'green' },
            { action: 'Started lesson', item: 'Renewable Energy Technologies', points: 0, time: '2 days ago', icon: BookOpen, color: 'purple' },
            { action: 'Joined challenge', item: 'Biodiversity Documentation', points: 0, time: '3 days ago', icon: Camera, color: 'orange' },
            { action: 'Earned badge', item: 'Energy Saver', points: 100, time: '1 week ago', icon: Award, color: 'yellow' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className={`p-3 rounded-full ${
                activity.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                activity.color === 'green' ? 'bg-green-100 text-green-600' :
                activity.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                activity.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                <activity.icon size={20} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">
                  {activity.action} "{activity.item}"
                </div>
                <div className="text-sm text-gray-600">{activity.time}</div>
              </div>
              {activity.points > 0 && (
                <div className="text-green-500 font-bold">+{activity.points} pts</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Globe className="mr-3 text-green-500" />
          Your Environmental Impact
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <TreePine className="text-green-600" size={24} />
                <div>
                  <div className="font-semibold">Trees Planted</div>
                  <div className="text-sm text-gray-600">Direct contribution</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600">12</div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Recycle className="text-blue-600" size={24} />
                <div>
                  <div className="font-semibold">Waste Recycled</div>
                  <div className="text-sm text-gray-600">This month</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600">34 kg</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Zap className="text-purple-600" size={24} />
                <div>
                  <div className="font-semibold">Energy Saved</div>
                  <div className="text-sm text-gray-600">Monthly average</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-600">15%</div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Wind className="text-orange-600" size={24} />
                <div>
                  <div className="font-semibold">Carbon Footprint</div>
                  <div className="text-sm text-gray-600">Reduced by</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-orange-600">-28%</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl text-center">
          <div className="text-lg font-semibold mb-2">🌍 Global Impact Equivalent</div>
          <div className="text-sm opacity-90">
            Your actions this month are equivalent to removing a car from the road for 3.2 days!
          </div>
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all transform hover:scale-105 ${
        activeTab === id
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
          : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
      }`}
    >
      <Icon size={20} />
      <span className="hidden md:inline font-medium">{label}</span>
    </button>
  );
const handleLogout = () => {
  // 1. Clear authentication tokens (from localStorage/sessionStorage)
  localStorage.removeItem('authToken'); // or sessionStorage.removeItem('authToken')
  
  // 2. Clear user info from state (optional, if you store currentUser in context or redux)
  setCurrentUser(null);

  // 3. Redirect to login page
  window.location.href = '/login'; // or use navigate('/login') if using react-router
};

return (
  <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <header className="bg-white shadow-lg border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left: Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Leaf className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  प्रकृति पाठशाला
                </h1>
                <div className="text-xs text-gray-500">Smart Environmental Education</div>
              </div>
            </div>
          </div>

          {/* Center & Right: Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
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

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
              >
                <Bell size={20} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-bold text-lg">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 border-b hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full ${
                            notification.type === 'challenge' ? 'bg-green-100 text-green-600' :
                            notification.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {notification.type === 'challenge' ? <Target size={16} /> :
                             notification.type === 'achievement' ? <Award size={16} /> :
                             <Users size={16} />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{notification.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Button */}
            <button 
              onClick={() => setActiveTab('profile')}
              className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
            >
              <User size={20} />
            </button>
<button
  onClick={() => window.open('/sihhh.html', '_blank')}
  className="p-3 text-blue-600 hover:text-white hover:bg-blue-600 rounded-xl transition-all font-medium"
>
  Feedback
</button>




            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-3 text-red-600 hover:text-white hover:bg-red-600 rounded-xl transition-all font-medium"
            >
              Logout
            </button>
          </div>

                      


          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>

    {/* Rest of your component remains the same */}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation */}
        <nav className={`mb-6 ${mobileMenuOpen ? 'block' : 'hidden'} md:block`}>
          <div className="flex flex-wrap gap-3 p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
            <TabButton id="dashboard" label="Dashboard" icon={Globe} />
            <TabButton id="challenges" label="Challenges" icon={Target} />
            <TabButton id="lessons" label="Lessons" icon={BookOpen} />
            <TabButton id="leaderboard" label="Leaderboard" icon={Trophy} />
            <TabButton id="profile" label="Profile" icon={User} />
          </div>
        </nav>

        {/* Content */}
        <main className={`transition-all duration-500 ${animationTrigger ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
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
            className={`flex flex-col items-center p-3 transition-all ${
              activeTab === 'dashboard' ? 'text-green-500 transform scale-110' : 'text-gray-600'
            }`}
          >
            <Globe size={20} />
            <span className="text-xs font-medium mt-1">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex flex-col items-center p-3 transition-all ${
              activeTab === 'challenges' ? 'text-green-500 transform scale-110' : 'text-gray-600'
            }`}
          >
            <Target size={20} />
            <span className="text-xs font-medium mt-1">Challenges</span>
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex flex-col items-center p-3 transition-all ${
              activeTab === 'lessons' ? 'text-green-500 transform scale-110' : 'text-gray-600'
            }`}
          >
            <BookOpen size={20} />
            <span className="text-xs font-medium mt-1">Learn</span>
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex flex-col items-center p-3 transition-all ${
              activeTab === 'leaderboard' ? 'text-green-500 transform scale-110' : 'text-gray-600'
            }`}
          >
            <Trophy size={20} />
            <span className="text-xs font-medium mt-1">Ranks</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center p-3 transition-all ${
              activeTab === 'profile' ? 'text-green-500 transform scale-110' : 'text-gray-600'
            }`}
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