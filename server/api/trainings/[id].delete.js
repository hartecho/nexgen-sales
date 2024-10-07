import Training from '~/server/models/Training.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
    await connectDB(); // Ensure DB connection
  try {
    // const { params } = readBody(event);
    const trainingId = event.context.params.id;

    const training = await Training.findByIdAndDelete(trainingId);
    if (!training) {
      throw createError({ statusCode: 404, message: 'Training not found' });
    }

    // Returning the deleted training could be informative; adjust based on your preference
    await disconnectDB();
    return { message: 'Training successfully deleted', training };
  } catch (error) {
    console.error('Error in DELETE /api/trainings/:id:', error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});
