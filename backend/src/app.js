const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express()
app.use(cors());
const PORT = process.env.PORT || 8080

const countryRoutes = require('./routes/countries')
app.use('/api', countryRoutes)

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})