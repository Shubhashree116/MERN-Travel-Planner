const mongodb = require("mongodb");

const url = "mongodb://127.0.0.1:27017";

const client = new mongodb.MongoClient(url);

let db;

const connectDB = async () => {
  try {
    await client.connect();

    console.log("MongoDB Connected Successfully");

    db = client.db("travel_planner");

  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

const getDB = () => {
  return db;
};

module.exports = {
  connectDB,
  getDB
};