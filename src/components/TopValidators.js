// src/components/TopValidators.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TopValidators.css';

const TopValidators = () => {
  const [validators, setValidators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchValidators = async () => {
      try {
        const response = await axios.get('https://beaconcha.in/api/v1/validator/leaderboard');
        setValidators(response.data.data.slice(0, 10)); // Assuming top 10 validators
      } catch (err) {
        console.error('Error fetching data:', err.response || err.message);
        setError('Error fetching validator data.');
      } finally {
        setLoading(false);
      }
    };

    fetchValidators();
  }, []);

  const renderActionCell = (validatorIndex) => {
    // Custom design for action cell
    return (
      <Link to={`/track-validator/${validatorIndex}`}>
        <div className="custom-button">Track Validator</div>
      </Link>
    );
  };

  return (
    <div className="top-validators">
      <h2>Top Validators</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {validators.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Validator Index</th>
              <th>Balance (ETH)</th>
              <th>Performance (1d)</th>
              <th>Performance (7d)</th>
              <th>Performance (31d)</th>
              <th>Performance (365d)</th>
              <th>Track</th>
            </tr>
          </thead>
          <tbody>
            {validators.map((validator, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{validator.validatorindex}</td>
                <td>{(validator.balance / 1e9).toFixed(2)}</td>
                <td>{validator.performance1d}</td>
                <td>{validator.performance7d}</td>
                <td>{validator.performance31d}</td>
                <td>{validator.performance365d}</td>
                <td>{renderActionCell(validator.validatorindex)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopValidators;
