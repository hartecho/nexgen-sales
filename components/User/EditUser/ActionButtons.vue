<template>
  <div class="action-buttons">
    <h2>Available Actions</h2>
    <button @click="addUser" class="action-button">Add New User</button>
    <button @click="updateUser" class="action-button">Apply Changes</button>
    <button @click="deleteUser" class="action-button">
      Delete Current User
    </button>
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
  width: 300px;
  background: #f4f5f7;
  border-right: 1px solid #ddd;
  text-align: center;
  padding: 1rem 10px;
  margin-top: 5rem;
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
  