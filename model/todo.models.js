const MongooseAPI = require("../utils/database");
const mongooseDbApi = new MongooseAPI();
const schema = mongooseDbApi.getSchema();
const todoSchema = new schema(
  {
    userId: { type: String },
    task: { type: String },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);
const Todo = mongooseDbApi.getModel("todo", todoSchema);
module.exports = Todo;
