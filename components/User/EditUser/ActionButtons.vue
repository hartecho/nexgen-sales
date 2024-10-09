<template>
  <div class="section action-buttons">
    <h2>Available Actions</h2>
    <button @click="addUser" class="action-button">Add User</button>
    <button @click="updateUser" class="action-button">Update User</button>
    <button @click="deleteUser" class="action-button">Delete User</button>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  user: Object,
});

const emit = defineEmits(["add-user", "update-user", "delete-user"]);

function addUser() {
  emit("add-user");
}

function updateUser() {
  emit("update-user");
}

function deleteUser() {
  emit("delete-user");
}
</script>
  
  <style scoped>
.action-buttons {
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
}

.action-button {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  background-color: white;
  cursor: pointer;
  display: inline-block;
  margin-bottom: 1rem;
  width: 100%;
  transition: background-color 0.3s, color 0.3s;
}

.action-button:hover {
  background-color: #ff8210;
  color: white;
}
</style>
  