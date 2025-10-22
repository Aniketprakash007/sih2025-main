import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Verify from './pages/Verify';
import EcoLearnPlatform from './EcoLearnPlatform';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />

        {/* Private routes */}
        <Route
          path="/ecolearn/*"
          element={
            <PrivateRoute>
              <EcoLearnPlatform />
            </PrivateRoute>
          }
        />

        {/* Default route: redirect to login if not logged in */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
