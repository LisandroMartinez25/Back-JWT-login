'use strict'

const app = require("./app.js");
const PORT = process.env.PORT || 4500;
process.env.CAD_TOKEN = '8h';
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'secret'; 

app.listen(PORT, () => {
	console.log("API REST HAP funcionando en http://localhost:" + PORT);
});
