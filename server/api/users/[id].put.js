import User from '~/server/models/User.js';
import Item from '~/server/models/Item.js'; // Assuming products are called "Item"
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';
import mongoose from 'mongoose'; // Import mongoose to validate ObjectId

export default defineEventHandler(async (event) => {
  await connectDB();
  
  // Extract userId from request parameters
  const userId = event.context.params.id;
  
  // Validate the extracted userId
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    console.error('Error: Invalid or missing userId in the request');
    await disconnectDB();
    throw createError({ statusCode: 400, message: 'Bad Request: Invalid or missing userId' });
  }

  // Read the body of the request
  const body = await readBody(event);

  try {
    // Retrieve the current user by id
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      console.error(`Error: User with id ${userId} not found`);
      await disconnectDB();
      throw createError({ statusCode: 404, message: 'User not found' });
    }

    if (!existingUser.enrolledCourses) {
      existingUser.enrolledCourses = []; // Initialize if it doesn't exist
    }

    // Handle cart updates if provided
    if (Array.isArray(body.cart)) {
      const uniqueCart = [...new Set(body.cart.map(item => item.product))];
      const updatedCart = uniqueCart.map((productId, index) => ({
        product: productId,
        quantity: body.cart[index].quantity || 1,
      }));
      existingUser.cart = updatedCart;
    }

    // Handle wishlist updates if provided
    if (Array.isArray(body.wishlist)) {
      existingUser.wishlist = [...new Set(body.wishlist)];
    }

    // Handle recently viewed items updates if provided
    if (Array.isArray(body.recentlyViewedItems)) {
      existingUser.recentlyViewedItems = [...new Set(body.recentlyViewedItems)];
    }

    // Handle shipping addresses updates if provided
    if (Array.isArray(body.shippingAddresses)) {
      existingUser.shippingAddresses = body.shippingAddresses;
    }

    // Handle payment methods updates if provided
    if (Array.isArray(body.paymentMethods)) {
      existingUser.paymentMethods = body.paymentMethods;
    }

    // Handle enrolled courses updates if provided
    if (Array.isArray(body.enrolledCourses)) {
      const updatedEnrolledCourses = body.enrolledCourses.map((course) => ({
        course: course.course, // Use the existing course ID directly
        currentTrainingIndex: course.currentTrainingIndex || 0,
      }));
      existingUser.enrolledCourses = updatedEnrolledCourses;
    }

    // Increment the current training index for the specific course if courseId is provided
    if (body.courseId && body.currentTrainingIndex) {
      console.log("Current training index: " + body.currentTrainingIndex);
      const courseIndex = existingUser.enrolledCourses.findIndex(
        (course) => course.course.toString() === body.courseId
      );

      if (courseIndex > -1) {
        if (body.currentTrainingIndex > existingUser.enrolledCourses[courseIndex].currentTrainingIndex) {
          existingUser.enrolledCourses[courseIndex].currentTrainingIndex = body.currentTrainingIndex; // Increment index if we just took the latest training.

        }
      } else {
        console.error(`Error: Course with id ${body.courseId} not found in enrolledCourses`);
        await disconnectDB();
        throw createError({ statusCode: 404, message: 'Course not found in enrolledCourses' });
      }
    }

    // Update basic fields
    existingUser.name = body.name || existingUser.name;
    existingUser.email = body.email || existingUser.email;

    // Update password if provided
    if (body.password) {
      existingUser.password = body.password;
    }

    existingUser.profilePicture = body.profilePicture || existingUser.profilePicture;
    existingUser.bio = body.bio || existingUser.bio;

    // Save the updated user
    const updatedUser = await existingUser.save();

    if (!updatedUser) {
      console.error(`Error: User with id ${userId} not found after update`);
      await disconnectDB();
      throw createError({ statusCode: 404, message: 'User not found after update' });
    }

    // Mark recently viewed items as viewed
    if (updatedUser.recentlyViewedItems.length > 0) {
      await Promise.all(
        updatedUser.recentlyViewedItems.map(async (itemId) => {
          await Item.findByIdAndUpdate(itemId, { $inc: { viewCount: 1 } });
        })
      );
    }

    await disconnectDB();
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    await disconnectDB();
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});
