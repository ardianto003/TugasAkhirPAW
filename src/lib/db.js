import mongoose from "mongoose";

const connection = {};

async function connect() {
  try {
    if (connection.isConnected) {
      return;
    }

    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;
      if (connection.isConnected === 1) {
        return;
      }
      await mongoose.disconnect();
    }

    const db = await mongoose.connect(process.env.MONGO_URL);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Optionally, you can throw the error or handle it as needed
  }
}

const db = { connect };

export default db;
