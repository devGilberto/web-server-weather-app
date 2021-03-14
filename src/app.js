/* Partials with handlebars partials
That's where a partial comes from.
So think about parts of the web page that you're gonna end up 
reusing across multiple pages in your site.
This would be things like headers or footers where you want the exact same thing 
showing on every page
to give your site a nice unified feel.



nodemon src/app.js -e js,hbs

*/


const path = require('path'); //nodejs core module
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname)
// console.log(path.join(__dirname, './public'));

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); //customizing Views Directory
const partialsPath = path.join(__dirname, '../templates/partials'); //partials Directory

//app.com
//app.com/help
//app.com/about

//template engine  
//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); //customizing Views Directory
hbs.registerPartials(partialsPath); //config partials



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
            name: 'Gilberto Fernandes'
        }
    ); //(<nameOfViewWithoutFileExtension>, <objectContainsValuesToThroughtToView>)

});


//About Page Route
app.get('/about', (req, res) => {

    res.render('about',
        {
            title: 'About',
            name: 'Gilberto Fernandes',
            imgSrc: '/img/robot.png'
        }
    );

});


//Help Page Route
app.get('/help', (req, res) => {
    res.render('help',
        {
            title: 'Help Page',
            name: 'Gilberto Fernandes',
            helpText: ' This is some helpful text.'
        }
    );

});


// Weather Page Route
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address term!'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return console.log(error);
        }



        forecast(latitude, longitude, (error, forecastData) => {  //44.1545, -75.7088
            if (error) {
                return console.log(error);
            }

            console.log(location)
            console.log(forecastData)
        });
    });

    res.send(
        {
            forecast: 'It is snowing',
            location: 'Lisbon',
            address: req.query.address
        }
    );
});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    });
});
//localhost:3000/products?key=value
//localhost:3000/products?search=games
//localhost:3000/products?search=games&rating=5



app.get('/help/*', (req, res) => {

    res.render('404',
        {
            title: '404',
            name: 'Gilberto Fernandes',
            errorMessage: 'Help article Not Found.'
        }
    );
});

//last Route !!!!
/*
    Why?
        Why does app dot get need to come last after all other routes are set up.
        Well this has to do with how Express is going to end up matching the incoming request with the correct
        route handler when Express gets an incoming request it starts to look for a match.


    *  -> everything is a match
*/
app.get('*', (req, res) => {
    res.render('404',
        {
            title: '404',
            name: 'Gilberto Fernandes',
            errorMessage: '404 Page Not Found.'
        }
    );
});



// ================================================
//  === START SERVER ===
//(<port>, callback)
// callback function which just runs when the server is up and running.
//localhost:3000
app.listen(3000, () => {

    console.log('Server is up on port 3000.'); //display as usefull information when running the application

});

