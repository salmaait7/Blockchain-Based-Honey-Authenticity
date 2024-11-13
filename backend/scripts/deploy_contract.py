from brownie import Honey, accounts , Wei

def main():
    deployer_account = accounts[0]  
    
    # Deploy the HoneyRegistry contract
    honey_registry_contract = Honey.deploy({"from":deployer_account, "gas_price": Wei("10 gwei")})
    
    # Print the address where the contract was deployed
    print(f"HoneyRegistry contract deployed at address: {honey_registry_contract.address}")
    print(f"the address of deployer is: {deployer_account.address}")