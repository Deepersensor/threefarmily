import Web3 from 'web3';

// Connection to Flare testnet (Coston2)
const flareRpcUrl = "https://coston2-api.flare.network/ext/C/rpc";

/**
 * FlareService - A simple service to interact with the Flare blockchain
 */
class FlareService {
  private web3: Web3;
  
  constructor() {
    this.web3 = new Web3(flareRpcUrl);
  }

  /**
   * Get the current chain ID to verify connection
   */
  async getChainId(): Promise<number> {
    try {
      const chainId = await this.web3.eth.getChainId();
      return chainId;
    } catch (error) {
      console.error("Error connecting to Flare network:", error);
      throw error;
    }
  }

  /**
   * Create a new account
   */
  createAccount() {
    try {
      const account = this.web3.eth.accounts.create();
      return {
        address: account.address,
        privateKey: account.privateKey
      };
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }
  
  /**
   * Get contract ABI from the Flare explorer
   */
  async getContractABI(contractAddress: string): Promise<any> {
    try {
      const baseUrl = "https://coston2-explorer.flare.network/api";
      const params = `?module=contract&action=getabi&address=${contractAddress}`;
      
      const response = await fetch(baseUrl + params);
      const data = await response.json();
      
      if (data.status === "1") {
        return JSON.parse(data.result);
      } else {
        throw new Error(`Failed to get ABI: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching contract ABI:", error);
      throw error;
    }
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<string> {
    try {
      const balance = await this.web3.eth.getBalance(address);
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  }

  /**
   * Send transaction
   */
  async sendTransaction(from: string, to: string, amount: string, privateKey: string): Promise<any> {
    try {
      // Convert amount to Wei
      const amountWei = this.web3.utils.toWei(amount, 'ether');

      // Get gas price and nonce
      const gasPrice = await this.web3.eth.getGasPrice();
      const nonce = await this.web3.eth.getTransactionCount(from, 'latest');
      
      // Create transaction object
      const txObject = {
        from,
        to,
        value: amountWei,
        gas: '21000', // Standard gas limit for simple transfers
        gasPrice,
        nonce
      };
      
      // Sign transaction
      const signedTx = await this.web3.eth.accounts.signTransaction(txObject, privateKey);
      
      if (!signedTx.rawTransaction) {
        throw new Error("Failed to sign transaction");
      }
      
      // Send signed transaction
      return await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    } catch (error) {
      console.error("Error sending transaction:", error);
      throw error;
    }
  }

  /**
   * Purchase marketplace item
   */
  async purchaseMarketplaceItem(
    buyerAddress: string,
    sellerAddress: string,
    amount: string,
    privateKey: string,
    itemId: number
  ): Promise<any> {
    try {
      // In a real application, you'd interact with a marketplace smart contract
      // For simplicity, we'll just do a direct transfer here
      const receipt = await this.sendTransaction(buyerAddress, sellerAddress, amount, privateKey);
      
      // Store transaction with item reference (in real app, this would be done via smart contract)
      console.log(`Item ${itemId} purchased by ${buyerAddress} from ${sellerAddress} for ${amount} ETH`);
      return {
        success: true,
        transactionHash: receipt.transactionHash,
        itemId,
        amount
      };
    } catch (error) {
      console.error(`Error purchasing item ${itemId}:`, error);
      throw error;
    }
  }

  /**
   * Interact with smart contract
   */
  async callContractMethod(
    contractAddress: string, 
    contractAbi: any,
    methodName: string, 
    params: any[],
    fromAddress: string
  ): Promise<any> {
    try {
      const contract = new this.web3.eth.Contract(contractAbi, contractAddress);
      
      // Call read-only method
      if (!contract.methods[methodName]) {
        throw new Error(`Method ${methodName} not found in contract`);
      }
      
      return await contract.methods[methodName](...params).call({ from: fromAddress });
    } catch (error) {
      console.error(`Error calling contract method ${methodName}:`, error);
      throw error;
    }
  }

  /**
   * Execute a contract transaction (state changing)
   */
  async executeContractTransaction(
    contractAddress: string,
    contractAbi: any,
    methodName: string,
    params: any[],
    fromAddress: string,
    privateKey: string,
    value: string = '0'
  ): Promise<any> {
    try {
      const contract = new this.web3.eth.Contract(contractAbi, contractAddress);
      
      // Get gas price and nonce
      const gasPrice = await this.web3.eth.getGasPrice();
      const nonce = await this.web3.eth.getTransactionCount(fromAddress, 'latest');
      const valueWei = this.web3.utils.toWei(value, 'ether');
      
      // Estimate gas
      const gasEstimate = await contract.methods[methodName](...params).estimateGas({
        from: fromAddress,
        value: valueWei
      });
      
      // Create transaction data
      const data = contract.methods[methodName](...params).encodeABI();
      
      // Create transaction object
      const txObject = {
        from: fromAddress,
        to: contractAddress,
        gas: Math.floor(gasEstimate * 1.2).toString(), // Add 20% buffer
        gasPrice,
        nonce,
        value: valueWei,
        data
      };
      
      // Sign transaction
      const signedTx = await this.web3.eth.accounts.signTransaction(txObject, privateKey);
      
      if (!signedTx.rawTransaction) {
        throw new Error("Failed to sign transaction");
      }
      
      // Send signed transaction
      return await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    } catch (error) {
      console.error(`Error executing contract transaction ${methodName}:`, error);
      throw error;
    }
  }

  /**
   * Convert price from ETH display format to actual value
   */
  convertDisplayPriceToValue(displayPrice: string): string {
    // Parse the ETH amount from display format like "0.8 ETH"
    const match = displayPrice.match(/(\d+\.?\d*)/);
    if (match && match[1]) {
      return match[1];
    }
    return '0';
  }
}

// Export a singleton instance
const flareService = new FlareService();
export default flareService;
