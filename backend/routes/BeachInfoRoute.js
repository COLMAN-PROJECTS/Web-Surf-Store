const express = require("express");
const BeachInfoController = require('../controllers/BeachInfoController');
const isAdmin = require('../middlewares/isAdminMiddleWare');
const router = express.Router();

router.get("/", BeachInfoController.getAllBeachInfo);
router.get("/:id", BeachInfoController.getBeachInfoById);
router.post("/create", isAdmin, BeachInfoController.createBeachInfo);
router.patch("/update", isAdmin, BeachInfoController.updateBeachInfo);
router.delete("/delete", isAdmin, BeachInfoController.deleteBeachInfo);

module.exports = router;
