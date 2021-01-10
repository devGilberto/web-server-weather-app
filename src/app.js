const path = require('path'); //nodejs core module
const express = require('express');

// console.log(__dirname)
// console.log(path.join(__dirname, './public'));

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

 
//app.com
//app.com/help
//app.com/about

//Start Server in a public directory
app.use(express.static(publicDirectoryPath));

/*
req - The first is an object containing information about the incoming request to the server.
res - So this contains a bunch of methods allowing us to customize what we're going to send back to the requester.
*/
// Weather Page Route
app.get('/weather', (req, res) => {
    res.send(
        {
            forecast: 'It is snowing',
            location: 'Lisbon'
        }
    ); 
});



//(<port>, callback)
// callback function which just runs when the server is up and running.
//localhost:3000
app.listen(3000, () => {

    console.log('Server is up on port 3000.'); //display as usefull information when running the application

});     

