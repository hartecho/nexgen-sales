import Training from '~/server/models/Training.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
  await connectDB(); // Ensure DB connection
  const body = getQuery(event);
  const _id = body._id;

  try {
      if (_id) {
          const training = await Training.findById(_id);
          await disconnectDB(); // Disconnect from DB for static file generation to close after build success
          return training;
      } else {
          const allTrainings = await Training.find({});
          await disconnectDB();
          return allTrainings;
      }
  } catch (error) {
      console.error(error);
      throw createError({ statusCode: 500, message: 'Server Error' });
  }
});

