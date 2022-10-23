//heroku needs this file to configure the server
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000; //heroku has its own port variable but just incase we are using in the system, it should use port 3000

app.use(express.static(publicPath)); //the file to be served by heroku

app.get('*', (req, res) => { //get all paths
  res.sendFile(path.join(publicPath, 'index.html'));//when sucessful,send/serve the index.html file
});

app.listen(port, () => {
  console.log('Server is up!');
});
