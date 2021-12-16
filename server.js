const mongoose = require("mongoose");
const app = require("./app");

const db = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);
const port = process.env.PORT || 5000;

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Database connected");
		app.listen(port, () => {
			console.log(`Server is running on port :${port}`);
		});
	})
	.catch((err) => console.error(err));
