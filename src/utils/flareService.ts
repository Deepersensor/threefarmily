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
}

// Export a singleton instance
const flareService = new FlareService();
export default flareService;
