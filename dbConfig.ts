import * as mongoose from 'mongoose'

export const dbConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI,
      {
        useMongoClient: true,
      }
    );
    await mongoose.connection()
    console.log(`DB connected`);

  } catch (err) {
    console.error(err)
  }
}