require("dotenv").config();
import { httpServer } from "./app";

const PORT = process.env.PORT || 3000;
import dbConfig from "./config/databaseConfig";

dbConfig(() => {
	httpServer.listen(3000, () => {
		console.log("HTTP Server started on PORT " + httpServer.address().port);
	});	
})


