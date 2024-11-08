<template>
  <div class="section">
    <h2>Payment Methods</h2>
    <div
      v-for="(payment, index) in selectedUser.paymentMethods"
      :key="index"
      class="payment-item"
    >
      <div class="payment-info">
        <div class="input-group">
          <label>Card Type</label>
          <input
            type="text"
            :value="payment.cardType"
            @input="onPaymentChange(index, 'cardType', $event.target.value)"
            placeholder="Card Type"
          />
        </div>
        <div class="input-group">
          <label>Last 4 Digits</label>
          <input
            type="text"
            :value="payment.last4Digits"
            @input="onPaymentChange(index, 'last4Digits', $event.target.value)"
            placeholder="Last 4 Digits"
          />
        </div>
        <div class="input-group">
          <label>Expiration Date</label>
          <input
            type="text"
            :value="payment.expirationDate"
            @input="
              onPaymentChange(index, 'expirationDate', $event.target.value)
            "
            placeholder="Expiration Date"
          />
        </div>
        <div class="input-group">
          <label>Cardholder Name</label>
          <input
            type="text"
            :value="payment.cardholderName"
            @input="
              onPaymentChange(index, 'cardholderName', $event.target.value)
            "
            placeholder="Cardholder Name"
          />
        </div>
        <button @click="deletePaymentMethod(index)" class="delete-button">
          Delete
        </button>
      </div>
    </div>
    <button @click="addNewPaymentMethod" class="add-button">
      Add New Payment Method
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedUser: Object,
});

const emit = defineEmits(["updateUser"]);

function onPaymentChange(index, field, value) {
  const updatedPayments = [...props.selectedUser.paymentMethods];
  updatedPayments[index] = {
    ...updatedPayments[index],
    [field]: value,
  };
  const updatedUser = {
    ...props.selectedUser,
    paymentMethods: updatedPayments,
  };
  emit("updateUser", updatedUser);
}

function addNewPaymentMethod() {
  const newPayment = {
    cardType: "",
    last4Digits: "",
    expirationDate: "",
    cardholderName: "",
  };
  const updatedPayments = [...props.selectedUser.paymentMethods, newPayment];
  const updatedUser = {
    ...props.selectedUser,
    paymentMethods: updatedPayments,
  };
  emit("updateUser", updatedUser);
}

function deletePaymentMethod(index) {
  const updatedPayments = [...props.selectedUser.paymentMethods];
  updatedPayments.splice(index, 1);
  const updatedUser = {
    ...props.selectedUser,
    paymentMethods: updatedPayments,
  };
  emit("updateUser", updatedUser);
}
</script>

<style scoped>
.section {
  background: rgba(173, 216, 230, 0.15); /* Light transparent blue */
  border-radius: 8px;
  margin-bottom: 2rem;
  width: 100%;
  padding: 1.5rem;
}

h2 {
  font-size: 1.4rem;
  color: #333;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.payment-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(173, 216, 230, 0.1); /* Light blue background */
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.payment-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.input-group {
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 0.8rem;
  color: #333;
  margin-bottom: 0.3rem;
}

.input-group input[type="text"] {
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  color: #333;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.3s ease;
  width: 100%;
}

.input-group input:focus {
  border-color: #4a90e2;
  outline: none;
  box-shadow: 0 0 8px rgba(74, 144, 226, 0.3);
}

.add-button,
.delete-button {
  padding: 10px 20px;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.add-button {
  background-color: #4a90e2;
  color: white;
  margin-top: 1rem;
}

.add-button:hover {
  background-color: #357abd;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  padding: 0.6rem 1.2rem;
}

.delete-button:hover {
  background-color: #c0392b;
}

/* Alternate background colors for payment-item */
.payment-item:nth-child(odd) {
  background-color: rgba(240, 240, 240, 1); /* Light gray */
}

.payment-item:nth-child(even) {
  background-color: rgba(200, 200, 255, 0.1); /* Light blue tint */
}
</style>
