import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft, Heart, PawPrint, Shovel, Flame, TreePine, Gift,
  MapPin, Clock, FileText, Send, MessagesSquare, Star, X,
  CheckCircle, CircleDot, Loader, Package, Navigation, Zap,
  Plus, Image as ImageIcon, BookOpen, MessageCircle
} from 'lucide-react';
import './MemorialServiceModule.css';

gsap.registerPlugin(ScrollTrigger);

// =====================
// SERVICE CATEGORIES DATA
// =====================
const serviceCategories = [
  {
    id: 1,
    name: 'Burial Service',
    icon: <Shovel size={28} />,
    description: 'Our dedicated team visits your location to handle the burial with dignity and respect.',
    price: 'From ₹2,500',
  },
  {
    id: 2,
    name: 'Grave Preparation',
    icon: <MapPin size={28} />,
    description: 'Professional digging and preparation work for a proper resting place for your beloved pet.',
    price: 'From ₹1,500',
  },
  {
    id: 3,
    name: 'Cremation Support',
    icon: <Flame size={28} />,
    description: 'Optional cremation service with urn collection and certificate of cremation.',
    price: 'From ₹3,000',
  },
  {
    id: 4,
    name: 'Tree Plantation',
    icon: <TreePine size={28} />,
    description: 'Plant a memorial tree in honor of your pet. A living tribute that grows with time.',
    price: 'From ₹800',
  },
  {
    id: 5,
    name: 'Memory Kit',
    icon: <Gift size={28} />,
    description: 'A remembrance kit including a framed photo, memorial certificate, and keepsake items.',
    price: 'From ₹1,200',
  },
  {
    id: 6,
    name: 'Full Memorial Package',
    icon: <Heart size={28} />,
    description: 'Complete end-to-end memorial service with burial, tree, and memory kit included.',
    price: 'From ₹6,000',
  },
];

// =====================
// MEMORY SERVICES DATA (Premium)
// =====================
const memoryServices = [
  { id: 1, name: 'Custom Memorial Tree', icon: <TreePine size={28} />, price: '₹2,000', premium: true },
  { id: 2, name: 'Memory Stone', icon: <BookOpen size={28} />, price: '₹1,800', premium: true },
  { id: 3, name: 'Framed Image', icon: <ImageIcon size={28} />, price: '₹900', premium: false },
  { id: 4, name: 'Digital Memory Page', icon: <FileText size={28} />, price: '₹500', premium: false },
];

// =====================
// SUPPORT CHAT COMPONENT
// =====================
const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello. I'm here to help you through this difficult time. How can I assist you?", sender: 'bot' },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const userMsg = { id: Date.now(), text: inputVal, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Simulated bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thank you for reaching out. Our support team will connect with you shortly. You can also call us at 1800-PET-CARE.",
          sender: 'bot',
        },
      ]);
    }, 1200);
  };

  return (
    <div className="support-chat-widget">
      {isOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <h4>💬 Memorial Support</h4>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="chat-send-btn" onClick={handleSend}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
      <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <MessagesSquare size={26} />
      </button>
    </div>
  );
};

// =====================
// MAIN MODULE COMPONENT
// =====================
const MemorialServiceModule = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const bookingRef = useRef(null);
  const trackingRef = useRef(null);
  const memoryRef = useRef(null);
  const feedbackRef = useRef(null);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    petName: '',
    petType: 'Dog',
    location: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Status Tracking State (simulated)
  const [currentStatus, setCurrentStatus] = useState(1); // 0=pending, 1=accepted, 2=assigned, 3=completed

  // Feedback State
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // ===== GSAP ANIMATIONS =====
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Hero entrance
        gsap.from('.memorial-hero-content > *', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });

        // Service category cards
        gsap.from('.service-category-card', {
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          onComplete: () => {
            gsap.set('.service-category-card', { clearProps: 'transform,opacity' });
            document.querySelectorAll('.service-category-card').forEach(el => el.classList.add('ready'));
          }
        });

        // Pricing banner
        gsap.from('.pricing-info-banner', {
          scrollTrigger: {
            trigger: '.pricing-info-banner',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        });

        // Booking form
        gsap.from('.booking-form-container', {
          scrollTrigger: {
            trigger: bookingRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        });

        // Status tracker
        gsap.from('.status-tracker', {
          scrollTrigger: {
            trigger: trackingRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        });

        // Memory services
        gsap.from('.memory-service-card', {
          scrollTrigger: {
            trigger: memoryRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          scale: 0.85,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          onComplete: () => {
            gsap.set('.memory-service-card', { clearProps: 'transform,opacity' });
            document.querySelectorAll('.memory-service-card').forEach(el => el.classList.add('ready'));
          }
        });

        // Feedback
        gsap.from('.feedback-container', {
          scrollTrigger: {
            trigger: feedbackRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        });
      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // ===== EVENT HANDLERS =====
  const handleBookingChange = (e) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    const btn = e.target.querySelector('button[type="submit"]');
    gsap.to(btn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setBookingSubmitted(true);
        setCurrentStatus(1);
      },
    });
  };

  const handleFeedbackSubmit = () => {
    if (rating === 0) return;
    setFeedbackSubmitted(true);
  };

  return (
    <div className="memorial-container">
      {/* ===== HEADER ===== */}
      <header className="memorial-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <div className="memorial-header-title">
          <Heart size={24} color="var(--color-primary)" />
          <h1>Memorial Services</h1>
        </div>
        <div style={{ width: '140px' }}></div> {/* spacer for center align */}
      </header>

      <main className="memorial-content">
        <div style={{ height: '1rem' }}></div>

        {/* ===== 9.1 MEMORIAL OVERVIEW — HERO ===== */}
        <div className="memorial-section" ref={heroRef}>
          <div className="memorial-hero">
            <div className="memorial-hero-content">
              <h1>Honoring Your Beloved Companion</h1>
              <p>
                We understand the pain of losing a pet. Our compassionate memorial service team
                provides dignified end-of-life arrangements, so you can focus on remembering the
                beautiful moments you shared together.
              </p>
              <button
                className="btn-primary"
                style={{
                  background: 'var(--color-bg)',
                  color: 'var(--color-primary-dark)',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '12px',
                }}
                onClick={() => bookingRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                <PawPrint size={18} /> Request a Service
              </button>
            </div>
            <div
              className="memorial-hero-bg"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80)',
              }}
            />
          </div>
        </div>

        {/* ===== 9.2 SERVICE CATEGORIES ===== */}
        <div className="memorial-section" ref={categoriesRef}>
          <div className="memorial-section-header">
            <h2 className="memorial-section-title">Service Categories</h2>
          </div>
          <div className="service-categories-grid">
            {serviceCategories.map((cat) => (
              <div key={cat.id} className="service-category-card">
                <div className="service-category-icon">{cat.icon}</div>
                <h3>{cat.name}</h3>
                <p>{cat.description}</p>
                <span className="service-category-price">{cat.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 9.5 CHARGES — DYNAMIC PRICING INFO ===== */}
        <div className="memorial-section">
          <div className="memorial-section-header">
            <h2 className="memorial-section-title">How Pricing Works</h2>
          </div>
          <div className="pricing-info-banner">
            <div className="pricing-factor">
              <div className="pricing-factor-icon"><Package size={20} /></div>
              <span>Service Type</span>
            </div>
            <div className="pricing-factor">
              <div className="pricing-factor-icon"><Navigation size={20} /></div>
              <span>Distance</span>
            </div>
            <div className="pricing-factor">
              <div className="pricing-factor-icon"><Zap size={20} /></div>
              <span>Urgency Level</span>
            </div>
            <div className="pricing-factor">
              <div className="pricing-factor-icon"><Plus size={20} /></div>
              <span>Add-on Services</span>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            Final pricing is dynamically calculated based on the above factors. You'll see an estimate before confirming your request.
          </p>
        </div>

        {/* ===== 9.3 SERVICE REQUEST — BOOKING FORM ===== */}
        <div className="memorial-section" ref={bookingRef}>
          <div className="memorial-section-header">
            <h2 className="memorial-section-title">Request a Service</h2>
          </div>

          {!bookingSubmitted ? (
            <form className="booking-form-container" onSubmit={handleBookingSubmit}>
              <div className="booking-form-grid">
                <div className="form-group">
                  <label>Pet Name</label>
                  <input
                    type="text"
                    name="petName"
                    className="form-control"
                    placeholder="e.g. Buddy"
                    value={bookingForm.petName}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Pet Type</label>
                  <select
                    name="petType"
                    className="form-control"
                    value={bookingForm.petType}
                    onChange={handleBookingChange}
                  >
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Rabbit</option>
                    <option>Bird</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Location / Address</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    placeholder="Enter your full address"
                    value={bookingForm.location}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Service Type</label>
                  <select
                    name="serviceType"
                    className="form-control"
                    value={bookingForm.serviceType}
                    onChange={handleBookingChange}
                    required
                  >
                    <option value="">Select a service</option>
                    <option>Burial Service</option>
                    <option>Grave Preparation</option>
                    <option>Cremation Support</option>
                    <option>Tree Plantation</option>
                    <option>Memory Kit</option>
                    <option>Full Memorial Package</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    className="form-control"
                    value={bookingForm.preferredDate}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Preferred Time</label>
                  <input
                    type="time"
                    name="preferredTime"
                    className="form-control"
                    value={bookingForm.preferredTime}
                    onChange={handleBookingChange}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Additional Notes</label>
                  <textarea
                    name="notes"
                    className="form-control"
                    placeholder="Any special instructions or details we should know..."
                    value={bookingForm.notes}
                    onChange={handleBookingChange}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="submit" className="btn-primary" style={{ padding: '0.9rem 2.5rem', fontSize: '1rem' }}>
                  <Send size={18} /> Submit Request
                </button>
              </div>
            </form>
          ) : (
            <div
              className="booking-form-container"
              style={{ textAlign: 'center', padding: '3rem' }}
            >
              <CheckCircle size={64} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
                Request Submitted Successfully
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                We have received your service request for <strong>{bookingForm.petName}</strong>.
                Our nearest provider is being assigned. You can track the status below.
              </p>
              <button
                className="btn-secondary"
                onClick={() => {
                  setBookingSubmitted(false);
                  setBookingForm({
                    petName: '',
                    petType: 'Dog',
                    location: '',
                    serviceType: '',
                    preferredDate: '',
                    preferredTime: '',
                    notes: '',
                  });
                }}
              >
                Submit Another Request
              </button>
            </div>
          )}
        </div>

        {/* ===== 9.4 PROVIDER ASSIGNMENT & 9.6 STATUS TRACKING ===== */}
        <div className="memorial-section" ref={trackingRef}>
          <div className="memorial-section-header">
            <h2 className="memorial-section-title">Service Tracking</h2>
          </div>
          <div className="status-tracker">
            {/* Progress Steps */}
            <div className="status-steps">
              <div className="status-line">
                <div
                  className="status-line-fill"
                  style={{ width: `${(currentStatus / 3) * 100}%` }}
                />
              </div>
              {[
                { label: 'Pending', icon: <Clock size={20} /> },
                { label: 'Accepted', icon: <CheckCircle size={20} /> },
                { label: 'Assigned', icon: <CircleDot size={20} /> },
                { label: 'Completed', icon: <CheckCircle size={20} /> },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`status-step ${idx <= currentStatus ? (idx < currentStatus ? 'completed' : 'active') : ''}`}
                >
                  <div className="status-dot">{step.icon}</div>
                  <span className="status-label">{step.label}</span>
                </div>
              ))}
            </div>

            {/* Simulate status change */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem' }}>
              {[0, 1, 2, 3].map((s) => (
                <button
                  key={s}
                  className={currentStatus === s ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                  onClick={() => setCurrentStatus(s)}
                >
                  Step {s + 1}
                </button>
              ))}
            </div>

            {/* Provider Info (shown when assigned) */}
            {currentStatus >= 2 && (
              <div className="provider-card">
                <div
                  className="provider-avatar"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80)',
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--color-primary-dark)' }}>
                    Rajesh Kumar
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    Memorial Service Specialist • 4.9 ⭐
                  </p>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={14} /> 2.3 km away • ETA 25 min
                  </p>
                </div>
                <button
                  className="btn-primary"
                  style={{ marginLeft: 'auto', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                >
                  <MessageCircle size={16} /> Contact
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ===== 9.8 MEMORY SERVICES (Premium) ===== */}
        <div className="memorial-section" ref={memoryRef}>
          <div className="memorial-section-header">
            <h2 className="memorial-section-title">Memory Services</h2>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Optional premium services to create lasting memories of your beloved companion.
          </p>
          <div className="memory-services-grid">
            {memoryServices.map((service) => (
              <div key={service.id} className="memory-service-card">
                {service.premium && <span className="premium-badge">Premium</span>}
                <div className="memory-service-icon">{service.icon}</div>
                <h4>{service.name}</h4>
                <span className="price">{service.price}</span>
                <button className="btn-secondary" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }}>
                  Add to Request
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 9.9 FEEDBACK ===== */}
        <div className="memorial-section" ref={feedbackRef}>
          <div className="memorial-section-header">
            <h2 className="memorial-section-title">Share Your Experience</h2>
          </div>

          {!feedbackSubmitted ? (
            <div className="feedback-container">
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                Your feedback helps us improve our memorial services
              </p>

              {/* Star Rating */}
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <Star
                      size={36}
                      fill={star <= (hoverRating || rating) ? '#f59e0b' : 'transparent'}
                      color={star <= (hoverRating || rating) ? '#f59e0b' : 'var(--color-border)'}
                    />
                  </button>
                ))}
              </div>

              <textarea
                className="feedback-textarea"
                placeholder="Tell us about your experience with our memorial service..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />

              <button
                className="btn-primary"
                style={{ padding: '0.9rem 2.5rem', fontSize: '1rem' }}
                onClick={handleFeedbackSubmit}
              >
                Submit Feedback
              </button>
            </div>
          ) : (
            <div className="feedback-container" style={{ padding: '3rem' }}>
              <CheckCircle size={64} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
                Thank You for Your Feedback
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Your rating of {rating}/5 stars has been recorded. We truly appreciate your trust in PetVerse.
              </p>
            </div>
          )}
        </div>

        <div style={{ height: '2rem' }}></div>
      </main>

      {/* ===== 9.7 SUPPORT CHAT ===== */}
      <SupportChat />
    </div>
  );
};

export default MemorialServiceModule;
