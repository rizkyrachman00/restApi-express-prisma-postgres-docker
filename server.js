const express = require("express");
const app = express();
const PORT = 5758;

// server run in ...
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
