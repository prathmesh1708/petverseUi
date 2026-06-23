import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Smartphone } from 'lucide-react';
import { useState } from 'react';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = (data) => {
    console.log('Sending OTP to:', data.mobile);
    setIsOtpSent(true);
  };

  const handleResetPassword = (data) => {
    console.log('Resetting Password with OTP:', data.otp, 'New Pass:', data.newPassword);
    alert('Password Reset Successful!');
    navigate('/auth/login');
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--color-primary-dark)' }}>Forgot Password</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {isOtpSent ? "Enter OTP and set a new password." : "Enter your registered mobile number."}
        </p>
      </div>

      {!isOtpSent ? (
        <form onSubmit={handleSubmit(handleSendOtp)}>
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

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Send OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit(handleResetPassword)}>
          <div className="form-group">
            <label>Enter OTP</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="6-digit OTP"
              {...register('otp', { required: 'OTP is required' })} 
            />
          </div>
          
          <div className="form-group">
            <label>New Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Strong password"
              {...register('newPassword', { required: 'New password is required' })} 
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Reset Password
          </button>
        </form>
      )}

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/auth/login" className="btn-secondary">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
