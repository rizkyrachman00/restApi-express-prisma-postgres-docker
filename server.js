const express = require("express");
const app = express();
const PORT = 5758;

// dummy data
let data = {
  name: "rizky",
  job: "job hunter",
};

// Middleware
app.use(express.json());

// server run in ...
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Type 1 - Website endpoints -> these endpoints are for sending back html and they typically come when a user enter a url in a browser

app.get("/", (req, res) => {
  console.log("Success, Hit this endpoint", req.method);

  res.send(`
    <body>
      <h1>Data :</h1>
      <p> ${JSON.stringify(data)} </p>
    </body>
    `);

  // res.send("<h1>Halo Dunia</h1><input />"); // HTML Format

  // res.sendStatus(200).send("Halo Dunia"); // OK
  // res.sendStatus(201).send("Halo Dunia"); // Created
});

app.get("/dashboard", (req, res) => {
  console.log("Hit the endpoint /dashboard");
  res.send("Halo dashboard");
});

// Type 2 - API endpoints

app.get("/api/data", (req, res) => {
  console.log("Endpoint not visual");
  res.send(data);
});

app.post("/api/data", (req, res) => {
  const newEntryData = req.body;
  console.log(newEntryData);
  res.sendStatus(201);
});
