import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import UserLogin from './pages/user/UserLogin';
import UserSignUp from './pages/user/UserSignUp';
import UserDashboard from './pages/user/UserDashboard';
import UserProfile from './pages/user/UserProfile';
import EditProfile from './pages/user/EditProfile';
import ViewPass from './pages/user/ViewPass';
import CreatePass from './pages/user/CreatePass';
import RenewPass from './pages/user/RenewPass';
import ChangePassword from './pages/user/ChangePassword';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddBus from './pages/admin/AddBus';
import EditBus from './pages/admin/EditBus';
import CreateUser from './pages/admin/CreateUser';
import ViewUsers from './pages/admin/ViewUsers';
import AdminCreatePass from './pages/admin/AdminCreatePass';
import AdminRenewPass from './pages/admin/AdminRenewPass';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/signup" element={<UserSignUp />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* User Protected Routes */}
            <Route path="/user/dashboard" element={
              <ProtectedRoute userType="user">
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/user/profile" element={
              <ProtectedRoute userType="user">
                <UserProfile />
              </ProtectedRoute>
            } />
            <Route path="/user/edit-profile" element={
              <ProtectedRoute userType="user">
                <EditProfile />
              </ProtectedRoute>
            } />
            <Route path="/user/view-pass" element={
              <ProtectedRoute userType="user">
                <ViewPass />
              </ProtectedRoute>
            } />
            <Route path="/user/create-pass" element={
              <ProtectedRoute userType="user">
                <CreatePass />
              </ProtectedRoute>
            } />
            <Route path="/user/renew-pass" element={
              <ProtectedRoute userType="user">
                <RenewPass />
              </ProtectedRoute>
            } />
            <Route path="/user/change-password" element={
              <ProtectedRoute userType="user">
                <ChangePassword />
              </ProtectedRoute>
            } />
            
            {/* Admin Protected Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute userType="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/add-bus" element={
              <ProtectedRoute userType="admin">
                <AddBus />
              </ProtectedRoute>
            } />
            <Route path="/admin/edit-bus" element={
              <ProtectedRoute userType="admin">
                <EditBus />
              </ProtectedRoute>
            } />
            <Route path="/admin/create-user" element={
              <ProtectedRoute userType="admin">
                <CreateUser />
              </ProtectedRoute>
            } />
            <Route path="/admin/view-users" element={
              <ProtectedRoute userType="admin">
                <ViewUsers />
              </ProtectedRoute>
            } />
            <Route path="/admin/create-pass" element={
              <ProtectedRoute userType="admin">
                <AdminCreatePass />
              </ProtectedRoute>
            } />
            <Route path="/admin/renew-pass" element={
              <ProtectedRoute userType="admin">
                <AdminRenewPass />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;