const express = require("express");
const router = express.Router();
const ProcedureController = require("../controllers/ProcedureController.js");
const auth = require("../middleware/auth");

router.get("/", auth, ProcedureController.getRelease);
router.post("/", auth, ProcedureController.createRelease);
router.put("/", auth, ProcedureController.editRelease);

module.exports = router;
