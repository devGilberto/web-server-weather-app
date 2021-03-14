const request = require('postman-request');



const forecast = (latitude, longitude, callback) => {

    const ak = process.env.ACCESS_KEY_WEATHERSTACK;
    const url = 'http://api.weatherstack.com/current?access_key=' + ak + '&query=' + latitude +',' + longitude + '&units=m';
    // const url = 'http://api.weatherstack.com/current?access_key=' + ak + '&query=' + longitude +',' + latitude + '&units=m';

    //shorthand syntax
    // url: url 
    // something with 
    // url
    // ****************** 
    //response
    //changed to
    // { body }
    request({url, json: true}, (error, { body }) => {
        const forecastObj = {
            weather_descriptions: body.current.weather_descriptions[0],
            temperature: body.current.temperature,
            feelslike: body.current.feelslike 
        };

        //destructuring syntax
        const { weather_descriptions, temperature, feelslike} = forecastObj;

        if(error){
            callback('Unable to connect to weather service!', undefined);
        }
            else if(body.error){
                callback('Unable to find location.', undefined);

        }
        else{
            callback(
                error, //or undefined
                // {
                //     latitude: latitude, 
                //     longitude: longitude
                // }
                weather_descriptions +
                ". It is currently " + 
                temperature + 
                " degrees out. It feels like " + 
                feelslike  +
                " degrees out."
            );

        }


    })

    

}


module.exports = forecast;