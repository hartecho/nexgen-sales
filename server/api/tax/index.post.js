import Transaction from '~/server/models/Transaction.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';
import { v4 as uuidv4 } from 'uuid';

export default defineEventHandler(async (event) => {
    await connectDB(); // Ensure DB connection
    try {
      const body = await readBody(event);
      let totalCost = 0;

      for (const item of body.itemizedList) {
        const price = await getPrice(item._id);
        totalCost += price * item.quantity;
    }

      const salesTax = await $fetch(`/api/tax/salesTax`, {
        method: 'POST',
        body: {
          totalCost: totalCost,
          userLocation: body.buyersShippingAddress,
        }
      });
      totalCost += salesTax;

        body.totalCost = totalCost;                         // 1
        body.invoiceNumber = `INV-${uuidv4()}`;             // 2
        body.salesTax = salesTax;                           // 3
        body.salesTaxRate = salesTax/(totalCost - salesTax) // 4
        body.sellersBusinessInformation.taxIDNum = process.env.TAX_ID_NUM; // 5
        const transaction = new Transaction(body);
        await transaction.save();
        await disconnectDB();
        return transaction;
    } catch (error) {
        console.error('Error in POST /api/transactions/post.js:', error);
        throw createError({ statusCode: 500, message: 'Server Error' });
    }
});

async function getPrice(itemId) {
    try {
      const response = await $fetch(`/api/items?_id=${itemId}`)
      return response.price;
    } catch (error) {
      console.error(`An error occurred while fetching the item: ${error.message}`);
      throw error;
    }
  }
