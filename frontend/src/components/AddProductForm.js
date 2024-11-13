import React, { useState } from 'react';
import Web3 from 'web3';
import honeyAbi from '../contracts/honeyAbi.json';
import './AddProductForm.css';

const HoneyProductForm = ({ contractAddress }) => {
  const [producer, setProducer] = useState('');
  const [origin, setOrigin] = useState('');
  const [productionDate, setProductionDate] = useState('');
  const [message, setMessage] = useState('');
  const [dataHash, setDataHash] = useState('');

  const handleAddHoneyProduct = async () => {
    try {
      if (!window.ethereum) {
        setMessage('Please install MetaMask or another Ethereum wallet.');
        return;
      }

      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      const honeyContract = new web3.eth.Contract(honeyAbi, contractAddress);

      const productionTimestamp = new Date(productionDate).getTime() / 1000;
      if (isNaN(productionTimestamp)) {
        throw new Error('Invalid production date.');
      }

      const transaction = await honeyContract.methods
        .addHoneyProduct(producer, origin, productionTimestamp)
        .send({ from: accounts[0] });

      // Extract the event logs to find the dataHash
      const event = transaction.events.ProductAdded;
      if (event) {
        const returnedDataHash = event.returnValues.dataHash;
        setDataHash(returnedDataHash);
        setMessage('Honey product added successfully!');
      } else {
        setMessage('Transaction completed, but no dataHash found.');
      }
    } catch (error) {
      setMessage('You do not have the authority to add a product');
    }
  };

  return (
    <div>
      <h2>Add Honey Product</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddHoneyProduct(); }}>
        <label>Producer:</label>
        <input value={producer} onChange={(e) => setProducer(e.target.value)} />
        <label>Origin:</label>
        <input value={origin} onChange={(e) => setOrigin(e.target.value)} />
        <label>Production Date:</label>
        <input type="date" value={productionDate} onChange={(e) => setProductionDate(e.target.value)} />
        <button type="submit">Add Honey Product</button>
      </form>
      <p>{message}</p>
      {dataHash && <p>Data Hash: {dataHash}</p>}
    </div>
  );
};

export default HoneyProductForm;