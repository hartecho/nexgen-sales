import Training from '~/server/models/Training.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
    await connectDB(); // Ensure DB connection
    try {
        const body = await readBody(event);
        const trainingId = event.context.params.id;

        const training = await Training.findByIdAndUpdate(trainingId, body, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation is run
        });

        if (!training) {
            throw createError({ statusCode: 404, message: 'Training not found' });
        }

        await disconnectDB();
        return training;
    } catch (error) {
        console.error('Error in PUT /api/trainings/:id:', error);
        throw createError({ statusCode: 500, message: 'Server Error' });
    }
});
