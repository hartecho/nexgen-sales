import Course from '~/server/models/Course.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
  await connectDB(); // Ensure DB connection

  try {
    // Sort courses by views in descending order and limit to 2
    const popularCourses = await Course.find({}).sort({ views: -1 }).limit(2);
    return popularCourses;
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  } finally {
    await disconnectDB(); // Ensure DB disconnection
  }
});
