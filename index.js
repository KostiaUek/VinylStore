const express = require('express');
// const cors = require('cors');
const trackApi = require('./api/track/track.js')
const mockarooApi = require("./api/mockaroo/mockaroo.js")
const app = express();
const port = 4528;

// Defining functions
const functions = {
  getImage: (author, track) => trackApi.getImageFromTrackName(author, track),
  getArtistsAndNames: () => mockarooApi.getArtistsAndTracksList(),
};


// Test message
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// app.use(cors());
// Example: http://localhost:4528/getimage?author=<AUTHOR_NAME_HERE>&track=<TRACK_NAME_HERE>
app.get('/getimage', (req, res) => {
  const author = req.query.author;
  const track = req.query.track;
  
  res.header("Access-Control-Allow-Origin", "*");
  Promise.resolve(functions.getImage(author, track)).then((result)=> res.send(result));
});

app.get('/getArtistsAndNames', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  Promise.resolve(functions.getArtistsAndNames()).then((result)=> res.send(result));
});

// Start the server
app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});

module.exports = app;