import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Heart } from 'lucide-react';

const MatchProfiles = () => {
  const containerRef = useRef(null);

  const profiles = [
    { id: 1, name: 'Luna', species: 'Dog', breed: 'Golden Retriever', age: '2y', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Milo', species: 'Cat', breed: 'Maine Coon', age: '3y', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Bella', species: 'Dog', breed: 'French Bulldog', age: '1y', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Oliver', species: 'Cat', breed: 'Siamese', age: '4y', img: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=400&q=80' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.match-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="section-container" ref={containerRef}>
      <div className="section-header">
        <h2 className="section-title">Perfect Matches for Buddy</h2>
        <a href="#" className="view-all-link">See all matches</a>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        {profiles.map(profile => (
          <div key={profile.id} className="match-card glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ 
              width: '100%', 
              height: '200px', 
              borderRadius: '12px', 
              backgroundImage: `url(${profile.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              <button style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(255,255,255,0.8)',
                border: 'none',
                borderRadius: '50%',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <Heart size={20} color="#d93025" />
              </button>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--color-primary-dark)' }}>{profile.name}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                {profile.species} • {profile.breed} • {profile.age}
              </p>
            </div>
            
            <button className="btn-secondary" style={{ width: '100%' }}>View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchProfiles;
