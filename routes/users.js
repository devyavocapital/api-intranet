const express = require("express");
const router = express.Router();
const usersController = require("../controllers/UsersController.js");
const auth = require("../middleware/auth");

router.get("/", auth, usersController.getUser);
router.delete("/", auth, usersController.deleteUser);
router.post("/", auth, usersController.createUser);
router.put("/", auth, usersController.editUser);

router.get("/birthdays", auth, usersController.getBirthdays);
module.exports = router;
