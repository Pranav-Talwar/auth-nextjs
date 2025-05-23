import mongoose from 'mongoose';

const MONGO_URI: string = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error('❌ MONGO_URI not found in environment variables');
}

let isConnected = false;

export const connect = async (): Promise<void> => {
  if (isConnected) {
    console.log('📡 Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    const err = error as Error;
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
};
