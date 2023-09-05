const express = require("express");
const router = express.Router();
const ProcedureController = require("../controllers/ProcedureController.js");
const auth = require("../middleware/auth");

router.get("/", auth, ProcedureController.getProcedure);
router.post("/", auth, ProcedureController.createProcedure);
router.put("/", auth, ProcedureController.editProcedure);

module.exports = router;
