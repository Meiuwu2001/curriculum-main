const  express = require("express")
const curriculumController = require("../controllers/curriculum")

const router = express.Router()

//controladores

router.get("/curriculum", curriculumController.getAllCurriculum)

router.get("/curriculum/:id", curriculumController.getOneCurriculum)

router.post("/curriculum", curriculumController.CreateCurriculum)

router.delete("/curriculum/:id", curriculumController.DeleteCurriculum)

router.put("/curriculum/:id", curriculumController.UpdateCurriculum)


module.exports = router