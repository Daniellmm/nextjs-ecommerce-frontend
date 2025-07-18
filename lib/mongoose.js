import mongoose from "mongoose";

const connection = {};

export async function mongooseConnect() {
  if (connection.isConnected) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDB connected successfully');
    
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}