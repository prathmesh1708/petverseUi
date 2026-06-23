import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './authSlice';
import { Mail, Lock, Smartphone } from 'lucide-react';

export default function Login() {
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'mobile'
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Login Details:', data);
    // Mock Login Action
    dispatch(loginSuccess({
      user: { id: 1, name: 'John Doe', method: loginMethod },
      token: 'mock-jwt-token-xyz'
    }));
    navigate('/');
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--color-primary-dark)' }}>Welcome Back to PetVerse</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>Login to access your pet's world</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          type="button"
          onClick={() => setLoginMethod('email')}
          className={loginMethod === 'email' ? 'btn-primary' : 'btn-secondary'}
          style={{ flex: 1 }}
        >
          Email
        </button>
        <button 
          type="button"
          onClick={() => setLoginMethod('mobile')}
          className={loginMethod === 'mobile' ? 'btn-primary' : 'btn-secondary'}
          style={{ flex: 1 }}
        >
          Mobile (OTP)
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {loginMethod === 'email' ? (
          <>
            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-secondary)' }} />
                <input 
                  type="email" 
                  className="form-control" 
                  style={{ paddingLeft: '2.5rem', width: '100%' }}
                  placeholder="Enter your email"
                  {...register('email', { required: 'Email is required' })} 
                />
              </div>
              {errors.email && <span className="error-text">{errors.email.message}</span>}
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-secondary)' }} />
                <input 
                  type="password" 
                  className="form-control" 
                  style={{ paddingLeft: '2.5rem', width: '100%' }}
                  placeholder="Enter password"
                  {...register('password', { required: 'Password is required' })} 
                />
              </div>
              {errors.password && <span className="error-text">{errors.password.message}</span>}
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label>Mobile Number</label>
              <div style={{ position: 'relative' }}>
                <Smartphone size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-secondary)' }} />
                <input 
                  type="tel" 
                  className="form-control" 
                  style={{ paddingLeft: '2.5rem', width: '100%' }}
                  placeholder="Enter mobile number"
                  {...register('mobile', { required: 'Mobile number is required' })} 
                />
              </div>
              {errors.mobile && <span className="error-text">{errors.mobile.message}</span>}
            </div>
            <div className="form-group">
              <label>OTP</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter 6-digit OTP"
                {...register('otp')} 
              />
            </div>
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
          <Link to="/auth/forgot-password" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
          Login
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
        Don't have an account? <Link to="/auth/signup" style={{ fontWeight: 600 }}>Sign up here</Link>
      </p>
    </div>
  );
}
