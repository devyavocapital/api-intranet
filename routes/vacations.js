const express = require("express");
const router = express.Router();
const VacationsController = require("../controllers/VacationsController.js");
const auth = require("../middleware/auth");

router.get("/", auth, VacationsController.getVacations);
router.post("/", auth, VacationsController.assignVacation);
router.put("/", auth, VacationsController.updateVacations);

router.get("/list", auth, VacationsController.getVacationsList);
router.put("/list", auth, VacationsController.requestVacationsUpdate);

router.get("/request", auth, VacationsController.toApproveVacations);
router.post("/request", auth, VacationsController.requestVacations);
router.put("/request", auth, VacationsController.approveVacations);

module.exports = router;
