const MongooseAPI = require("../utils/database");
const mongooseDbApi = new MongooseAPI();
const schema = mongooseDbApi.getSchema();
const userSchema = new schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);
const User = mongooseDbApi.getModel("user", userSchema);
module.exports = User;
