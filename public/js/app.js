

console.log('Client side javascript file is loaded!');

//Getting data into client-side
//Using fetch API 

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

// http://localhost:3000/weather?address=lisbon

fetch('http://localhost:3000/weather?address=lisbon').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location);
            console.log(data.forecast);
        }
    })
})


