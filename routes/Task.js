const express = require("express");
const router = express.Router();

const userController = require("../controllers/taskController");

router.get("/", userController.getFilteredTasks);
router.post("/", userController.post);
router.put("/:id", userController.put);
router.delete("/:id", userController.delete);

module.exports = router;
