<template>
  <div class="section action-buttons">
    <h2>Available Actions</h2>
    <button @click="addCourse" class="action-button">Add Course</button>
    <button @click="updateCourse" class="action-button">Update Course</button>
    <button @click="deleteCourse" class="action-button">Delete Course</button>
  </div>
</template>
    
  <script setup>
const props = defineProps({
  course: Object,
});

const emit = defineEmits(["add-course", "update-course", "delete-course"]);

function addCourse() {
  emit("add-course");
}

function updateCourse() {
  emit("update-course");
}

function deleteCourse() {
  emit("delete-course");
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
  text-align: center;
  display: inline-block;
  margin-bottom: 1rem;
  width: 100%;
  transition: background-color 0.3s, color 0.3s;
}

.action-button:hover {
  background-color: #ff8210;
  color: white;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
  