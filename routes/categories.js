const express = require("express");
const router = express.Router();
const CategoriesController = require("../controllers/CategoriesController.js");
const auth = require("../middleware/auth");

router.get("/", auth, CategoriesController.getCategories);
router.post("/", auth, CategoriesController.createCategory);
router.put("/", auth, CategoriesController.editCategory);
router.delete("/", auth, CategoriesController.deleteCategory);

module.exports = router;
