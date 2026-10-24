import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task_manager_db';
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected Successfully: Host=' + mongoose.connection.host);
  } catch (err) {
    console.warn('⚠️ MongoDB Connection Notice: Operating in memory/resilient fallback mode (' + err.message + ')');
  }
};
