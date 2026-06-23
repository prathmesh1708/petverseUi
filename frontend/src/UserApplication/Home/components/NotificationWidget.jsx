import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const NotificationWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock notifications
  const notifications = [
    { id: 1, type: 'booking', text: 'Vet appointment confirmed for Buddy at 3 PM tomorrow.', time: '2h ago' },
    { id: 2, type: 'subscription', text: 'Your monthly treat box is out for delivery!', time: '5h ago' },
    { id: 3, type: 'match', text: 'Luna (Persian Cat) swiped right on your profile!', time: '1d ago' },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          background: 'var(--color-primary-light)', 
          border: 'none', 
          borderRadius: '50%', 
          width: '40px', 
          height: '40px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <Bell size={20} color="var(--color-primary-dark)" />
        {notifications.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            background: '#d93025',
            color: 'white',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            fontSize: '0.7rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--color-bg)'
          }}>
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '50px',
          right: '0',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          width: '320px',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          zIndex: 1000
        }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', fontWeight: 'bold' }}>
            Notifications
          </div>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {notifications.map(n => (
              <div key={n.id} style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>{n.text}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{n.time}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '0.75rem', textAlign: 'center', background: 'var(--color-secondary-light)' }}>
            <a href="#" style={{ fontSize: '0.85rem', fontWeight: 600 }}>View All</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationWidget;
