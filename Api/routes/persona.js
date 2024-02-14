const personaController = require("../controllers/persona");
const express = require("express");
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "../public/images");
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post("/persona", upload.single('imagen'), personaController.CreatePersona);
router.get("/persona", personaController.getAllPersona);
router.get("/persona/:id", personaController.getOnePersona);
router.delete("/persona/:id", personaController.DeletePersona);
router.put("/persona/:id", personaController.UpdatePersona);


module.exports = router;
