const express = require('express');

const app = express();

//app.com
//app.com/help
//app.com/about



/*
req - The first is an object containing information about the incoming request to the server.
res - So this contains a bunch of methods allowing us to customize what we're going to send back to the requester.
*/
//1st Route
app.get('', (req, res) => {
   /* 
    found the matching router and route
    the matching route which is this one for the route and it processed the request using our handler the
    handler used response dot send to send back a text response and that is exactly what we're seeing inside
    of the browser.
    */

    //display on browser
    res.send('<h1> Weather 1 </h1>');

});

//2st Route
app.get('/help', (req, res) => {
    res.send(
        [
        {
            name: 'Gilberto',
            age: 24
        },
        {
            name: 'Andrew',
            age: 27
        },
        ]
    ); 
});


//3st Route
app.get('/about', (req, res) => {
    res.send('<h1> About </h1>'); 
});

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

