const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const { startBot } = require('./index');

startBot();

app.get('/', (req, res) => {
  res.send('Janet bot is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
