<template>
  <div class="section">
    <h2>General Information</h2>

    <!-- Course Name -->
    <div class="input-wrapper">
      <input
        type="text"
        :value="selectedCourse.name"
        @input="onInputChange('name', $event.target.value)"
        placeholder=" "
      />
      <label>Course Name</label>
    </div>

    <!-- Course Description -->
    <div class="input-wrapper">
      <textarea
        :value="selectedCourse.description"
        @input="onInputChange('description', $event.target.value)"
        placeholder=" "
      ></textarea>
      <label>Course Description</label>
    </div>

    <!-- Course Image URL -->
    <div class="input-wrapper">
      <input
        type="text"
        :value="selectedCourse.image"
        @input="onInputChange('image', $event.target.value)"
        placeholder=" "
      />
      <label>Course Image URL</label>
    </div>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  selectedCourse: Object, // The selected course object passed down as a prop
});

const emit = defineEmits(["updateCourse"]);

// Function to handle input changes and emit the updated course object
function onInputChange(field, value) {
  const updatedCourse = { ...props.selectedCourse, [field]: value };
  emit("updateCourse", updatedCourse);
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
  