const  express = require("express")
const habilidadesController = require("../controllers/habilidades")

const router = express.Router()

//controladores

router.get("/habilidades", habilidadesController.getAllHabilidades)

router.get("/habilidades/:id", habilidadesController.getOneHabilidades)

router.post("/habilidades", habilidadesController.CreateHabilidades)

router.delete("/habilidades/:id", habilidadesController.DeleteHabilidades)

router.put("/habilidades/:id", habilidadesController.UpdateHabilidades)


module.exports = router