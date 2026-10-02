const express = require("express");

const router = express.Router();

const {
  createTravelPlan,
  getTravelPlans,
  getTravelPlanById,
  updateTravelPlan,
  deleteTravelPlan
} = require("../controllers/travelController");


// Create a travel plan
router.post("/", createTravelPlan);


// Get all travel plans
router.get("/", getTravelPlans);


// Get one travel plan
router.get("/:id", getTravelPlanById);


// Update a travel plan
router.put("/:id", updateTravelPlan);


// Delete a travel plan
router.delete("/:id", deleteTravelPlan);


module.exports = router;