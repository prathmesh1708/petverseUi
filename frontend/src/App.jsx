import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './UserApplication/Authentication/AuthLayout';
import Login from './UserApplication/Authentication/Login';
import Signup from './UserApplication/Authentication/Signup';
import ForgotPassword from './UserApplication/Authentication/ForgotPassword';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
      
      {/* Home Route placeholder */}
      <Route path="/" element={
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Welcome to PetVerse!</h1>
          <p>You have successfully logged in.</p>
          <a href="/auth/login" className="btn-primary" style={{ marginTop: '1rem' }}>Go back to login</a>
        </div>
      } />
      
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

export default App;
