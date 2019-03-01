'use strict'

const app = require("./app.js");
const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
	console.log("API REST HAP funcionando en http://localhost:" + PORT);
});
