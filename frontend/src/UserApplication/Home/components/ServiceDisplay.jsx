import React, { useRef, useEffect } from 'react';
import { Stethoscope, Store, Utensils, CalendarDays, Heart, PawPrint, Scissors } from 'lucide-react';
import gsap from 'gsap';

const services = [
  { id: 1, name: 'Doctors', icon: <Stethoscope size={32} /> },
  { id: 2, name: 'Shops', icon: <Store size={32} /> },
  { id: 3, name: 'Meals', icon: <Utensils size={32} /> },
  { id: 4, name: 'Events', icon: <CalendarDays size={32} /> },
  { id: 5, name: 'Memorial', icon: <Heart size={32} /> },
  { id: 6, name: 'Adoption', icon: <PawPrint size={32} /> },
  { id: 7, name: 'Grooming', icon: <Scissors size={32} /> },
];

const ServiceDisplay = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-circle', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.5)'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="section-container" ref={containerRef}>
      <div style={{
        display: 'flex',
        gap: '2rem',
        overflowX: 'auto',
        padding: '1rem 0',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch'
      }}>
        {services.map(service => (
          <div 
            key={service.id} 
            className="service-circle"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              cursor: 'pointer',
              minWidth: '100px'
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary-dark)',
              boxShadow: '0 4px 12px rgba(18, 130, 139, 0.1)',
              transition: 'transform 0.3s ease, background-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
              e.currentTarget.style.color = 'var(--color-primary-dark)';
            }}
            >
              {service.icon}
            </div>
            <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>{service.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDisplay;
