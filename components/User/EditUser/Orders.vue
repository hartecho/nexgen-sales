<template>
  <div class="section">
    <h2>Orders</h2>
    <div v-if="selectedUser.orders.length > 0">
      <div
        v-for="(order, index) in selectedUser.orders"
        :key="index"
        class="order-item"
      >
        <span>Order ID: {{ order }}</span>
        <button @click="removeOrder(index)" class="remove-button">
          Remove
        </button>
      </div>
    </div>
    <p v-else>No orders available for this user.</p>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  selectedUser: Object,
});

const emit = defineEmits(["updateUser"]);

// Function to remove an order from the user's order list
function removeOrder(index) {
  const updatedOrders = [...props.selectedUser.orders];
  updatedOrders.splice(index, 1);
  const updatedUser = { ...props.selectedUser, orders: updatedOrders };
  emit("updateUser", updatedUser);
}
</script>
  
  <style scoped>
.section {
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 1rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.remove-button {
  padding: 5px 10px;
  font-size: 0.9rem;
  border: 1px solid #e74c3c;
  background-color: #e74c3c;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.remove-button:hover {
  background-color: #c0392b;
}
</style>
  