const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors()); // Allow requests from different origins
app.use(bodyParser.json()); // Parse JSON requests

// Load and serve the JSON file
app.get('/api/paragraphs', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data");
    }
    res.send(JSON.parse(data));
  });
});

// Update paragraphs
app.post('/api/update-paragraphs', (req, res) => {
  const updatedParagraphs = req.body;
  fs.writeFile('data.json', JSON.stringify(updatedParagraphs, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error saving data");
    }
    res.send({ message: 'Paragraphs updated successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
