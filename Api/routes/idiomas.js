const  express = require("express")
const idiomaController = require("../controllers/idiomas")
const multer = require('multer');
const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "../public/certificates");
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

router.get("/idiomas", idiomaController.getAllCertificacion)

router.get("/idiomas/:id", idiomaController.getOneCertificacion)

router.post("/idiomas", upload.single('escaneo_certificado'), idiomaController.CreateCertificacion)

router.delete("/idiomas/:id", idiomaController.DeleteCertificacion)


module.exports = router