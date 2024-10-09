<template>
  <div class="section">
    <h2>Shipping Addresses</h2>
    <div
      v-for="(address, index) in selectedUser.shippingAddresses"
      :key="index"
      class="address-wrapper"
    >
      <div class="input-wrapper">
        <input
          type="text"
          :value="address.street"
          @input="onAddressChange(index, 'street', $event.target.value)"
          placeholder="Street"
        />
        <label>Street</label>
      </div>
      <div class="input-wrapper">
        <input
          type="text"
          :value="address.city"
          @input="onAddressChange(index, 'city', $event.target.value)"
          placeholder="City"
        />
        <label>City</label>
      </div>
      <div class="input-wrapper">
        <input
          type="text"
          :value="address.state"
          @input="onAddressChange(index, 'state', $event.target.value)"
          placeholder="State"
        />
        <label>State</label>
      </div>
      <div class="input-wrapper">
        <input
          type="text"
          :value="address.zip"
          @input="onAddressChange(index, 'zip', $event.target.value)"
          placeholder="Zip"
        />
        <label>Zip</label>
      </div>
      <div class="input-wrapper">
        <input
          type="text"
          :value="address.country"
          @input="onAddressChange(index, 'country', $event.target.value)"
          placeholder="Country"
        />
        <label>Country</label>
      </div>
      <div class="checkbox-wrapper">
        <input
          type="checkbox"
          :checked="address.isPrimary"
          @change="onAddressChange(index, 'isPrimary', $event.target.checked)"
        />
        <label>Primary</label>
      </div>
      <button @click="deleteAddress(index)" class="delete-button">
        Delete
      </button>
    </div>
    <button @click="addNewAddress" class="add-button">Add New Address</button>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  selectedUser: Object,
});

const emit = defineEmits(["updateUser"]);

function onAddressChange(index, field, value) {
  const updatedAddresses = [...props.selectedUser.shippingAddresses];
  updatedAddresses[index] = {
    ...updatedAddresses[index],
    [field]: value,
  };
  const updatedUser = {
    ...props.selectedUser,
    shippingAddresses: updatedAddresses,
  };
  emit("updateUser", updatedUser);
}

function addNewAddress() {
  const newAddress = {
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    isPrimary: false,
  };
  const updatedAddresses = [
    ...props.selectedUser.shippingAddresses,
    newAddress,
  ];
  const updatedUser = {
    ...props.selectedUser,
    shippingAddresses: updatedAddresses,
  };
  emit("updateUser", updatedUser);
}

function deleteAddress(index) {
  const updatedAddresses = [...props.selectedUser.shippingAddresses];
  updatedAddresses.splice(index, 1);
  const updatedUser = {
    ...props.selectedUser,
    shippingAddresses: updatedAddresses,
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

.address-wrapper {
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

.checkbox-wrapper {
  display: flex;
  align-items: center;
}

.checkbox-wrapper input[type="checkbox"] {
  margin-right: 0.5rem;
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
  