import User from '~/server/models/User.js';
import Transaction from '~/server/models/Transaction.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
  await connectDB(); // Ensure DB connection

  try {
    // Fetch users and populate related fields
    const randomTransaction = await Transaction.findOne({}); // To ensure User model is registered
    const users = await User.find()
      .populate('orders') // Populating orders with Transaction model references
      .populate({
        path: 'cart.product',
        model: 'Item', // Populating cart items with the Item model
      })
      .populate('wishlist', 'name price image') // Populating wishlist items (only fetching certain fields)
      .populate('recentlyViewedItems', 'name price image'); // Populating recently viewed items

    await disconnectDB(); // Disconnect from DB after fetching data
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    await disconnectDB();
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});
