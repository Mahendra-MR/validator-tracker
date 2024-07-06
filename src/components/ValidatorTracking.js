import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ValidatorTracking.css';

const ValidatorTracking = () => {
  const { validatorIndex: paramValidatorIndex } = useParams();
  const [validatorIndex, setValidatorIndex] = useState(paramValidatorIndex || '');
  const [validatorData, setValidatorData] = useState(null);
  const [attestationsData, setAttestationsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [attestationsError, setAttestationsError] = useState(null);
  const [showAttestations, setShowAttestations] = useState(false);

  // Define formatAttestationData function before its usage in useCallback and other places
  const formatAttestationData = useCallback((attestation) => ({
    epoch: attestation.epoch,
    slot: attestation.attesterslot,
    committeeIndex: attestation.committeeindex !== undefined ? attestation.committeeindex : 'N/A',
    inclusionslot: attestation.inclusionslot || 'N/A',
    status: attestation.status || 'N/A',
    week: attestation.week || 'N/A',
    week_start: attestation.week_start || 'N/A',
    week_end: attestation.week_end || 'N/A',
  }), []);

  const fetchValidatorData = useCallback(async (index) => {
    setLoading(true);
    setError(null);

    try {
      const validatorResponse = await axios.get(`https://beaconcha.in/api/v1/validator/${index}`);
      const attestationsResponse = await axios.get(`https://beaconcha.in/api/v1/validator/${index}/attestations`);

      if (validatorResponse.status === 200 && validatorResponse.data && validatorResponse.data.data) {
        setValidatorData(validatorResponse.data.data);
      } else {
        setError('Validator data not found or not in the expected format.');
      }

      if (attestationsResponse.status === 200 && attestationsResponse.data && attestationsResponse.data.data) {
        const formattedAttestations = attestationsResponse.data.data.map(formatAttestationData);
        setAttestationsData(formattedAttestations);
        setAttestationsError(null); // Clear previous attestation error if data is available
      } else {
        setAttestationsData([]); // Reset attestations data to empty array
        setAttestationsError('No attestations found for this validator.'); // Set error message
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [formatAttestationData]); // Include formatAttestationData in dependencies

  useEffect(() => {
    if (paramValidatorIndex) {
      fetchValidatorData(paramValidatorIndex);
    }
  }, [paramValidatorIndex, fetchValidatorData]);

  const handleInputChange = (e) => {
    setValidatorIndex(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(validatorIndex) && validatorIndex !== '') {
      fetchValidatorData(validatorIndex);
    } else {
      setError('Please enter a valid numeric validator index.');
    }
  };

  const toggleAttestations = () => {
    setShowAttestations(!showAttestations);
    // Clear attestation error message when hiding attestations
    if (!showAttestations) {
      setAttestationsError(null);
    }
  };

  const renderRows = (data) => {
    const fieldMappings = {
      validatorindex: 'Validator Index',
      status: 'Status',
      balance: 'Balance',
      pubkey: 'Public Key',
      activationeligibilityepoch: 'Activation Eligibility Epoch',
      activationepoch: 'Activation Epoch',
      exitepoch: 'Exit Epoch',
      withdrawableepoch: 'Withdrawable Epoch',
      withdrawalcredentials: 'Withdrawal Credentials',
      slashed: 'Slashed',
      effectivebalance: 'Effective Balance',
      attestationcount: 'Attestation Count',
      attestationinclusion: 'Attestation Inclusion',
      graffiti: 'Graffiti'
    };

    const orderedFields = [
      'validatorindex',
      'status',
      'balance',
      'pubkey',
      'activationeligibilityepoch',
      'activationepoch',
      'exitepoch',
      'withdrawableepoch',
      'withdrawalcredentials',
      'slashed',
      'effectivebalance',
      'attestationcount',
      'attestationinclusion',
      'graffiti'
    ];

    return orderedFields.map(field => {
      const value = data[field];
      if (value !== '' && value !== null && value !== undefined) {
        return (
          <tr key={field}>
            <td><strong>{fieldMappings[field] || field}</strong></td>
            <td>{formatValue(field, value)}</td>
          </tr>
        );
      }
      return null;
    });
  };

  const formatValue = (field, value) => {
    if (field === 'balance' || field === 'effectivebalance') {
      return `${(value / 1e9).toFixed(2)} ETH`;
    }
    if (field === 'slashed') {
      return value ? 'Yes' : 'No';
    }
    return value;
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
              {renderRows(validatorData)}
            </tbody>
          </table>
        </div>
      )}

      {attestationsData.length > 0 && (
        <div className="attestations">
          <button className="attestations-button" onClick={toggleAttestations}>
            {showAttestations ? 'Hide Attestations' : 'Show Attestations'}
          </button>
          {attestationsError && <div className="error">{attestationsError}</div>}
          {showAttestations && !attestationsError && (
            <>
              <div className="attestations-table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Epoch</th>
                      <th>Slot</th>
                      <th>Committee Index</th>
                      <th>Inclusion Slot</th>
                      <th>Status</th>
                      <th>Week</th>
                      <th>Week Start</th>
                      <th>Week End</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attestationsData.map((attestation, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{attestation.epoch || 'N/A'}</td>
                        <td>{attestation.slot || 'N/A'}</td>
                        <td>{attestation.committeeIndex}</td>
                        <td>{attestation.inclusionslot}</td>
                        <td>{attestation.status}</td>
                        <td>{attestation.week}</td>
                        <td>{attestation.week_start}</td>
                        <td>{attestation.week_end}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ValidatorTracking;
