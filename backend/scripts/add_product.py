from brownie import Honey, accounts, Wei

def main():

    account = accounts[0] 
    honey_contract = Honey.at("0xB22a91A1060784aCCb63DdA6A0fAe4a5d5f27689")
    # Add a honey product and get the transaction object
    producer = "SweetHoney"
    origin = "Rabat, Morroco"
    productionDate = 1633059100
    transaction = honey_contract.addHoneyProduct(producer, origin, productionDate, {"from": account, "gas_price": Wei("20 gwei")})

    # Wait for the transaction to be mined and confirmed
    transaction.wait(1) 

     # Get the returned value from the transaction (this should be the dataHash)
    data_hash = transaction.return_value

    # Print the dataHash (typically a bytes32, converted to hex for readability)
    print(f"Added Honey Product with Data Hash: {data_hash.hex()}")