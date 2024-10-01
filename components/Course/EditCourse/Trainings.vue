<template>
  <div class="section">
    <h2>Course Trainings</h2>

    <!-- Trainings List -->
    <div
      v-for="(trainingId, index) in selectedCourse.trainings"
      :key="index"
      class="input-wrapper"
    >
      <div class="input-group">
        <select
          v-model="selectedCourse.trainings[index]"
          @change="onTrainingIdChange(index)"
          class="dropdown-button"
        >
          <option disabled value="">Select Training</option>
          <option
            v-for="trainingOption in availableTrainings(index)"
            :key="trainingOption._id"
            :value="trainingOption._id"
          >
            {{ trainingOption.mainTitle }}
          </option>
        </select>
        <label>Training</label>
      </div>

      <button @click="removeTraining(index)" class="remove-button">
        Remove Training
      </button>
    </div>

    <button @click="addTraining" class="action-button">Add Training</button>
  </div>
</template>
  
  <script setup>
import { ref, computed } from "vue";

const props = defineProps({
  selectedCourse: Object, // Selected course that includes trainings (as a list of training IDs)
  trainings: Array, // List of all available trainings
});

const emit = defineEmits(["updateCourse"]);

// Compute available trainings for a specific dropdown, allowing the selected training in that dropdown to remain visible
function availableTrainings(index) {
  const selectedIds = props.selectedCourse.trainings
    .map((trainingId, i) => (i !== index ? trainingId : null))
    .filter((id) => id !== null);

  return props.trainings.filter(
    (training) =>
      !selectedIds.includes(training._id) ||
      training._id === props.selectedCourse.trainings[index]
  );
}

// Emit updated course data when a training is changed
function onTrainingIdChange(index) {
  emit("updateCourse", {
    ...props.selectedCourse,
    trainings: [...props.selectedCourse.trainings],
  });
}

// Add a new empty training to the course
function addTraining() {
  const updatedTrainings = [...props.selectedCourse.trainings, ""];
  emit("updateCourse", {
    ...props.selectedCourse,
    trainings: updatedTrainings,
  });
}

// Remove a training from the course
function removeTraining(index) {
  const updatedTrainings = [...props.selectedCourse.trainings];
  updatedTrainings.splice(index, 1);
  emit("updateCourse", {
    ...props.selectedCourse,
    trainings: updatedTrainings,
  });
}
</script>
  
<style scoped>
.section {
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 1rem;
}

.input-wrapper {
  margin-bottom: 1.5rem;
}

.input-group {
  position: relative;
  margin-bottom: 1rem;
}

.input-group input[type="text"],
.input-group input[type="number"],
.dropdown-button {
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
  margin-bottom: 0.5rem;
}

.input-group input[type="text"]:focus,
.input-group input[type="number"]:focus,
.dropdown-button:focus {
  border-color: #4caf50;
  outline: none;
}

.input-group label {
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

.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label,
.dropdown-button:focus + label,
.dropdown-button:not(:placeholder-shown) + label {
  top: -10px;
  left: 10px;
  font-size: 0.85rem;
  color: #4caf50;
}

.remove-button {
  background-color: #e74c3c;
  color: white;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  width: 100%;
}

.remove-button:hover {
  background-color: #c0392b;
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
</style>
  