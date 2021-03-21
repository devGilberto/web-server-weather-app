const request = require('postman-request');


if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}



const geocode = (address, callback) => {
    const at = process.env.ACCESS_TOKEN_MAPBOX;

    //encodeURIComponent(address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + at + '&limit=1';

    //shorthand syntax
    // url: url 
    // something with 
    // url
    // ****************** 
    //response
    //changed to
    // { body }
    request({ url, json: true }, (error, { body }) => {


        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }

        else {
            const geocodeObj = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, geocodeObj)
        }
    })

}

module.exports = geocode;