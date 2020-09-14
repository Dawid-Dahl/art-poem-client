import "dotenv/config";
import path from "path";
import express from "express";
import errorhandler from "errorhandler";
import morgan from "morgan";
import cors from "cors";

export const app = express();

const PORT = process.env.PORT || 1234;

app.use(morgan("dev"));
app.use(cors());

if (process.env.NODE_ENV === "production") {
	app.use(express.static("dist"));

	app.get("/*", (req, res) => {
		res.sendFile(path.join(__dirname, "dist", "index.html"));
	});
}

app.use(errorhandler());

app.listen(PORT, () => console.log(`Server now listening at port: ${PORT}`));
