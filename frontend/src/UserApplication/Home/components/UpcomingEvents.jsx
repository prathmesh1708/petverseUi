import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Calendar, Users } from 'lucide-react';

const UpcomingEvents = () => {
  const containerRef = useRef(null);

  const events = [
    { id: 1, title: 'Central Park Dog Walk', date: 'Oct 24, 10:00 AM', vendor: 'Paws & Play', price: 'Free', slots: '12 spots left' },
    { id: 2, title: 'Cat Grooming Workshop', date: 'Oct 28, 2:00 PM', vendor: 'Purrfect Styles', price: '$25', slots: '5 spots left' },
    { id: 3, title: 'Puppy Training Basics', date: 'Nov 2, 9:00 AM', vendor: 'K9 Academy', price: '$40', slots: 'Waitlist' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.event-row', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power1.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="section-container" ref={containerRef}>
      <div className="section-header">
        <h2 className="section-title">Upcoming Community Events</h2>
        <a href="#" className="view-all-link">View calendar</a>
      </div>
      
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        {events.map((event, index) => (
          <div key={event.id} className="event-row" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1.5rem 2rem',
            borderBottom: index !== events.length - 1 ? '1px solid var(--color-border)' : 'none',
            background: 'rgba(255,255,255,0.4)',
            transition: 'background 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
          >
            <div style={{ flex: 2 }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--color-text-primary)' }}>{event.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={14} /> {event.date} • by {event.vendor}
              </p>
            </div>
            
            <div style={{ flex: 1, textAlign: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>{event.price}</span>
            </div>
            
            <div style={{ flex: 1, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Users size={14} /> {event.slots}
              </span>
              <button className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                {event.slots === 'Waitlist' ? 'Join Waitlist' : 'RSVP'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
