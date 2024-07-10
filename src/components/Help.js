import React from 'react';

const Help = () => {
  return (
    <div style={Styles.text}>
      <h1>Help Validator Tracker</h1>

      <p>
        Welcome to the Ethereum Validator Tracking application! This tool enables you to monitor detailed information about Ethereum validators, including their performance and attestations. Below is a comprehensive guide to help you effectively use the application.
      </p>

      <h2>What is a Validator Index?</h2>
      <p>
        In the Ethereum blockchain, validators are responsible for proposing and validating blocks. Each validator is assigned a unique identifier known as a "validator index." This index is crucial for tracking and retrieving specific data related to a validator's activity.
      </p>
      <p><strong>Example of Validator Index:</strong> A typical validator index is a numeric value, such as 12345, which uniquely identifies a validator on the Ethereum network.</p>

      <h2>Using Public Key Instead of Validator Index:</h2>
      <p>
        Alternatively, you can use the validator's public key. This is a long alphanumeric string that uniquely identifies a validator.
      </p>
      <p><strong>Example of Public Key:</strong> An example of a public key: 0x8c5fecdC472E27Bc447696F431E425D02dd46a8c.</p>

      <h2>How to Enter a Validator Index or Public Key:</h2>
      <p><strong>Valid Inputs:</strong></p>
      <ul>
        <li>Numeric Values: Validator index must be a numeric value (e.g., 1024, 5678, 4321).</li>
        <li>Public Key: Valid alphanumeric string without spaces or invalid characters.</li>
      </ul>
      <p><strong>Steps to Enter Validator Index or Public Key:</strong></p>
      <ol>
        <li>Locate the Input Field: Find the "Validator Index or Public Key" input field on the main tracking page.</li>
        <li>Enter the Index or Public Key: Input the numeric validator index or the public key without spaces.</li>
        <li>Submit the Input: Click "Track Validator" to fetch and display the validator's data.</li>
      </ol>

      <h2>Understanding the Output:</h2>
      <p>After submitting a valid validator index or public key, detailed information about the validator will be displayed. Here’s what each field represents:</p>
      <ul>
        <li>Validator Index: The unique identifier of the validator on the Ethereum network.</li>
        <li>Status: Current status of the validator, such as active, pending activation, or exited from the active set.</li>
        <li>Balance: The current amount of Ether (ETH) held by the validator.</li>
        <li>Public Key: The cryptographic public key associated with the validator.</li>
        <li>Activation Eligibility Epoch: The epoch when the validator became eligible for activation.</li>
        <li>Activation Epoch: The epoch when the validator was activated and started participating in block proposal and validation.</li>
        <li>Exit Epoch: The epoch when the validator voluntarily exited from the active set.</li>
        <li>Withdrawable Epoch: The epoch after which the validator can withdraw their balance.</li>
        <li>Withdrawal Credentials: Information necessary to withdraw the validator’s balance securely.</li>
        <li>Slashed: Indicates whether the validator has been penalized (slashed) for misconduct.</li>
        <li>Effective Balance: The validator's balance considered for staking calculations.</li>
        <li>Attestation Count: Total number of attestations (votes) made by the validator to confirm blocks.</li>
        <li>Attestation Inclusion Distance: The distance in epochs between when an attestation was made and when it was included in a block.</li>
        <li>Graffiti: Optional custom data attached by the validator to attestations or blocks.</li>
      </ul>

      <h2>Handling Errors:</h2>
      <p><strong>Common Errors and Solutions:</strong></p>
      <ul>
        <li>Invalid Input: Ensure the input is a valid numeric value or public key.</li>
        <li>Data Fetch Errors: "Failed to fetch data. Please try again later."</li>
        <li>No Data Found: "No data found for the entered validator index or public key."</li>
      </ul>

      <p><strong>Additional Information:</strong></p>
      <ul>
        <li>Attestations: Click "Show Attestations" to view detailed attestation data.</li>
        <li>Loading State: A loading spinner indicates data fetching is in progress.</li>
        <li>Responsive Design: Designed to work seamlessly across devices.</li>
      </ul>
    </div>
  );
};

const Styles = {
  text: {
    color: '#333',
    fontSize: '16px',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6'
  }
};

export default Help;
