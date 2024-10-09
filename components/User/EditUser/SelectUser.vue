<template>
  <div class="section">
    <h2>Select User</h2>
    <select
      v-model="selectedUserId"
      @change="onUserSelected"
      class="dropdown-button"
    >
      <option disabled value="">Please select one</option>
      <option v-for="user in sortedUsers" :key="user._id" :value="user._id">
        {{ user.name }} ({{ user.email }})
      </option>
    </select>
  </div>
</template>
  
  <script setup>
import { ref, computed } from "vue";

const props = defineProps({
  users: Array, // Array of available users
});

const emit = defineEmits(["userSelected"]);

const selectedUserId = ref("");

// Sort the users alphabetically by name
const sortedUsers = computed(() => {
  return [...props.users].sort((a, b) => a.name.localeCompare(b.name));
});

// Emit the selected user ID to the parent component when a user is selected
function onUserSelected() {
  emit("userSelected", selectedUserId.value);
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

.dropdown-button {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  background-color: white;
  cursor: pointer;
  width: 100%;
  text-align: left;
  margin-bottom: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

.dropdown-button:hover {
  background-color: #ff8210;
  color: white;
}
</style>
  