import Course from '~/server/models/Course.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
  await connectDB(); // Ensure DB connection
  const body = getQuery(event);
  const _id = body._id;

  try {
      if (_id) {
          const course = await Course.findById(_id);
          await disconnectDB(); // Disconnect from DB for static file generation to close after build success
          return course;
      } else {
          const allCourses = await Course.find({});
          await disconnectDB();
          return allCourses;
      }
  } catch (error) {
      console.error(error);
      throw createError({ statusCode: 500, message: 'Server Error' });
  }
});

