const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/countries', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.COUNTRY_URL}/AvailableCountries`)
        res.json(response.data)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/country/:code', async (req, res) => {
    const { code } = req.params;
    try {
        const countryInfoResponse = await axios.get(`${process.env.COUNTRY_URL}/CountryInfo/${code}`);
        const { borders, commonName } = countryInfoResponse.data;

        const populationResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/population', {
            country: commonName
        });

        const flagResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', {
            country: commonName
        });
        res.json({
            commonName,
            borders,
            population: populationResponse.data.data.populationCounts,
            flagUrl: flagResponse.data.data.flag
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;