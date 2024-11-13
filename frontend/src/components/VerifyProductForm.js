import React, { useState } from 'react';
import Web3 from 'web3';
import honeyAbi from '../contracts/honeyAbi.json';

const contractAddress = '0x3Cc3966DaA00020c004454Cdb844E45ce348d414';

function VerifyProductForm() {
  const [Hash, setHash] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  const handleVerifyProduct = async () => {
    if (typeof window.ethereum === 'undefined') {
      setVerificationResult('Please install MetaMask or another Ethereum wallet.');
      return;
    }
  
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  
    const honeyContract = new web3.eth.Contract(honeyAbi, contractAddress);
  
    try {
      const result = await honeyContract.methods.verifyHoneyProduct(Hash).call();
      setVerificationResult(result ? 'Product is authentic.' : 'Product is not authentic.');
    } catch (error) {
      console.error('Error verifying product:', error);
      setVerificationResult('Error verifying product.');
    }
  };
  

  return (
    <div>
      <h2>Verify Honey Product</h2>
      <input
        type="text"
        placeholder="Enter Hash"
        value={Hash}
        onChange={(e) => setHash(e.target.value)}
      />
      <button onClick={handleVerifyProduct}>Verify</button>
      <p>{verificationResult}</p>
    </div>
  );
}

export default VerifyProductForm;
