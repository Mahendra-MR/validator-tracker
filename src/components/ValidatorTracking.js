import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ValidatorTracking.css';

const ValidatorTracking = () => {
  const { validatorIndex: paramValidatorIndex } = useParams();
  const [validatorIndex, setValidatorIndex] = useState(paramValidatorIndex || '');
  const [validatorData, setValidatorData] = useState(null);
  const [attestationsData, setAttestationsData] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAttestations, setShowAttestations] = useState(false); // State to manage showing attestations

  const fetchAdditionalDetails = useCallback(async (index) => {
    try {
      const response = await axios.get(`https://additional-api.com/details/${index}`);
      if (response.status === 200 && response.data) {
        return response.data;
      } else {
        console.error('Additional details data not found or not in the expected format.');
        return null;
      }
    } catch (err) {
      console.error('Error fetching additional details:', err);
      return null;
    }
  }, []);

  const fetchValidatorData = useCallback(async (index) => {
    setLoading(true);
    setError(null);

    try {
      const validatorResponse = await axios.get(`https://beaconcha.in/api/v1/validator/${index}`);
      const attestationsResponse = await axios.get(`https://beaconcha.in/api/v1/validator/${index}/attestations`);
      const additionalDetailsResponse = await fetchAdditionalDetails(index);

      if (validatorResponse.status === 200 && validatorResponse.data && validatorResponse.data.data) {
        setValidatorData(validatorResponse.data.data);
      } else {
        setError('Validator data not found or not in the expected format.');
      }

      if (attestationsResponse.status === 200 && attestationsResponse.data && attestationsResponse.data.data) {
        const formattedAttestations = attestationsResponse.data.data.map(formatAttestationData);
        setAttestationsData(formattedAttestations);
      } else {
        setError('Attestations data not found or not in the expected format.');
      }

      if (additionalDetailsResponse) {
        setAdditionalDetails(additionalDetailsResponse);
      }
    } catch (err) {
      console.error('Error fetching data:', err); // Log the error for debugging
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [fetchAdditionalDetails]);

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

  const formatAttestationData = (attestation) => ({
    epoch: attestation.epoch,
    slot: attestation.attesterslot,
    committeeIndex: attestation.committeeindex !== undefined ? attestation.committeeindex : 'N/A',
    sourceEpoch: attestation.source && attestation.source.epoch ? attestation.source.epoch : 'N/A',
    targetEpoch: attestation.target && attestation.target.epoch ? attestation.target.epoch : 'N/A',
    inclusionDelay: attestation.inclusiondelay !== undefined ? attestation.inclusiondelay : 'N/A',
    aggregationBits: attestation.aggregationbits !== undefined ? attestation.aggregationbits : 'N/A',
  });

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
          {showAttestations && (
            <>
              <h3>Attestations</h3>
              <div className="attestations-table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Epoch</th>
                      <th>Slot</th>
                      <th>Committee Index</th>
                      <th>Source Epoch</th>
                      <th>Target Epoch</th>
                      <th>Inclusion Delay</th>
                      <th>Aggregation Bits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attestationsData.map((attestation, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{attestation.epoch || 'N/A'}</td>
                        <td>{attestation.slot || 'N/A'}</td>
                        <td>{attestation.committeeIndex}</td>
                        <td>{attestation.sourceEpoch}</td>
                        <td>{attestation.targetEpoch}</td>
                        <td>{attestation.inclusionDelay}</td>
                        <td>{attestation.aggregationBits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {additionalDetails && (
        <div className="additional-details">
          <h3>Additional Details</h3>
          <pre>{JSON.stringify(additionalDetails, null, 2)}</pre>
        </div>
      )}

    </div>
  );
};

export default ValidatorTracking;








