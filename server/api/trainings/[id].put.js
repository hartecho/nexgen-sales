import Training from '~/server/models/Training.js'; 
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
    await connectDB(); // Ensure DB connection
    try {
        const body = await readBody(event);
        const trainingId = event.context.params.id;

        const training = await Training.findById(trainingId);
        if (!training) {
            throw createError({ statusCode: 404, message: 'Training not found' });
        }

        Object.assign(training, body);
        await training.save();
        await disconnectDB();
        return training;
    } catch (error) {
        console.error('Error in PUT /api/trainings/:id:', error);
        throw createError({ statusCode: 500, message: 'Server Error' });
    }
});
