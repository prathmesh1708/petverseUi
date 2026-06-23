import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate successful login
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, { 
        scale: 0.95, 
        opacity: 0, 
        duration: 0.5, 
        onComplete: () => navigate('/dashboard') 
      });
    });
    return () => ctx.revert();
  };

  useEffect(() => {
    // GSAP entrance animation for the login form elements
    const ctx = gsap.context(() => {
      gsap.from('.stagger-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="auth-glass-panel" ref={containerRef}>
      <div className="auth-header stagger-item">
        <h2>Welcome Back</h2>
        <p>Login to PetVerse to connect with the community</p>
      </div>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <div className="form-group stagger-item" style={{ marginBottom: '0' }}>
          <label>Email or Mobile Number</label>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter your email or mobile"
              style={{ width: '100%', paddingLeft: '2.5rem' }}
            />
            <Mail size={18} color="var(--color-text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div className="form-group stagger-item">
          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter your password"
              style={{ width: '100%', paddingLeft: '2.5rem' }}
            />
            <Lock size={18} color="var(--color-text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div className="auth-links stagger-item" style={{ marginTop: '0', marginBottom: '0.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/auth/forgot-password">Forgot Password?</Link>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}>
          Login
        </button>

        <div className="stagger-item" style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/auth/signup">Create Account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
