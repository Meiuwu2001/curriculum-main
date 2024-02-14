const  express = require("express")
const curriculumController = require("../controllers/preparacionAcademica")

const router = express.Router()

//controladores

router.get("/preparacion", curriculumController.getAllPreparacion)

router.get("/preparacion/:id", curriculumController.getOnePreparacion)

router.post("/preparacion", curriculumController.CreatePreparacion)

router.delete("/preparacion/:id", curriculumController.DeletePreparacion)

router.put("/preparacion/:id", curriculumController.UpdatePreparacion)


module.exports = router