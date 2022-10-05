const mongoose = require("mongoose");
const MONGODB_CONNECTION = process.env.MONGODB_URL;

const database = class MongooseAPI {
  connect = () => {
    try {
      mongoose.connect(MONGODB_CONNECTION, (err) => {
        if (err) {
          console.log("MongoDB Connection error:", err);
          throw err;
        }
        console.log(MONGODB_CONNECTION);
        console.log("MongoDB Connection successful");
      });
    } catch (error) {
      throw error;
    }
  };

  getSchema = () => {
    return mongoose.Schema;
  };

  getModel = (model, schema) => {
    return mongoose.model(model, schema);
  };
};

module.exports = database;
