import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages - Auth
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Pages - Shared
import HomePage from './pages/shared/HomePage';
import ProfilePage from './pages/shared/ProfilePage';
import NotFoundPage from './pages/shared/NotFoundPage';

// Pages - Student
import LostItemsPage from './pages/student/LostItemsPage';
import LostItemDetailPage from './pages/student/LostItemDetailPage';
import FoundItemsPage from './pages/student/FoundItemsPage';
import SearchFoundItemsPage from './pages/student/SearchFoundItemsPage';
import FoundItemDetailPage from './pages/student/FoundItemDetailPage';
import MyTransactionsPage from './pages/student/MyTransactionsPage';

// Pages - Staff
import LostItemsManagementPage from './pages/staff/LostItemsManagementPage';
import ReturnsManagementPage from './pages/staff/ReturnsManagementPage';
import ReturnDetailPage from './pages/staff/ReturnDetailPage';
import ReportsPage from './pages/staff/ReportsPage';
import FoundItemsManagementPage from './pages/staff/FoundItemsManagementPage';

// Layouts
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';

import './styles/index.css';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app">
      {!isAuthPage ? (
        <div className="app-container">
          <Sidebar />
          <main className="app-main">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/lost-items/management"
                element={
                  <ProtectedRoute>
                    <LostItemsManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lost-items/:id"
                element={
                  <ProtectedRoute>
                    <LostItemDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lost-items"
                element={
                  <ProtectedRoute>
                    <LostItemsPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/found-items/management"
                element={
                  <ProtectedRoute>
                    <FoundItemsManagementPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/found-items"
                element={
                  <ProtectedRoute>
                    <FoundItemsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/found-items/search"
                element={
                  <ProtectedRoute>
                    <SearchFoundItemsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/found-items/:id"
                element={
                  <ProtectedRoute>
                    <FoundItemDetailPage />
                  </ProtectedRoute>
                }
              />
              

              <Route
                path="/returns/management"
                element={
                  <ProtectedRoute>
                    <ReturnsManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/returns/my-transactions"
                element={
                  <ProtectedRoute>
                    <MyTransactionsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/returns/:transactionId"
                element={
                  <ProtectedRoute>
                    <ReturnDetailPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <ReportsPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      )}
      {!isAuthPage && <Footer />}
      <Toaster position="top-right" />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

