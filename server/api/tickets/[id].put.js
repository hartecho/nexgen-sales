import Ticket from '~/server/models/Ticket';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
  await connectDB(); // Ensure DB connection
  try {
    const body = await readBody(event); // Extract the request body
    const ticketId = event.context.params.id; // Get the ticket ID from the URL parameters

    const { senderName, text, isUser } = body; // Assuming body contains `sender` and `text` fields for the new message

    if (!senderName || !text) {
      throw createError({ statusCode: 400, message: 'Sender name and text are required for a new message.' });
    }

    let updatedTicket;

    // Find the ticket and add the new message to the messages array
    if (isUser) {
      updatedTicket = await Ticket.findByIdAndUpdate(
        ticketId,
        {
          $push: { messages: { senderName: senderName, text: text, timestamp: new Date() } },
          adminUnread: true,
          updatedAt: new Date(), // Update the ticket's updated timestamp
        },
        {
          new: true, // Return the updated document
          runValidators: true, // Ensure validation rules are applied
        }
      );
    } else {
      updatedTicket = await Ticket.findByIdAndUpdate(
        ticketId,
        {
          $push: { messages: { senderName: senderName, text: text, timestamp: new Date() } },
          userUnread: true,
          updatedAt: new Date(), // Update the ticket's updated timestamp
        },
        {
          new: true, // Return the updated document
          runValidators: true, // Ensure validation rules are applied
        }
      );
    }

    if (!updatedTicket) {
      throw createError({ statusCode: 404, message: 'Ticket not found' });
    }

    await disconnectDB(); // Disconnect from DB
    return updatedTicket; // Return the updated ticket with the new message added
  } catch (error) {
    console.error('Error in PUT /api/tickets/:id:', error);
    await disconnectDB();
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});
