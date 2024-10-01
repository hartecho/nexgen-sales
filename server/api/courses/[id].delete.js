import Course from '~/server/models/Course.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
    await connectDB(); // Ensure DB connection
  try {
    // const { params } = readBody(event);
    const courseId = event.context.params.id;

    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      throw createError({ statusCode: 404, message: 'Course not found' });
    }

    // Returning the deleted course could be informative; adjust based on your preference
    await disconnectDB();
    return { message: 'Course successfully deleted', course };
  } catch (error) {
    console.error('Error in DELETE /api/courses/:id:', error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});
