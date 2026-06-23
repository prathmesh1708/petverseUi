import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Phone, KeyRound, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const containerRef = useRef(null);
  const [step, setStep] = useState('request'); // request, verify, reset, success

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.anim-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, [step]); // Re-animate on step change

  const handleNextStep = (e, nextStep) => {
    e.preventDefault();
    setStep(nextStep);
  };

  return (
    <div className="auth-glass-panel" ref={containerRef}>
      <div className="auth-header anim-item">
        <h2>Password Recovery</h2>
        <p>Follow the steps to reset your PetVerse password</p>
      </div>

      <div style={{ position: 'relative', minHeight: '220px' }}>
        {step === 'request' && (
          <form onSubmit={(e) => handleNextStep(e, 'verify')} className="anim-item">
            <div className="form-group">
              <label>Registered Mobile Number</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="tel" 
                  className="form-control" 
                  placeholder="+1 (555) 000-0000"
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                  required
                />
                <Phone size={18} color="var(--color-text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              <p className="error-text" style={{ display: 'none' }}>Number not found</p>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Send OTP
            </button>
          </form>
        )}

        {step === 'verify' && (
          <form onSubmit={(e) => handleNextStep(e, 'reset')} className="anim-item">
            <div className="form-group">
              <label>Enter 6-digit OTP</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="0 0 0 0 0 0"
                  style={{ width: '100%', paddingLeft: '2.5rem', letterSpacing: '0.2rem', textAlign: 'center' }}
                  maxLength="6"
                  required
                />
                <KeyRound size={18} color="var(--color-text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Verify OTP
            </button>
            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
              Didn't receive code? <a href="#" onClick={(e) => e.preventDefault()}>Resend</a>
            </div>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={(e) => handleNextStep(e, 'success')} className="anim-item">
            <div className="form-group">
              <label>New Password</label>
              <input type="password" className="form-control" placeholder="Enter new password" required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" className="form-control" placeholder="Confirm new password" required />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              Reset Password
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="anim-item" style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle size={64} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Password Reset!</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Your password has been successfully updated.</p>
            <Link to="/auth/login" className="btn-primary" style={{ width: '100%', textDecoration: 'none' }}>
              Go to Login
            </Link>
          </div>
        )}
      </div>

      {step !== 'success' && (
        <div className="anim-item" style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/auth/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
