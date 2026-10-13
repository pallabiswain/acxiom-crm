import React, { useState } from 'react';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Customers from './Pages/Customers';
import Leads from './Pages/Leads';
import Opportunities from './Pages/Opportunities';
import FollowUps from './Pages/FollowUps';
import AuditLogs from './Pages/AuditLogs';
import Navbar from './components/Navbar';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('currentUser'));
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'register'
  const [activeTab, setActiveTab] = useState('dashboard'); // Active module tab

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  // 1. If not logged in, show Login or Register screens
  if (!isLoggedIn) {
    return (
      <div>
        {currentView === 'login' ? (
          <Login 
            onLoginSuccess={() => setIsLoggedIn(true)} 
            switchToRegister={() => setCurrentView('register')} 
          />
        ) : (
          <Register 
            switchToLogin={() => setCurrentView('login')} 
          />
        )}
      </div>
    );
  }

  // 2. If logged in, render Navbar and switch views based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'customers': return <Customers />;
      case 'leads': return <Leads />;
      case 'opportunities': return <Opportunities />;
      case 'followups': return <FollowUps />;
      case 'audit': return <AuditLogs />;
      default: return <Dashboard />;
    }
  };

  return (
    <div>
      <Navbar setActiveTab={setActiveTab} onLogout={handleLogout} />
      <div style={{ padding: '20px' }}>
        {renderTabContent()}
      </div>
    </div>
  );
}