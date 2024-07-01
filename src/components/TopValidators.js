// src/components/TopValidators.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopValidators.css';

const TopValidators = () => {
  const [validators, setValidators] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchValidators = async () => {
      try {
        const response = await axios.get('https://beaconcha.in/api/v1/validator/leaderboard');
        console.log(response.data); // Log the response data
        if (response.data && response.data.data) {
          setValidators(response.data.data.slice(0, 10)); // Get the top 10 validators
        } else {
          setError('Unexpected API response format.');
        }
      } catch (err) {
        console.error(err); // Log any errors
        setError('Failed to fetch top validators.');
      }
    };

    fetchValidators();
  }, []);

  return (
    <div className="top-validators">
      <h2>Top Ethereum Validators</h2>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Validator Index</th>
            <th>Balance (ETH)</th>
          </tr>
        </thead>
        <tbody>
          {validators.map((validator, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{validator.validatorindex}</td>
              <td>{(validator.balance / 1e9).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopValidators;
