import React, { useState } from "react";

const FloorPlans = ({ property }) => {
  const sizePrefix = property?.sizePrefix ? ` ${property.sizePrefix}` : '';
  const floorPlans = Array.isArray(property?.floorPlans) ? property.floorPlans : [];
  const [openIdx, setOpenIdx] = useState(0); // open first by default
  if (!floorPlans.length) return <div>No floor plans available.</div>;
  return (
    <div style={{ maxWidth: 900, margin: '24px auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '14px 24px' }}>
      {floorPlans.map((plan, idx) => {
        const isOpen = openIdx === idx;
        const borderColor = isOpen ? '#ff5a5f' : 'rgba(187,187,187,0.3)';
        return (
          <div key={plan.id || idx} style={{ marginBottom: 40 }}>
            <div
              style={{
                border: `0.3px solid ${borderColor}`,
                boxShadow: isOpen ? '0 0 32px 8px rgba(255,90,95,0.10)' : '0 4px 32px rgba(187, 187, 187, 0.07)',
                borderRadius: 8,
                padding: '12px 18px',
                color: '#222',
                fontWeight: 500,
                marginBottom: 0,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
                background: '#fff',
                cursor: 'pointer',
                position: 'relative',
                userSelect: 'none',
              }}
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
            >
              <span style={{ fontWeight: 700, color: isOpen ? '#ff5a5f' : '#222', marginRight: 10 }}>{plan.planTitle || 'Plan Title'}</span>
              <span style={{ color: '#222' }}>Size:<span style={{ fontWeight: 700, color: isOpen ? '#ff5a5f' : '#222', marginLeft: 2 }}>{plan.planSize || '-'}{isOpen ? <span style={{ color: '#ff5a5f' }}>{sizePrefix}</span> : <span style={{ color: '#222' }}>{sizePrefix}</span>}</span></span>
              <span style={{ color: '#222', marginLeft: 16 }}>Rooms:<span style={{ fontWeight: 700, color: isOpen ? '#ff5a5f' : '#222', marginLeft: 2 }}>{plan.planBedrooms || '-'}{isOpen ? <span style={{ color: '#ff5a5f' }}> Sqft</span> : <span style={{ color: '#222' }}> Sqft</span>}</span></span>
              <span style={{ color: '#222', marginLeft: 16 }}>Baths:<span style={{ fontWeight: 700, color: isOpen ? '#ff5a5f' : '#222', marginLeft: 2 }}>{plan.planBathrooms || '-'}{isOpen ? <span style={{ color: '#ff5a5f' }}> Sqft</span> : <span style={{ color: '#222' }}> Sqft</span>}</span></span>
              <span style={{ color: '#222', marginLeft: 16 }}>Price:<span style={{ fontWeight: 700, color: isOpen ? '#ff5a5f' : '#222', marginLeft: 2 }}>{plan.planPrice ? (isOpen ? <span style={{ color: '#ff5a5f' }}>${plan.planPrice}</span> : `$${plan.planPrice}`) : '-'}</span></span>
              <span style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', width: 24, height: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isOpen ? (
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 8L12 4L20 8" stroke="#c7c7d1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4L12 8L20 4" stroke="#c7c7d1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
            </div>
            {isOpen && (
              <>
                {plan.planImage && (
                  <div style={{ textAlign: 'center', margin: '24px 0' }}>
                    <img
                      src={`/api/image?filename=${plan.planImage}`}
                      alt={plan.planTitle || 'Plan Image'}
                      style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
                    />
                  </div>
                )}
                {plan.planDescription && (
                  <div style={{ textAlign: 'center', color: '#444', fontSize: 16, marginTop: 16 }}>
                    {plan.planDescription}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FloorPlans;
