import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h4 style={styles.heading}>Discover Ethereum Validator performance with our interactive React application.</h4>
      <p>Monitor top validators, stay updated with real-time statistics, and explore detailed insights.</p>

      <div style={styles.featureList}>
        <h4>Key Features:</h4>
        <ul>
          <li><strong>Top Validators:</strong> Explore the leading Ethereum validators based on performance and balance.</li>
          <li><strong>Real-Time Updates:</strong> Stay informed with live data from the beaconcha.in API.</li>
          <li><strong>Responsive Design:</strong> Enjoy a seamless experience on any device.</li>
          <li><strong>Customizable Interface:</strong> Personalize your view with our intuitive settings.</li>
        </ul>
      </div>

      <p>Begin exploring Ethereum validator insights today with Validator Tracker!</p>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    lineHeight: '1.6'
  },
  heading: {
    fontSize: '30px',
    color: '#333',
  },
  featureList: {
    marginTop: '30px',
    textAlign: 'left',
  },
};

export default HomePage;
