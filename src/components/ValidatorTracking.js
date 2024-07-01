// src/components/ValidatorTracking.js
import React, { useState } from 'react';
import axios from 'axios';
import './ValidatorTracking.css';

const ValidatorTracking = () => {
  const [validatorIndex, setValidatorIndex] = useState('');
  const [validatorData, setValidatorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchValidatorData = async () => {
    setLoading(true);
    setError(null);
    setValidatorData(null);

    try {
      const response = await axios.get(`https://beaconcha.in/api/v1/validator/${validatorIndex}`);
      setValidatorData(response.data.data);
    } catch (err) {
      setError('Failed to fetch validator data.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setValidatorIndex(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(validatorIndex) && validatorIndex !== '') {
      fetchValidatorData();
    } else {
      setError('Please enter a valid numeric validator index.');
    }
  };

  return (
    <div className="validator-tracking">
      <h2>Ethereum Validator Tracking</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Validator Index:
          <input type="text" value={validatorIndex} onChange={handleInputChange} />
        </label>
        <button type="submit">Track Validator</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {validatorData && (
        <div className="validator-info">
          <h3>Validator Information</h3>
          <table>
            <tbody>
              <tr>
                <td><strong>Validator Index:</strong></td>
                <td>{validatorData.validatorindex}</td>
              </tr>
              <tr>
                <td><strong>Balance:</strong></td>
                <td>{(validatorData.balance / 1e9).toFixed(2)} ETH</td>
              </tr>
              <tr>
                <td><strong>Status:</strong></td>
                <td>{validatorData.status}</td>
              </tr>
              <tr>
                <td><strong>Activation Epoch:</strong></td>
                <td>{validatorData.activationepoch}</td>
              </tr>
              <tr>
                <td><strong>Exit Epoch:</strong></td>
                <td>{validatorData.exitepoch}</td>
              </tr>
              <tr>
                <td><strong>Public Key:</strong></td>
                <td>{validatorData.pubkey}</td>
              </tr>
              <tr>
                <td><strong>Date of Last Transition:</strong></td>
                <td>{new Date(validatorData.laststatuschange * 1000).toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Date of Account Opening:</strong></td>
                <td>{new Date(validatorData.depositinclusion * 1000).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ValidatorTracking;








