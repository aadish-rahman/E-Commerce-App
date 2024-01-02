import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Successfully Connected to DB");
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

export { connectDb };
