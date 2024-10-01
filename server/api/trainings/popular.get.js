import Training from '~/server/models/Training.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
  await connectDB(); // Ensure DB connection

  try {
    // Sort trainings by views in descending order and limit to 2
    const popularTrainings = await Training.find({}).sort({ views: -1 }).limit(2);
    return popularTrainings;
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  } finally {
    await disconnectDB(); // Ensure DB disconnection
  }
});
