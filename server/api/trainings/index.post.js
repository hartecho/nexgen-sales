import Training from '~/server/models/Graphics/Training.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
    await connectDB(); // Ensure DB connection
  try {
    const body = await readBody(event);
    const training = new Training(body);
    await training.save();
    await disconnectDB();
    return training;
  } catch (error) {
    console.error('Error in POST /api/trainings:', error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});
