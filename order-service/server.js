const express = require('express');
const app = express();

const PORT = 3002;

app.get('/', (req, res) => {
  res.send('Order Service is running 💼');
});

app.listen(PORT, () => {
  console.log(`Order Service is running on port ${PORT}`);
});
