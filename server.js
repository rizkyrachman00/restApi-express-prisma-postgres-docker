const express = require("express");
const app = express();
const PORT = 5758;

// dummy data
let data = ["Budi-json"];

// Middleware
app.use(express.json());

// server run in ...
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Type 1 - Website endpoints -> these endpoints are for sending back html and they typically come when a user enter a url in a browser

app.get("/", (req, res) => {
  console.log("Success, User requested home page website");

  res.send(`
    <body>
      <h1>Data :</h1>
      <p> ${JSON.stringify(data)} </p>
      <a href="/dashboard">Go to Dashboard</a>
    </body>
    <script>console.log("Hi from the server")</script>

    `);

  // res.send("<h1>Halo Dunia</h1><input />"); // HTML Format

  // res.sendStatus(200).send("Halo Dunia"); // OK
  // res.sendStatus(201).send("Halo Dunia"); // Created
});

app.get("/dashboard", (req, res) => {
  console.log("Hit the endpoint /dashboard");
  res.send(`
    <body>
      <h1>Dashboard</h1>
      <a href="/">Go To Home</a>
    </body>
    `);
});

// Type 2 - API endpoints

app.get("/api/data", (req, res) => {
  console.log("Endpoint not visual");
  res.status(200).send(data);
});

app.post("/api/data", (req, res) => {
  const newEntryData = req.body;
  console.log(newEntryData);

  data.push(newEntryData.name);

  res.sendStatus(201);
});

app.delete("/api/data", (req, res) => {
  data.pop();
  console.log("Success delete the element of the end of the array data");

  res.sendStatus(200);
});
