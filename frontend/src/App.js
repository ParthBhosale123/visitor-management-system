import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Visitor Form - Public Route */}
          <Route path="/" element={<Home />} />

          {/* HR Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* HR Dashboard - Protected Route */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        {/* ✅ Floating HR Login Button only on Home page */}
        <ShowLoginButton />
      </div>
    </Router>
  );
}

// ✅ Helper component to show button only on Home page
function ShowLoginButton() {
  const location = useLocation();

  if (location.pathname !== '/') return null;

  return (
    <div className="fixed bottom-6 right-6">
      <Link
        to="/login"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
      >
        HR Login
      </Link>
    </div>
  );
}

export default App;
