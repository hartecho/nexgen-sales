import Course from '~/server/models/Course.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
    await connectDB(); // Ensure DB connection
  try {
    const body = await readBody(event);
    const course = new Course(body);
    await course.save();
    await disconnectDB();
    return course;
  } catch (error) {
    console.error('Error in POST /api/courses:', error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});
