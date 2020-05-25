var express = require('express');
var router = express.Router();

// Generate a UUID for the client (this way of course not recommended for production!)
const generateClientId = () => Math.floor(Math.random() * 10000)

let db = {
    countries: {
        1: {
            id: 1,
            name: 'Indiastan',
            threat: 2,
            countdown: 300,
            eliminated: false,
            activated: false
        }, 2: {
            id: 2,
            name: 'North Korpan',
            threat: 4,
            countdown: 300,
            eliminated: false,
            activated: false,
        }, 3: {
            id: 3,
            name: 'United Provinces of America',
            threat: 1,
            countdown: 300,
            eliminated: false,
            activated: false,
        }
    }
}

const getCountryById = (id) => {
    return db.countries[id]
}

router.get('/', function(req, res, next) {
    // On the first request, if the client doesn't have a clientId cookie set, set it as we would like some way to uniquely identify the client.
    let { clientId } = req.cookies
    if (typeof clientId === 'undefined') {
        clientId = generateClientId()
        console.log('trying to set cookie')
        const options = {
            maxAge: 1000 * 60 * 30, // expire after 30 minutes
            httpOnly: false,
            signed: false
        }
        res.cookie('clientId', clientId, options)
    }
    res.json(db.countries)
});

router.post('/create', (req, res, next) => {
    const newCountryInfo = req.body

    db.countries[newCountryInfo.id] = newCountryInfo

    const data = {
        country: newCountryInfo
    }
    const io = req.app.get('socketio')
    io.emit('update', data)

    res.json({
        message: "OK",
        status: 200,
    })
})

router.put('/update', (req, res, next) => {
    const { clientId } = req.cookies

    const updatedCountryInfo = req.body
    const countryId = updatedCountryInfo.id

    const country = {
        ...getCountryById(countryId),
        ...updatedCountryInfo
    }
    const data = {
        country,
        clientId
    }
    db.countries[countryId] = country

    const io = req.app.get('socketio')
    io.emit('update', data)

    res.json({
        message: "OK",
        status: 200,
    })
})

router.delete('/delete', (req, res, next) => {
    const countryId = req.body.id

    db.countries[countryId].eliminated = true

    const data = {
        country: db.countries[countryId]
    }
    const io = req.app.get('socketio')
    io.emit('update', data)

    res.json({
        message: "OK",
        status: 200,
    })
})

module.exports = router;
