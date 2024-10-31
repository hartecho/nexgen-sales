<template>
  <div class="support-page">
    <h1>Support Page</h1>
    <h3>If you’re experiencing issues, please create a ticket below.</h3>

    <!-- Button to open ticket creation modal -->
    <button @click="openTicketModal">Create New Ticket</button>

    <!-- Ticket creation modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Create a Support Ticket</h2>
        <label for="title">Title:</label>
        <input
          type="text"
          v-model="newTicket.title"
          placeholder="Enter title"
        />

        <label for="description">Description:</label>
        <textarea
          v-model="newTicket.description"
          placeholder="Describe your issue"
        ></textarea>

        <button @click="submitTicket">Submit Ticket</button>
        <button @click="closeTicketModal">Cancel</button>
      </div>
    </div>

    <!-- User's tickets list -->
    <div v-if="tickets.length" class="ticket-list">
      <h2>Your Tickets</h2>
      <ul>
        <li
          v-for="ticket in tickets"
          :key="ticket._id"
          @click="openTicket(ticket)"
        >
          <strong>{{ ticket.title }}</strong> - {{ ticket.status }}
        </li>
      </ul>
    </div>

    <!-- Ticket conversation view -->
    <div v-if="selectedTicket" class="ticket-conversation">
      <h2>Conversation for Ticket: {{ selectedTicket.title }}</h2>
      <ul>
        <li v-for="message in selectedTicket.messages" :key="message._id">
          <strong>{{ message.senderName }}:</strong> {{ message.text }}
        </li>
      </ul>
      <textarea
        v-model="newMessage"
        placeholder="Type your message here"
      ></textarea>
      <button @click="sendMessage">Send</button>
      <button @click="closeConversation">Close</button>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore();

const showModal = ref(false);
const newTicket = ref({ title: "", description: "" });
const tickets = ref([]); // Ensure tickets is initialized as an array
const selectedTicket = ref(null);
const newMessage = ref("");

const openTicketModal = () => {
  showModal.value = true;
};

const closeTicketModal = () => {
  showModal.value = false;
  newTicket.value = { title: "", description: "" };
};

const submitTicket = async () => {
  try {
    const ticketData = {
      userId: userStore.user._id,
      userName: userStore.user.name,
      title: newTicket.value.title,
      description: newTicket.value.description,
    };

    const data = await $fetch("/api/tickets", {
      method: "POST",
      body: ticketData,
    });

    if (data && Array.isArray(tickets.value)) {
      tickets.value.push(data); // Add the new ticket to the list
      closeTicketModal();
    } else {
      console.error("tickets.value is not an array:", tickets.value);
    }
  } catch (error) {
    console.error("Error creating ticket:", error);
  }
};

const openTicket = (ticket) => {
  selectedTicket.value = ticket;
};

const closeConversation = () => {
  selectedTicket.value = null;
};

const sendMessage = async () => {
  if (newMessage.value.trim()) {
    try {
      const response = await $fetch(
        `/api/tickets/${selectedTicket.value._id}`,
        {
          method: "PUT",
          body: {
            text: newMessage.value,
            senderName: userStore.user.name,
            isUser: true,
          },
        }
      );
      selectedTicket.value = response;
      newMessage.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
};

const fetchTickets = async () => {
  try {
    const response = await $fetch(`/api/tickets/${userStore.user._id}`);
    tickets.value = response || [];
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
};

onMounted(() => {
  fetchTickets(); // Fetch tickets when component mounts
});
</script>

<style>
/* Basic styles */
.support-page {
  padding: 20px;
}
button {
  margin: 5px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}
.ticket-list ul {
  list-style: none;
  padding: 0;
}
.ticket-list li {
  padding: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
  margin: 5px 0;
}
.ticket-conversation {
  margin-top: 20px;
}
</style>
