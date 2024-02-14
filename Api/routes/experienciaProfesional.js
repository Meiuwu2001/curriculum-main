const  express = require("express")
const curriculumController = require("../controllers/experienciaProfesional")

const router = express.Router()

//controladores

router.get("/experiencia", curriculumController.getAllExperiencia)

router.get("/experiencia/:id", curriculumController.getOneExperiencia)

router.post("/experiencia", curriculumController.CreateExperiencia)

router.delete("/experiencia/:id", curriculumController.DeleteExperiencia)

router.put("/experiencia/:id", curriculumController.UpdateExperiencia)


module.exports = router