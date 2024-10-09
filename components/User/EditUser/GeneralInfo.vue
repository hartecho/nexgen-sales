<template>
  <div class="section">
    <h2>General Information</h2>

    <div class="input-wrapper">
      <input
        type="text"
        :value="selectedUser.name"
        @input="onInputChange('name', $event.target.value)"
        placeholder=" "
      />
      <label>User Name</label>
    </div>

    <div class="input-wrapper">
      <input
        type="text"
        :value="selectedUser.email"
        @input="onInputChange('email', $event.target.value)"
        placeholder=" "
      />
      <label>User Email</label>
    </div>

    <div class="input-wrapper">
      <input
        type="text"
        :value="selectedUser.profilePicture"
        @input="onInputChange('profilePicture', $event.target.value)"
        placeholder=" "
      />
      <label>Profile Picture URL</label>
    </div>

    <div class="input-wrapper">
      <textarea
        :value="selectedUser.bio"
        @input="onInputChange('bio', $event.target.value)"
        placeholder=" "
      ></textarea>
      <label>User Bio</label>
    </div>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  selectedUser: Object,
});

const emit = defineEmits(["updateUser"]);

function onInputChange(field, value) {
  const updatedUser = { ...props.selectedUser, [field]: value };
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
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.input-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

.input-wrapper input[type="text"],
.input-wrapper textarea {
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.input-wrapper input[type="text"]:focus,
.input-wrapper textarea:focus {
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
.input-wrapper textarea:not(:placeholder-shown) + label {
  top: -10px;
  left: 5px;
  font-size: 0.85rem;
  color: #4caf50;
}
</style>
  