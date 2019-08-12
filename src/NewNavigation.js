import React from 'react';
import logo from './logo-header.svg';
const Navigation = () => {
  return (
    <div class="nav">
      <div
        style={{
          backgroundColor: '#89b143',
          height: '50px'
        }}
      ></div>
      <div
        style={{
          backgroundColor: '#FF',
          height: '100px'
        }}
      >
        <img
          style={{
            height: '40px',
            marginTop: '-20px',
            width: '12%'
          }}
          src={logo}
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default Navigation;
