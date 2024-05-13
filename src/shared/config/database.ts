import config from "./config";
import mongoose, { MongooseError } from "mongoose";
const connectionString = config.dbUri;

const InitializeMongoose = () =>
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("DB Connected Successfully");
    })
    .catch((err: MongooseError) => {
      console.log("Mongodb connection err", err);
      throw err;
    });

export default InitializeMongoose;
