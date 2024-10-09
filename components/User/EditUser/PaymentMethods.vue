<template>
  <div class="section">
    <h2>Payment Methods</h2>
    <div
      v-for="(payment, index) in selectedUser.paymentMethods"
      :key="index"
      class="payment-wrapper"
    >
      <div class="input-wrapper">
        <input
          type="text"
          :value="payment.cardType"
          @input="onPaymentChange(index, 'cardType', $event.target.value)"
          placeholder="Card Type"
        />
        <label>Card Type</label>
      </div>
      <div class="input-wrapper">
        <input
          type="text"
          :value="payment.last4Digits"
          @input="onPaymentChange(index, 'last4Digits', $event.target.value)"
          placeholder="Last 4 Digits"
        />
        <label>Last 4 Digits</label>
      </div>
      <div class="input-wrapper">
        <input
          type="text"
          :value="payment.expirationDate"
          @input="onPaymentChange(index, 'expirationDate', $event.target.value)"
          placeholder="Expiration Date"
        />
        <label>Expiration Date</label>
      </div>
      <div class="input-wrapper">
        <input
          type="text"
          :value="payment.cardholderName"
          @input="onPaymentChange(index, 'cardholderName', $event.target.value)"
          placeholder="Cardholder Name"
        />
        <label>Cardholder Name</label>
      </div>
      <button @click="deletePaymentMethod(index)" class="delete-button">
        Delete
      </button>
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
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.payment-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input[type="text"] {
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.input-wrapper input[type="text"]:focus {
  border-color: #4caf50;
  outline: none;
}

.input-wrapper label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  background: #f9f9f9;
  padding: 0 5px;
  color: #999;
  pointer-events: none;
}

.input-wrapper input:focus + label,
.input-wrapper input:not(:placeholder-shown) + label {
  top: -10px;
  left: 5px;
  font-size: 0.85rem;
  color: #4caf50;
}

.add-button,
.delete-button {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  background-color: #ff8210;
  color: white;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s, color 0.3s;
}

.add-button:hover,
.delete-button:hover {
  background-color: #e66b00;
}

.delete-button {
  background-color: #e74c3c;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>
  