const express = require("express")
const curriculum = require("./routes/curriculum")
const persona = require("./routes/persona")

//rutas
const cors = require("cors")
const bodyParser = require('body-parser');

const app = express()

app.use(cors())
app.use(express.json())

app.use(curriculum)
app.use(persona)




module.exports = app;