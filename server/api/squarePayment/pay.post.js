import { randomUUID } from 'crypto';
import { Client } from 'square';

// Configure the Square client
const client = new Client({
  accessToken: process.env.SQUARE_SANDBOX_ACCESS_TOKEN,
  environment: 'sandbox',
});

const paymentsApi = client.paymentsApi;

// BigInt serialization for JSON responses
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export default defineEventHandler(async (event) => {
  // console.log("In the pay.post event handler");
  const { locationId, sourceId, cartItems, userLocation } = await readBody(event);
  let totalCost = 0;

  for (const item of cartItems) {
    const price = await getPrice(item._id);
    totalCost += price * item.quantity;
  }

  const salesTax = await $fetch(`/api/tax/salesTax`, {
    method: 'POST',
    body: {
      totalCost: totalCost,
      userLocation: userLocation,
    }
  });
  totalCost += salesTax;

  try {
    const result = await paymentsApi.createPayment({
      locationId,
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: totalCost * 100, // Convert to smallest currency unit
        currency: 'USD',
      },
    });

    return result;
  } catch (error) {
    console.error(error);
    return error;
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
