const { getDB } = require("../config/db");

// Create a travel plan
const createTravelPlan = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("travelPlans");

    const newPlan = {
      ...req.body,
      id: Date.now()
    };

    await collection.insertOne(newPlan);

    res.status(201).json({
      message: "Travel plan created successfully",
      travelPlan: newPlan
    });

  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Failed to create travel plan"
    });
  }
};


// Get all travel plans
const getTravelPlans = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("travelPlans");

    const travelPlans = await collection
      .find({})
      .toArray();

    res.status(200).json(travelPlans);

  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Failed to fetch travel plans"
    });
  }
};


// Get one travel plan
const getTravelPlanById = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("travelPlans");

    const id = Number(req.params.id);

    const plan = await collection.findOne({
      id: id
    });

    if (!plan) {
      return res.status(404).json({
        message: "Travel plan not found"
      });
    }

    res.status(200).json(plan);

  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Failed to fetch travel plan"
    });
  }
};


// Update a travel plan
const updateTravelPlan = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("travelPlans");

    const id = Number(req.params.id);

    const result = await collection.updateOne(
      { id: id },
      {
        $set: {
          ...req.body,
          id: id
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Travel plan not found"
      });
    }

    const updatedPlan = await collection.findOne({
      id: id
    });

    res.status(200).json({
      message: "Travel plan updated successfully",
      travelPlan: updatedPlan
    });

  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Failed to update travel plan"
    });
  }
};


// Delete a travel plan
const deleteTravelPlan = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("travelPlans");

    const id = Number(req.params.id);

    const result = await collection.deleteOne({
      id: id
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Travel plan not found"
      });
    }

    res.status(200).json({
      message: "Travel plan deleted successfully"
    });

  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Failed to delete travel plan"
    });
  }
};


module.exports = {
  createTravelPlan,
  getTravelPlans,
  getTravelPlanById,
  updateTravelPlan,
  deleteTravelPlan
};