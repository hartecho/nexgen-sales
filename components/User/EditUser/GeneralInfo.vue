<template>
  <div class="section">
    <h2>General Information</h2>

    <!-- User Name -->
    <div class="input-wrapper">
      <input
        type="text"
        :value="selectedUser.name"
        @input="onInputChange('name', $event.target.value)"
        placeholder=" "
      />
      <label>User Name</label>
    </div>

    <!-- User Email -->
    <div class="input-wrapper">
      <input
        type="text"
        :value="selectedUser.email"
        @input="onInputChange('email', $event.target.value)"
        placeholder=" "
      />
      <label>User Email</label>
    </div>

    <!-- Profile Picture URL -->
    <div class="input-wrapper">
      <input
        type="text"
        :value="selectedUser.profilePicture"
        @input="onInputChange('profilePicture', $event.target.value)"
        placeholder=" "
      />
      <label>Profile Picture URL</label>
    </div>

    <!-- User Bio -->
    <div class="input-wrapper">
      <textarea
        :value="selectedUser.bio"
        @input="onInputChange('bio', $event.target.value)"
        placeholder=" "
      ></textarea>
      <label>User Bio</label>
    </div>

    <!-- User Role Dropdown -->
    <div class="input-wrapper">
      <select
        :value="selectedUser.role"
        @change="onInputChange('role', $event.target.value)"
        class="dropdown-button"
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <label>User Role</label>
    </div>

    <!-- Change Password -->
    <div class="input-wrapper">
      <input type="password" v-model="newPassword" placeholder=" " />
      <label>New Password</label>
    </div>

    <div class="input-wrapper">
      <input type="password" v-model="confirmPassword" placeholder=" " />
      <label>Confirm New Password</label>
    </div>

    <button @click="updatePassword" class="password-button">
      Update Password
    </button>
    <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
    <p v-if="passwordSuccess" class="success-message">{{ passwordSuccess }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  selectedUser: Object,
});

const emit = defineEmits(["updateUser"]);

const newPassword = ref("");
const confirmPassword = ref("");
const passwordError = ref("");
const passwordSuccess = ref("");

// Function to handle input changes and emit the updated user object
function onInputChange(field, value) {
  const updatedUser = { ...props.selectedUser, [field]: value };
  emit("updateUser", updatedUser);
}

// Function to update the password
function updatePassword() {
  if (
    newPassword.value === confirmPassword.value &&
    newPassword.value.length >= 6
  ) {
    const updatedUser = { ...props.selectedUser, password: newPassword.value };
    emit("updateUser", updatedUser);
    passwordSuccess.value = "Password updated successfully!";
    passwordError.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
  } else if (newPassword.value !== confirmPassword.value) {
    passwordError.value = "Passwords do not match.";
    passwordSuccess.value = "";
  } else {
    passwordError.value = "Password must be at least 6 characters long.";
    passwordSuccess.value = "";
  }
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
  font-size: 1.5rem;
  color: #333;
}

.input-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

.input-wrapper input[type="text"],
.input-wrapper input[type="password"],
.input-wrapper textarea,
.input-wrapper select {
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.input-wrapper input[type="text"]:focus,
.input-wrapper input[type="password"]:focus,
.input-wrapper textarea:focus,
.input-wrapper select:focus {
  border-color: #4caf50;
  outline: none;
}

.input-wrapper label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  background: #fff;
  padding: 0 5px;
  color: #999;
  pointer-events: none;
}

.input-wrapper input:focus + label,
.input-wrapper input:not(:placeholder-shown) + label,
.input-wrapper textarea:focus + label,
.input-wrapper textarea:not(:placeholder-shown) + label,
.input-wrapper select:focus + label,
.input-wrapper select:not([value=""]) + label {
  top: -10px;
  left: 5px;
  font-size: 0.85rem;
  color: #4caf50;
}

.dropdown-button {
  appearance: none;
  background-color: white;
  cursor: pointer;
}

.dropdown-button:hover {
  border-color: #4caf50;
}

.password-button {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #4caf50;
  background-color: #4caf50;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.password-button:hover {
  background-color: #388e3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.success-message {
  color: #4caf50;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>
