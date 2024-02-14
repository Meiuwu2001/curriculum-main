const app = require("./app.js")

const port = 5000;

app.get('/',(req, res) =>{
	res.send('Hola mundo');
});

app.listen(port, () => {
	console.log("Server on port", port);
})