const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

// console.log(__dirname);
//console.log(__filename);
// console.log(path.join(__dirname, '../public'))

const app = express();

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather ',
        name: 'Vipin khichi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name: 'Vipin Khichi'
    }); 
})

app.get('/help', (req, res) => {
    res.render('help', {
       helpText: 'This is some helpful text',
       title: 'Help',
       name: 'Vipin Khichi'
    })
})

//We cannot see the below rout handler be on home page 
// app.get('', (req, res) => {
//     res.send('<h1>weather</h1>');
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'vipin',
//         location:'Haryana'
//     }, {
//         name: 'sachin',
//         location: 'Mahendergarh'
//     }]);
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>');
// })

app.get('/weather', (req, res) => {

    if(!req.query.address){
         return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error})
            }

            res.send( {
                forecast : forecastData,
                location: location,
                address: req.query.address
            })
        })
    });

})


/*app.get('/products', (req, res) => {

    //console.log(req.query.search);
    if(!req.query.search){
         return res.send({
            error: 'You must provide a search term'
        }) 
    }
    res.send({
        products:[]
    })
})*/

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        name: 'Vipin Khichi',
        errorMessage: 'Help article not found'
    })

})

//Node provide a wild card character that match any which cannot match so far
app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Vipin Khichi',
        errorMessage:'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})