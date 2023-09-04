const express = require("express");
const router = express.Router();
const AreaController = require("../controllers/AreaController.js");
const auth = require("../middleware/auth");

router.get("/", auth, AreaController.getAreas);
router.post("/", auth, AreaController.createArea);
router.put("/", auth, AreaController.editArea);
router.delete("/", auth, AreaController.deleteArea);

module.exports = router;
