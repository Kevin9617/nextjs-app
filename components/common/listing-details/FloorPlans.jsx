import React from "react";

const FloorPlans = ({ property }) => {
  return (
    <div
      className="card floor_plan"
      style={{
        border: '2px solid #ff5a5f',
        borderRadius: 8,
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        padding: '14px 24px',
        color: '#222',
        fontWeight: 500,
        margin: '24px auto',
        marginBottom: 24,
        maxWidth: 900,
        minHeight: 48,
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap',
        overflowX: 'auto',
      }}>
        <span style={{ fontWeight: 700, marginRight: 10, color: '#ff5a5f' }}>{property?.planTitle || 'Plan Title'}</span>
        <span style={{ marginRight: 10, color: '#222' }}>Size:<span style={{ fontWeight: 700, color: '#ff5a5f', marginLeft: 2 }}>{property?.planSize || '-'}<span style={{ fontWeight: 400, color: '#ff5a5f', marginLeft: 2 }}>{property?.planSize ? 'Sqft' : ''}</span></span></span>
        <span style={{ marginRight: 10, color: '#222' }}>Rooms:<span style={{ fontWeight: 700, color: '#ff5a5f', marginLeft: 2 }}>{property?.planBedrooms || '-'}<span style={{ fontWeight: 400, color: '#ff5a5f', marginLeft: 2 }}>{property?.planBedrooms ? 'Sqft' : ''}</span></span></span>
        <span style={{ marginRight: 10, color: '#222' }}>Baths:<span style={{ fontWeight: 700, color: '#ff5a5f', marginLeft: 2 }}>{property?.planBathrooms || '-'}<span style={{ fontWeight: 400, color: '#ff5a5f', marginLeft: 2 }}>{property?.planBathrooms ? 'Sqft' : ''}</span></span></span>
        <span style={{ marginRight: 10, color: '#222' }}>Price:<span style={{ fontWeight: 700, color: '#ff5a5f', marginLeft: 2 }}>${property?.planPrice || '-'}</span></span>
      </div>
      
    </div>
  );
};

export default FloorPlans;
