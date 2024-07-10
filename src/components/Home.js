import React from 'react';

const HomePage = () => {

  return (
    <div style={styles.container}>
      <h4 style={styles.heading}>Welcome to Ethereum Validator Tracker</h4>
      <p>Explore the Ethereum Validator Tracker, your premier tool for real-time monitoring and analysis of Ethereum validators.</p>

      <div style={styles.featureList}>
        <h4 style={styles.boldText}>Key Features:</h4>
        <ul>
          <li><strong>Validator Tracking:</strong> Enter a validator index or public key to access detailed information, including current balance, performance metrics, and latest attestations.</li>
          <li><strong>Top Validators:</strong> Discover the leading Ethereum validators based on their stake and performance, providing valuable insights into network reliability.</li>
          <li><strong>Help Section:</strong> Find guides and explanations to help you understand validator metrics and optimize your validator selection.</li>
        </ul>
      </div>

      <p><strong>About Ethereum Network:</strong></p>
      <p>Ethereum is a decentralized platform empowering developers to create and deploy smart contracts and decentralized applications (dApps). Built on blockchain technology, Ethereum ensures transparency, security, and immutability in transactions and data storage. Ethereum 2.0, the platform’s next phase, enhances scalability, security, and sustainability through proof-of-stake consensus.</p>

      <p><strong>Get Started:</strong></p>
      <p>Begin exploring Ethereum Validator Tracker to stay informed about Ethereum validators and contribute to the decentralized ecosystem.</p>
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
    boldText: {
      fontWeight: 'bold',
    },
  };

export default HomePage;
