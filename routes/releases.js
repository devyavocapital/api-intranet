const express = require("express");
const router = express.Router();
const ReleasesController = require("../controllers/ReleasesController.js");
const auth = require("../middleware/auth");

router.get("/", auth, ReleasesController.getRelease);
router.post("/", auth, ReleasesController.createRelease);
router.put("/", auth, ReleasesController.editRelease);

// router.post("/test", auth, ReleasesController.uploadFile);

module.exports = router;
