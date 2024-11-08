<template>
  <div class="section">
    <div class="section-header" @click="toggleCollapse" @mousedown.prevent>
      <h2>Orders</h2>
      <span :class="['collapse-icon', isCollapsed ? 'collapsed' : 'expanded']">
        ▼
      </span>
    </div>

    <div
      ref="content"
      :style="{ maxHeight: isCollapsed ? '0px' : contentHeight }"
      class="content"
    >
      <div v-if="selectedUser.orders.length > 0" class="order-items">
        <div
          v-for="(order, index) in selectedUser.orders"
          :key="index"
          class="order-item"
        >
          <div class="order-info">
            <span><strong>Order ID:</strong> {{ order.id }}</span>
          </div>
          <div class="order-details">
            <p><strong>Product:</strong> {{ order.productName }}</p>
            <p><strong>Quantity:</strong> {{ order.quantity }}</p>
            <p><strong>Price:</strong> ${{ order.price }}</p>
          </div>
          <button @click="removeOrder(index)" class="remove-button">
            Remove
          </button>
        </div>
      </div>
      <p v-else>No orders available for this user.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

const props = defineProps({
  selectedUser: Object,
});

const emit = defineEmits(["updateUser"]);

const isCollapsed = ref(true);
const contentHeight = ref("0px");
const content = ref(null);

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
  adjustContentHeight();
}

function adjustContentHeight() {
  nextTick(() => {
    contentHeight.value = isCollapsed.value
      ? "0px"
      : `${content.value.scrollHeight}px`;
  });
}

onMounted(() => {
  adjustContentHeight();
});

function removeOrder(index) {
  const updatedOrders = [...props.selectedUser.orders];
  updatedOrders.splice(index, 1);
  const updatedUser = { ...props.selectedUser, orders: updatedOrders };
  emit("updateUser", updatedUser);
  adjustContentHeight();
}
</script>

<style scoped>
.section {
  background: rgba(173, 216, 230, 0.15);
  border-radius: 8px;
  margin-bottom: 2rem;
  width: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  user-select: none;
  outline: none;
}

.section-header h2,
.section-header .collapse-icon {
  user-select: none;
  outline: none;
}

.collapse-icon {
  font-size: 1.2rem;
  transition: transform 0.3s;
}

.collapsed {
  transform: rotate(-90deg);
}

h2 {
  font-size: 1.4rem;
  color: #333;
  font-weight: 500;
  margin: 0;
}

.content {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s ease;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.order-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  padding: 0.8rem;
  background: rgba(173, 216, 230, 0.1);
  border: 1px solid #ddd;
  border-radius: 6px;
}

.order-info {
  font-size: 1rem;
  font-weight: bold;
}

.order-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.order-details p {
  flex: 1 1 150px;
  max-width: 250px;
  margin: 0.5rem 0;
}

.remove-button {
  padding: 5px 10px;
  font-size: 0.9rem;
  border: none;
  background-color: #e74c3c;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #c0392b;
}

p {
  margin-left: 1rem;
  margin-bottom: 1rem;
}
</style>
