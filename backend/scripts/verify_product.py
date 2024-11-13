from brownie import Honey, accounts

def main():
   
    honey = Honey.at("0xB22a91A1060784aCCb63DdA6A0fAe4a5d5f27689")  # deployed contract address
    is_verified = honey.verifyHoneyProduct("fc1c4187700b5d9d518be017ac79d4154006ce79fd17f856f1d8adca0bca45ef")
    if is_verified:
        print("The product is certified")
    else:
        print("This product is not certified")


