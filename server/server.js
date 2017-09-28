// Required modules

const path = require('path');
const express = require('express');


// Express configurations

let app = express();
let port = process.env.PORT || 3000;
let publicPath = path.join(__dirname, '/../public');
app.use(express.static(publicPath));



// Starting up the server

app.listen(port, function () {
    console.log(`Server started at port : ${port}`);
})