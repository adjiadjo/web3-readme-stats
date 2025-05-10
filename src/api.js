const express = require('express');
const fetchStats = require('./fetchStats');

const app = express();
const port = process.env.PORT || 3000;

app.get('/api', async (req, res) => {
  const { address, chain } = req.query;
  const markdown = await fetchStats(address, chain);
  res.send(markdown);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
