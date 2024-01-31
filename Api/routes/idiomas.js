const  express = require("express")
const curriculumController = require("../controllers/idiomas")

const router = express.Router()

//controladores

router.get("/idiomas", curriculumController.getAllCertificacion)

router.get("/idiomas/:id", curriculumController.getOneCertificacion)

router.post("/idiomas", curriculumController.CreateCertificacion)

router.delete("/idiomas/:id", curriculumController.DeleteCertificacion)

router.put("/idiomas/:id", curriculumController.UpdateCerficiacion)


module.exports = router