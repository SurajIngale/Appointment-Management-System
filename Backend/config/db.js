import mongoose from "mongoose";

const connectDb = async () => {
  try {
    let connection = await mongoose.connect(
      "mongodb+srv://svingale2001:le8NPyDaE70h1KCi@cluster0.edgjkpx.mongodb.net/Appointment_Management?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDb connected");
  } catch (error) {
    console.log("Error while connectiong", error);
  }
};

export default connectDb;
