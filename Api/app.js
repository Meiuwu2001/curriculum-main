const express = require("express")
const curriculum = require("./routes/curriculum")
const persona = require("./routes/persona")
const idiomas = require("./routes/idiomas")
//rutas
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.use(curriculum)
app.use(persona)
app.use(idiomas)




module.exports = app;