<template>
  <div class="section">
    <h2>Cart</h2>
    <div v-if="selectedUser.cart.length > 0">
      <div
        v-for="(item, index) in selectedUser.cart"
        :key="index"
        class="cart-item"
      >
        <div class="input-wrapper">
          <input
            type="text"
            :value="item.product"
            @input="onCartItemChange(index, 'product', $event.target.value)"
            placeholder="Product ID"
          />
          <label>Product ID</label>
        </div>
        <div class="input-wrapper">
          <input
            type="number"
            :value="item.quantity"
            @input="onCartItemChange(index, 'quantity', $event.target.value)"
            placeholder="Quantity"
            min="1"
          />
          <label>Quantity</label>
        </div>
        <button @click="removeCartItem(index)" class="delete-button">
          Remove
        </button>
      </div>
    </div>
    <button @click="addNewCartItem" class="add-button">Add New Item</button>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  selectedUser: Object,
});

const emit = defineEmits(["updateUser"]);

// Handle changes to cart items
function onCartItemChange(index, field, value) {
  const updatedCart = [...props.selectedUser.cart];
  updatedCart[index] = {
    ...updatedCart[index],
    [field]: field === "quantity" ? parseInt(value, 10) : value,
  };
  const updatedUser = {
    ...props.selectedUser,
    cart: updatedCart,
  };
  emit("updateUser", updatedUser);
}

// Add a new item to the cart
function addNewCartItem() {
  const newCartItem = {
    product: "",
    quantity: 1,
  };
  const updatedCart = [...props.selectedUser.cart, newCartItem];
  const updatedUser = {
    ...props.selectedUser,
    cart: updatedCart,
  };
  emit("updateUser", updatedUser);
}

// Remove an item from the cart
function removeCartItem(index) {
  const updatedCart = [...props.selectedUser.cart];
  updatedCart.splice(index, 1);
  const updatedUser = {
    ...props.selectedUser,
    cart: updatedCart,
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

.cart-item {
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

.input-wrapper input[type="text"],
.input-wrapper input[type="number"] {
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.input-wrapper input[type="text"]:focus,
.input-wrapper input[type="number"]:focus {
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
  