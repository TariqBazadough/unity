const express = require("express");

const { addActivity, getAllActivities } = require("../controllers/activity");

const activitiesRouter = express.Router();

activitiesRouter.post("/:id", addActivity);
activitiesRouter.get("/", getAllActivities);

module.exports = activitiesRouter;