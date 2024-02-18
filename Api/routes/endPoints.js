const  express = require("express")
const ping = require("../controllers/pingController")
const loginController = require("../controllers/loginController")

const router = express.Router()


router.get('/ping', ping.getAllPing);

router.post('/login', loginController.login)

module.exports = router