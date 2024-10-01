<template>
  <div class="section">
    <h2>Select Course</h2>
    <select
      v-model="selectedCourseId"
      @change="onCourseSelected"
      class="dropdown-button"
    >
      <option disabled value="">Please select one</option>
      <option
        v-for="course in sortedCourses"
        :key="course._id"
        :value="course._id"
      >
        {{ course.name }}
      </option>
    </select>
  </div>
</template>
  
  <script setup>
import { ref, computed } from "vue";

const props = defineProps({
  courses: Array, // Array of available courses
});

const emit = defineEmits(["courseSelected"]);

const selectedCourseId = ref(""); // Ensure no course is selected by default

// Sort the courses alphabetically by name
const sortedCourses = computed(() => {
  return [...props.courses].sort((a, b) => a.name.localeCompare(b.name));
});

// Emit the selected course ID to the parent component when a course is selected
function onCourseSelected() {
  emit("courseSelected", selectedCourseId.value);
}
</script>
  
  <style scoped>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

.dropdown-button:hover {
  background-color: #ff8210;
  color: white;
}
</style>
  