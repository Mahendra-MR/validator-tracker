// src/components/EthereumSupply.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EthereumSupply() {
    const [ethSupply, setEthSupply] = useState(null);
    const apiKey = 'YourApiKeyToken'; // Replace with your actual API key

    useEffect(() => {
        async function fetchEthSupply() {
            const apiUrl = `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${apiKey}`;
            try {
                const response = await axios.get(apiUrl);
                if (response.status === 200) {
                    setEthSupply(response.data.result);
                } else {
                    throw new Error('Failed to fetch Ethereum supply');
                }
            } catch (error) {
                console.error('Error fetching Ethereum supply:', error.message);
            }
        }
        fetchEthSupply();
    }, [apiKey]); // Dependency array includes apiKey to ensure useEffect runs on apiKey change

    return (
        <div>
            <h2>Ethereum Supply Statistics</h2>
            {ethSupply ? (
                <p>Total Ethereum Supply: {ethSupply}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default EthereumSupply;
