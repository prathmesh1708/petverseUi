import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FeaturedPromotions = () => {
  const bannerRef = useRef(null);

  useEffect(() => {
    // Simple pulsing animation for the banner
    gsap.to(bannerRef.current, {
      boxShadow: '0 12px 40px rgba(18, 130, 139, 0.4)',
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <div className="section-container gsap-fade-up">
      <div 
        ref={bannerRef}
        style={{
          width: '100%',
          minHeight: '300px',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          padding: window.innerWidth < 768 ? '2rem 1.5rem' : '3rem',
          boxShadow: '0 12px 30px rgba(18, 130, 139, 0.15)',
          background: 'linear-gradient(135deg, #12828b 0%, #0f686f 100%)',
          color: 'white'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, maxWidth: window.innerWidth < 768 ? '100%' : '500px' }}>
          <h1 style={{ fontSize: window.innerWidth < 768 ? '1.8rem' : '2.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>
            Spoil Your Furry Friends Today!
          </h1>
          <p style={{ fontSize: window.innerWidth < 768 ? '0.95rem' : '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
            Get 30% off on all premium dog and cat food subscriptions. Exclusive to PetVerse members.
          </p>
          <button style={{
            background: 'var(--color-bg)',
            color: 'var(--color-primary-dark)',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Shop Now
          </button>
        </div>
        
        {/* Background Image of Dogs and Cats */}
        <div style={{
          position: 'absolute',
          right: '-50px',
          top: '-20px',
          height: '120%',
          width: '60%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.9,
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
        }} />
      </div>
    </div>
  );
};

export default FeaturedPromotions;
