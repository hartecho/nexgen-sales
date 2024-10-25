import Course from '~/server/models/Course.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
    await connectDB(); // Ensure DB connection
    try {
        const body = await readBody(event);
        const courseId = event.context.params.id;

        const course = await Course.findByIdAndUpdate(courseId, body, {
            new: true, // Return the updated document
            runValidators: true, // Ensures that all validators are applied
        });

        if (!course) {
            throw createError({ statusCode: 404, message: 'Course not found' });
        }

        await disconnectDB();
        return course;
    } catch (error) {
        console.error('Error in PUT /api/courses/:id:', error);
        throw createError({ statusCode: 500, message: 'Server Error' });
    }
});
