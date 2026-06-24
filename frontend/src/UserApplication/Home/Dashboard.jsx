import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { PawPrint, User } from 'lucide-react';
import NotificationWidget from './components/NotificationWidget';
import FeaturedPromotions from './components/FeaturedPromotions';
import ServiceDisplay from './components/ServiceDisplay';
import MatchProfiles from './components/MatchProfiles';
import NearbyVendors from './components/NearbyVendors';
import UpcomingEvents from './components/UpcomingEvents';
import './Dashboard.css';

gsap.registerPlugin(ScrollTrigger);

const Dashboard = () => {
  useEffect(() => {
    // General fade up animation for sections on load if they don't have their own specific triggers
    const ctx = gsap.context(() => {
      gsap.from('.gsap-fade-up', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="home-dashboard-container">
      {/* Sticky Header */}
      <header className="home-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PawPrint size={28} color="var(--color-primary)" />
          <Link to="/dashboard" className="brand-logo">PetVerse</Link>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
            Welcome back, <Link to="/profile" style={{ color: 'var(--color-primary-dark)', fontWeight: 700, textDecoration: 'none' }}>John & Buddy</Link>!
          </div>
          <NotificationWidget />
          <Link 
            to="/profile" 
            title="Profile Settings"
            style={{
              background: 'var(--color-primary-light)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary-dark)',
              transition: 'transform 0.2s ease, background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
              e.currentTarget.style.color = 'var(--color-primary-dark)';
            }}
          >
            <User size={20} />
          </Link>
        </div>
      </header>

      {/* Main Content Areas */}
      <main className="home-content">
        <div style={{ height: '2rem' }}></div> {/* Spacing */}
        
        <FeaturedPromotions />
        <ServiceDisplay />
        <MatchProfiles />
        <NearbyVendors />
        <UpcomingEvents />
      </main>
    </div>
  );
};

export default Dashboard;
