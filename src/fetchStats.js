const { ethers } = require('ethers');
const axios = require('axios');

// Ethereum Provider (using default Ethereum provider, could be Infura/Alchemy)
const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

// Token contract ABI for ERC20 tokens
const erc20Abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function symbol() view returns (string)"
];

// Function to fetch wallet data and format it to Markdown
async function fetchStats(address, chain) {
  // Convert address to lowercase to ensure proper matching
  const walletAddress = address.toLowerCase();

  // Fetch ETH balance
  const ethBalance = await provider.getBalance(walletAddress);
  const formattedEthBalance = ethers.utils.formatEther(ethBalance);

  // Fetch top tokens - For simplicity, we will use a few known ERC20 token contract addresses
  const tokens = [
    { symbol: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7' },  // USDT
    { symbol: 'DAI', address: '0x6b175474e89094c44da98b954eedeac495271d0f' },  // DAI
    { symbol: 'UNI', address: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbbbBB' }   // UNI (just an example, not the actual contract address)
  ];

  let markdown = `# Wallet Stats for ${walletAddress}\n\n`;
  markdown += `**ETH Balance**: ${formattedEthBalance} ETH\n\n`;

  // Fetch balances for each token
  for (let token of tokens) {
    try {
      const tokenContract = new ethers.Contract(token.address, erc20Abi, provider);
      const tokenBalance = await tokenContract.balanceOf(walletAddress);
      const formattedTokenBalance = ethers.utils.formatUnits(tokenBalance, 18);  // Assuming 18 decimals
      markdown += `**${token.symbol} Balance**: ${formattedTokenBalance} ${token.symbol}\n`;
    } catch (error) {
      console.error(`Error fetching balance for token ${token.symbol}:`, error);
      markdown += `**${token.symbol} Balance**: Error fetching balance\n`;
    }
  }

  return markdown;
}

module.exports = fetchStats;
