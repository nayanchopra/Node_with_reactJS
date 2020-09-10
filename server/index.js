const express = require('express');

//Here we are initializing an express server
const app = express();

//Creating an API
app.get('/',(req,res) => {
    res.send({
        hi : 'there'
    });
})

//Dynamically changing port between Prod and Dev Environment
const PORT = process.env.PORT || 5000;
app.listen(PORT);