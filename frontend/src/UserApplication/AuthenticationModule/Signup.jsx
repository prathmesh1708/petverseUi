import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { User, MapPin, Phone, Mail, Lock, Image as ImageIcon, CheckCircle, Plus } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const formRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    // Owner Info
    fullName: '', city: '', mobile: '', email: '', password: '', emergencyContact: '',
    // Pet Info
    pets: [{
      name: '', species: '', breed: '', age: '', gender: '', bio: '',
      vaccinationStatus: '', sterilizationStatus: '', medicalConditions: '',
      temperament: '', favoriteActivities: ''
    }]
  });

  const animateStepTransition = (nextStep) => {
    const ctx = gsap.context(() => {
      gsap.to('.wizard-step-container', {
        x: -20,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setStep(nextStep);
          gsap.fromTo('.wizard-step-container', 
            { x: 20, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
          );
        }
      });
    }, formRef);
    return () => ctx.revert();
  };

  const handleNext = () => {
    if (step < 3) animateStepTransition(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) {
      const ctx = gsap.context(() => {
        gsap.to('.wizard-step-container', {
          x: 20,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setStep(step - 1);
            gsap.fromTo('.wizard-step-container', 
              { x: -20, opacity: 0 }, 
              { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
            );
          }
        });
      }, formRef);
      return () => ctx.revert();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API Call then redirect
    const ctx = gsap.context(() => {
      gsap.to(formRef.current, { scale: 0.95, opacity: 0, duration: 0.5, onComplete: () => navigate('/dashboard') });
    });
    return () => ctx.revert();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wizard-progress', { y: -20, opacity: 0, duration: 0.6, delay: 0.1 });
      gsap.from('.wizard-step-container', { y: 20, opacity: 0, duration: 0.6, delay: 0.3 });
    }, formRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="auth-glass-panel" ref={formRef} style={{ maxWidth: '600px' }}>
      <div className="auth-header">
        <h2>Create Account</h2>
        <p>Join the PetVerse community with your furry friend</p>
      </div>

      <div className="wizard-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
      </div>

      <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}>
        <div className="wizard-step-container">
          {step === 1 && (
            <>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Owner Information</h3>
              <div className="row">
                <div className="form-group col">
                  <label>Full Name</label>
                  <input type="text" className="form-control" placeholder="John Doe" />
                </div>
                <div className="form-group col">
                  <label>City / State</label>
                  <input type="text" className="form-control" placeholder="New York, NY" />
                </div>
              </div>
              <div className="row">
                <div className="form-group col">
                  <label>Mobile Number</label>
                  <input type="tel" className="form-control" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="form-group col">
                  <label>Emergency Contact</label>
                  <input type="tel" className="form-control" placeholder="+1 (555) 111-1111" />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Create a strong password" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Primary Pet Profile</h3>
              <div className="row">
                <div className="form-group col">
                  <label>Pet Name</label>
                  <input type="text" className="form-control" placeholder="Buddy" />
                </div>
                <div className="form-group col">
                  <label>Species</label>
                  <select className="form-control">
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Rabbit</option>
                    <option>Bird</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group col">
                  <label>Breed</label>
                  <input type="text" className="form-control" placeholder="Golden Retriever" />
                </div>
                <div className="form-group col">
                  <label>Age (Years)</label>
                  <input type="number" className="form-control" placeholder="3" />
                </div>
              </div>
              <div className="row">
                <div className="form-group col">
                  <label>Gender</label>
                  <select className="form-control">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="form-group col">
                  <label>Temperament</label>
                  <select className="form-control">
                    <option>Friendly</option>
                    <option>Aggressive</option>
                    <option>Shy</option>
                    <option>Energetic</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Short Bio</label>
                <textarea className="form-control" placeholder="Loves to play fetch and swim!" rows="2"></textarea>
              </div>
              <button type="button" className="btn-secondary" style={{ width: 'fit-content', fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                <Plus size={14} /> Add Another Pet
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Media & Verification</h3>
              <div className="form-group">
                <label>Pet Photo (Required)</label>
                <div className="file-upload-box">
                  <ImageIcon size={48} color="var(--color-primary-light)" style={{ marginBottom: '1rem' }} />
                  <p style={{ fontWeight: 500 }}>Click to upload or drag & drop</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>SVG, PNG, JPG or GIF (max. 5MB)</p>
                </div>
              </div>
              
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="checkbox" required /> I accept the Terms of Service & Privacy Policy
                </label>
              </div>
            </>
          )}
        </div>

        <div className="wizard-actions">
          {step > 1 ? (
            <button type="button" className="btn-secondary" onClick={handlePrev}>Back</button>
          ) : (
            <div></div> // Empty div for flex spacing
          )}
          
          {step < 3 ? (
            <button type="button" className="btn-primary" onClick={handleNext}>Next Step</button>
          ) : (
            <button type="submit" className="btn-primary"><CheckCircle size={18} /> Complete Setup</button>
          )}
        </div>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
        Already have an account? <Link to="/auth/login">Login here</Link>
      </div>
    </div>
  );
};

export default Signup;
