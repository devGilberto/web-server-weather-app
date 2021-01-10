const path = require('path'); //nodejs core module
const express = require('express');

// console.log(__dirname)
// console.log(path.join(__dirname, './public'));

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates'); //customizing Views Directory
 
//app.com
//app.com/help
//app.com/about

//template engine  
//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); //customizing Views Directory

//Start Server in a public directory
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

/*
req - The first is an object containing information about the incoming request to the server.
res - So this contains a bunch of methods allowing us to customize what we're going to send back to the requester.
*/

//Index Page Route
app.get('', (req, res) => {
    
    res.render('index', 
        {
            title: 'Weather App',
            name: 'Andrew Mead'
        }    
    ); //(<nameOfViewWithoutFileExtension>, <objectContainsValuesToThroughtToView>)
 
});


//About Page Route
app.get('/about', (req, res) => {

    res.render('about', 
        {
            title: 'About',
            imgSrc: '/img/robot.png'
        }
    );

});


//Help Page Route
app.get('/help', (req, res) => {
    res.render('help', 
        {
            title: 'Help Page'
        }
    );

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

