import React from 'react';
import './Loading.css'; // Ensure you create this file

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
