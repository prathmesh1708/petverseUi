import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, Phone, Mail, Lock, Heart, FileImage } from 'lucide-react';

export default function Signup() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors }, trigger } = useForm();
  const navigate = useNavigate();

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (step === 1) fieldsToValidate = ['fullName', 'city', 'mobile', 'email', 'password'];
    if (step === 2) fieldsToValidate = ['petName', 'species', 'breed', 'age', 'gender'];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const onSubmit = (data) => {
    console.log('Signup Data:', data);
    // Submit to API, then redirect
    navigate('/auth/login');
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--color-primary-dark)' }}>Create PetVerse Account</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {step === 1 && "Step 1: Owner Details"}
          {step === 2 && "Step 2: Pet Profile"}
          {step === 3 && "Step 3: Media Upload"}
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            style={{ 
              height: '6px', 
              flex: 1, 
              borderRadius: '4px',
              backgroundColor: s <= step ? 'var(--color-primary)' : 'var(--color-border)',
              transition: 'background-color 0.3s'
            }} 
          />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* STEP 1: OWNER INFO */}
        {step === 1 && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <div className="form-group">
              <label>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-secondary)' }} />
                <input type="text" className="form-control" style={{ paddingLeft: '2.5rem', width: '100%' }} placeholder="John Doe" {...register('fullName', { required: 'Name is required' })} />
              </div>
              {errors.fullName && <span className="error-text">{errors.fullName.message}</span>}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>City / State</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-secondary)' }} />
                  <input type="text" className="form-control" style={{ paddingLeft: '2.5rem', width: '100%' }} placeholder="City" {...register('city', { required: 'City is required' })} />
                </div>
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Mobile Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-secondary)' }} />
                  <input type="tel" className="form-control" style={{ paddingLeft: '2.5rem', width: '100%' }} placeholder="1234567890" {...register('mobile', { required: 'Mobile is required' })} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-secondary)' }} />
                <input type="email" className="form-control" style={{ paddingLeft: '2.5rem', width: '100%' }} placeholder="john@example.com" {...register('email', { required: 'Email is required' })} />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-secondary)' }} />
                <input type="password" className="form-control" style={{ paddingLeft: '2.5rem', width: '100%' }} placeholder="Strong password" {...register('password', { required: 'Password is required' })} />
              </div>
            </div>

            <button type="button" onClick={handleNext} className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Next Step</button>
          </div>
        )}

        {/* STEP 2: PET INFO */}
        {step === 2 && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <div className="form-group">
              <label>Pet Name</label>
              <div style={{ position: 'relative' }}>
                <Heart size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-secondary)' }} />
                <input type="text" className="form-control" style={{ paddingLeft: '2.5rem', width: '100%' }} placeholder="Buddy" {...register('petName', { required: 'Pet name is required' })} />
              </div>
              {errors.petName && <span className="error-text">{errors.petName.message}</span>}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Species</label>
                <select className="form-control" style={{ width: '100%' }} {...register('species', { required: 'Species is required' })}>
                  <option value="">Select</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
                </select>
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Breed</label>
                <input type="text" className="form-control" style={{ width: '100%' }} placeholder="Golden Retriever" {...register('breed', { required: 'Breed is required' })} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Age (Years)</label>
                <input type="number" className="form-control" style={{ width: '100%' }} placeholder="2" {...register('age')} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Gender</label>
                <select className="form-control" style={{ width: '100%' }} {...register('gender')}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Short Bio / Temperament</label>
              <textarea className="form-control" rows="3" style={{ width: '100%' }} placeholder="Friendly, playful, loves treats..." {...register('bio')}></textarea>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={handleBack} className="btn-secondary" style={{ flex: 1 }}>Back</button>
              <button type="button" onClick={handleNext} className="btn-primary" style={{ flex: 1 }}>Next Step</button>
            </div>
          </div>
        )}

        {/* STEP 3: MEDIA UPLOAD */}
        {step === 3 && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <div className="form-group">
              <label>Upload Pet Photos</label>
              <div 
                style={{ 
                  border: '2px dashed var(--color-border)', 
                  borderRadius: '12px', 
                  padding: '3rem 2rem', 
                  textAlign: 'center',
                  backgroundColor: 'var(--color-bg)',
                  cursor: 'pointer'
                }}
              >
                <FileImage size={40} style={{ color: 'var(--color-primary-light)', marginBottom: '1rem' }} />
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Drag & drop images here</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>or click to browse</p>
                <input type="file" style={{ display: 'none' }} {...register('media')} multiple />
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="terms" {...register('terms', { required: true })} />
              <label htmlFor="terms" style={{ margin: 0 }}>I accept the terms and conditions</label>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={handleBack} className="btn-secondary" style={{ flex: 1 }}>Back</button>
              <button type="submit" className="btn-primary" style={{ flex: 1 }}>Create Account</button>
            </div>
          </div>
        )}

      </form>

      <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
        Already have an account? <Link to="/auth/login" style={{ fontWeight: 600 }}>Login here</Link>
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
