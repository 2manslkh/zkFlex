
import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config()
let MONGODB_URI;
const DB_DOMAIN = process.env.DB_DOMAIN;
const DB_NAME_DEV = process.env.DB_NAME_DEV;
const DB_NAME_PROD = process.env.DB_NAME_PROD;

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

export const connectDB = () => {
  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true
  };
  if (process.env.NODE_ENV === "test") {
    console.log("LOCAL DB...");
    MONGODB_URI = `mongodb://localhost:27017/${DB_NAME_PROD}`;
  } else if (process.env.NODE_ENV == "dev") {
    console.log(`DEV DB...(${DB_NAME_DEV})`);
    MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_DOMAIN}/${DB_NAME_DEV}`;
  } else if (process.env.NODE_ENV == "prod") {
    console.log(`PROD DB...(${DB_NAME_PROD})`);
    MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_DOMAIN}/${DB_NAME_PROD}`;
  } else {
    console.log("ENV NOT SET!");
    process.exit(1);
  }

  try {
    mongoose.connect(MONGODB_URI, options);
    console.log("Connected!");
  } catch (error) {
    console.log(`Failed to Connect!`);
    process.exit(1);
  }
};
