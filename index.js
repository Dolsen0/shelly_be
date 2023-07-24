const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;

app.get('/home', async (req, res) => {
  try {
    const response = await axios.get('http://192.168.33.1/rpc/Shelly.GetStatus');
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching status' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
