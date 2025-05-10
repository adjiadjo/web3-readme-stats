#!/usr/bin/env node
const fetchStats = require('./fetchStats');

const args = process.argv.slice(2);
const address = args[0] || '0x123...';  // Default address
const chain = args[1] || 'ethereum';   // Default chain

fetchStats(address, chain).then(markdown => {
  console.log(markdown);
});