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
            <img src="/Graphics/TrashBlue.svg" alt="Remove" />
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
  background: white;
  border-radius: 8px;
  margin-bottom: 1rem;
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
  display: grid;
  grid-template-columns: 1fr auto;
  max-width: 400px;
  gap: 0.5rem;
  padding: 0.8rem;
  background: rgba(173, 216, 230, 0.1); /* Light blue background */
  border: 1px solid #ddd;
  border-radius: 6px;
  align-items: center;
}

.order-info {
  font-size: 1rem;
  font-weight: bold;
}

.order-details {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.order-details p {
  margin: 0.5rem 0;
}

.remove-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem;
  transition: transform 0.2s ease;
}

.remove-button img {
  width: 1.2rem;
  height: 1.2rem;
}

.remove-button:hover {
  transform: scale(1.1);
}

p {
  margin-left: 1rem;
  margin-bottom: 1rem;
}

/* Responsive adjustments for screens 830px or smaller */
@media (max-width: 830px) {
  .section-header h2 {
    font-size: 1.2rem;
  }

  .order-item {
    grid-template-columns: 1fr;
    max-width: 100%;
  }

  .remove-button {
    align-self: flex-end;
    margin-top: 0.5rem;
  }

  .order-info,
  .order-details {
    font-size: 0.9rem;
  }

  .order-details p {
    margin: 0.3rem 0;
  }
}
</style>
