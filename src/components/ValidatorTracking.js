import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
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
    setAttestationsError(null);

    try {
      const validatorResponse = await axios.get(`https://beaconcha.in/api/v1/validator/${index}`);
      const attestationsResponse = await axios.get(`https://beaconcha.in/api/v1/validator/${index}/attestations`);

      if (validatorResponse.status === 200 && validatorResponse.data && validatorResponse.data.data) {
        setValidatorData(validatorResponse.data.data);
        setError(null); // Clear any previous error
      } else {
        setError('No data found for the provided validator index. Please check the index and try again.');
        setValidatorData(null);
        setAttestationsData([]);
        setAttestationsError(null); // Clear attestation error as well
        setLoading(false);
        return; // Exit function early on validator data error
      }

      if (attestationsResponse.status === 200 && attestationsResponse.data && attestationsResponse.data.data) {
        const formattedAttestations = attestationsResponse.data.data.map(formatAttestationData);
        setAttestationsData(formattedAttestations);
        if (formattedAttestations.length === 0) {
          setAttestationsError('No Attestation table available for entered validator index.');
        } else {
          setAttestationsError(null); // Clear any previous attestations error
        }
      } else {
        setAttestationsData([]);
        setAttestationsError('No Attestation table available for entered validator index.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again later.');
      setValidatorData(null);
      setAttestationsData([]);
      setAttestationsError(null); // Clear any previous attestation error
    } finally {
      setLoading(false);
    }
  }, [formatAttestationData]);

  useEffect(() => {
    if (paramValidatorIndex) {
      fetchValidatorData(paramValidatorIndex);
    }
  }, [paramValidatorIndex, fetchValidatorData]);

  const handleInputChange = (e) => {
    setValidatorIndex(e.target.value);
    setError(null); // Clear error when input changes
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
      graffiti: 'Graffiti',
      lasttransactiondate: 'Last Transaction Date'
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
      'graffiti',
      'lasttransactiondate'
    ];

    const rows = orderedFields.map(field => {
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

    return rows.filter(row => row !== null);
  };

  const formatValue = (field, value) => {
    if (field === 'balance' || field === 'effectivebalance') {
      return `${(value / 1e9).toFixed(2)} ETH`;
    }
    if (field === 'slashed') {
      return value ? 'Yes' : 'No';
    }
    if (field === 'lasttransactiondate') {
      return new Date(value * 1000).toISOString().replace('T', ' ').replace('Z', ' UTC');
    }
    return value;
  };

  return (
    <div className="validator-tracking">
      <h2>Ethereum Validator Tracking</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Validator Index / Public Key: </label>
          <label>
          <input type="text" placeholder='Enter a Valid Input' value={validatorIndex} onChange={handleInputChange} />
        </label>
        <button type="submit">Track Validator</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && !loading && (
        <div className="error">
          {error} <Link to="/Help">Click here for Help</Link>
        </div>
      )}
      {!loading && validatorData && !error && (
        <div className="validator-info">
          {renderRows(validatorData).length > 0 ? (
            <>
              <h3>Validator Information</h3>
              <table>
                <tbody>
                  {renderRows(validatorData)}
                </tbody>
              </table>
              {!attestationsError && attestationsData.length === 0 && (
                <div className="error">
                  No Attestation table available for entered validator index.
                </div>
              )}
            </>
          ) : (
            <div className="error">
               No data found for the provided validator index. Please check the index and try again.
            </div>
          )}
        </div>
      )}

      {!loading && !error && attestationsData.length > 0 && (
        <div className="attestations">
          <button className="attestations-button" onClick={toggleAttestations}>
            {showAttestations ? 'Hide Attestations' : 'Show Attestations'}
          </button>
          {showAttestations && (
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
          )}
        </div>
      )}

      {!loading && attestationsError && !error && renderRows(validatorData).length > 0 && (
        <div className="error">
          {attestationsError}
        </div>
      )}
    </div>
  );
};

export default ValidatorTracking;
