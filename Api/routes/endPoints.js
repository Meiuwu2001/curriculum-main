const  express = require("express")
const ping = require("../controllers/pingController")
const login = require("../controllers/loginController")
const router = express.Router()


router.get('/ping', ping.getAllPing);

router.post('/login', login.login)

module.exports = router