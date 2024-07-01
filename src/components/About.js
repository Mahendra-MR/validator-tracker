import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About Validator Tracker</h1>
      <p style={Styles.text}>The Ethereum Validator Tracker is a React-based web application designed to provide detailed statistics on Ethereum validators. Using the beaconcha.in API, users can input a specific validator ID to retrieve essential data such as validator index, balance, and performance metrics. The application features a loading screen, a responsive and user-friendly interface with an interactive sidebar. Additionally, it includes a Top Validators component that lists the top ten Ethereum validators based on balance. The interface utilizes a sleek design with a color scheme of black, white, and green for enhanced visual appeal and user experience..</p>
    </div>
  );
};

export default About;
 const Styles={
    text:{
    color: '#333',
    fontSize: '20px',
    marginBottom: '15px',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
}
 };
