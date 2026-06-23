import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MapPin, Star } from 'lucide-react';

const NearbyVendors = () => {
  const containerRef = useRef(null);

  const vendors = [
    { id: 1, name: 'Happy Paws Vet Clinic', type: 'Doctor', distance: '1.2 miles', rating: 4.8, img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Bark & Meow Pet Supplies', type: 'Shop', distance: '2.5 miles', rating: 4.6, img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Healthy Pet Meals Co.', type: 'Meals', distance: '3.0 miles', rating: 4.9, img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.vendor-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="section-container" ref={containerRef}>
      <div className="section-header">
        <h2 className="section-title">Nearby Doctors & Shops</h2>
        <a href="#" className="view-all-link">Explore map</a>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {vendors.map(vendor => (
          <div key={vendor.id} className="vendor-card glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '12px', 
              backgroundImage: `url(${vendor.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              flexShrink: 0
            }} />
            
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--color-primary-dark)' }}>{vendor.name}</h3>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.8rem', background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                  {vendor.type}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={14} fill="#f59e0b" color="#f59e0b" /> {vendor.rating}
                </span>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={14} /> {vendor.distance} away
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyVendors;
