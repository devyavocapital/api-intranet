const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const path = require("path");

const multer = require("multer");
const msgError = require("./utils/msgError");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/login", require("./routes/login"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/vacations", require("./routes/vacations"));
app.use("/api/v1/categories", require("./routes/categories"));
app.use("/api/v1/areas", require("./routes/areas"));
app.use("/api/v1/releases", require("./routes/releases"));
app.use("/api/v1/procedures", require("./routes/procedures"));

// get images
const dir = path.join(__dirname, "images");
app.use(express.static(dir));

app.get("/:img", function (req, res) {
	res.sendFile(`/${img}`);
});

//routes uploadFile
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images/");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

app.post(
	"/api/v1/releases/uploads",
	upload.single("file"),
	function (req, res) {
		res.json(msgError("releaseOk"));
	},
);

app.listen(PORT, () => {
	console.log("El servidor esta usando el puerto: ", PORT);
});
