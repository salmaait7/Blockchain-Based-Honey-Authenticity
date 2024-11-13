import React, { useState } from 'react';
import AddProductForm from './components/AddProductForm';
import VerifyProductForm from './components/VerifyProductForm';
import './App.css';
import logo from './Assets/logo.png';

function App() {
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '0xB22a91A1060784aCCb63DdA6A0fAe4a5d5f27689';
  const [selectedOption, setSelectedOption] = useState('add'); // State for the selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="App">
      <header className="app-header">
        <img src={logo} alt="Honey Logo" className="app-logo" />
        <h1>Honey Product Management</h1>
      </header>

      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="add"
            checked={selectedOption === 'add'}
            onChange={handleOptionChange}
          />
          Add Product
        </label>
        <label>
          <input
            type="radio"
            value="verify"
            checked={selectedOption === 'verify'}
            onChange={handleOptionChange}
          />
          Verify Product
        </label>
      </div>

      <div className="form-container">
        {selectedOption === 'add' && <AddProductForm contractAddress={contractAddress} />}
        {selectedOption === 'verify' && <VerifyProductForm contractAddress={contractAddress} />}
      </div>
    </div>
  );
}

export default App;