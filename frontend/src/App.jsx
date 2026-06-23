import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './UserApplication/AuthenticationModule/AuthLayout';
import Login from './UserApplication/AuthenticationModule/Login';
import Signup from './UserApplication/AuthenticationModule/Signup';
import ForgotPassword from './UserApplication/AuthenticationModule/ForgotPassword';
import Dashboard from './UserApplication/Home/Dashboard';
import './App.css';
import Testing from './components/Testing';


function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />


          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/testing" element={<Testing/>}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
