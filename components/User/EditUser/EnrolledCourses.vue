<template>
  <div class="section">
    <h2>Enrolled Courses</h2>
    <div v-if="selectedUser.enrolledCourses.length > 0">
      <div
        v-for="(enrollment, index) in selectedUser.enrolledCourses"
        :key="index"
        class="enrollment-item"
      >
        <h2>name: {{ enrollment.name }}</h2>
        <div class="input-wrapper">
          <input
            type="text"
            :value="enrollment.name"
            @input="onEnrollmentChange(index, 'course', $event.target.value)"
            placeholder="Course ID"
          />
          <label>Course ID</label>
        </div>
        <div class="input-wrapper">
          <input
            type="number"
            :value="enrollment.currentTrainingIndex"
            @input="
              onEnrollmentChange(
                index,
                'currentTrainingIndex',
                $event.target.value
              )
            "
            placeholder="Current Training Index"
            min="0"
          />
          <label>Current Training Index</label>
        </div>

        <!-- Test Results Section -->
        <div
          v-if="enrollment.testResults && enrollment.testResults.length > 0"
          class="test-results"
        >
          <h3>Test Results</h3>
          <div
            v-for="(result, testIndex) in enrollment.testResults"
            :key="testIndex"
            class="test-result-item"
          >
            <p><strong>Question:</strong> {{ result.question }}</p>
            <p><strong>Answer:</strong> {{ result.answer }}</p>
          </div>
        </div>

        <button @click="removeEnrollment(index)" class="delete-button">
          Remove
        </button>
      </div>
    </div>

    <!-- Dropdown for Adding New Enrollment -->
    <div class="input-wrapper">
      <select v-model="newEnrollmentCourse" class="course-select">
        <option disabled value="">Select Course</option>
        <option
          v-for="course in filteredCourses"
          :key="course.id"
          :value="course"
        >
          {{ course.name }}
        </option>
      </select>
    </div>
    <button @click="addNewEnrollment" class="add-button">
      Add New Enrollment
    </button>
  </div>
</template>

<script setup>
import { useCourseStore } from "@/stores/courseStore";
import { ref, computed } from "vue";

const courseStore = useCourseStore();
const allCourses = computed(() => courseStore.allCourses);

const props = defineProps({
  selectedUser: Object,
});

const emit = defineEmits(["updateUser"]);

const newEnrollmentCourse = ref("");

// Filter out courses that have already been added
const filteredCourses = computed(() => {
  const enrolledCourseNames = props.selectedUser.enrolledCourses.map(
    (enrollment) => enrollment.name
  );
  return allCourses.value.filter(
    (course) => !enrolledCourseNames.includes(course.name)
  );
});

// Handle changes to enrolled courses
function onEnrollmentChange(index, field, value) {
  const updatedEnrollments = [...props.selectedUser.enrolledCourses];
  updatedEnrollments[index] = {
    ...updatedEnrollments[index],
    [field]: field === "currentTrainingIndex" ? parseInt(value, 10) : value,
  };
  const updatedUser = {
    ...props.selectedUser,
    enrolledCourses: updatedEnrollments,
  };
  emit("updateUser", updatedUser);
}

// Add a new enrollment
function addNewEnrollment() {
  if (newEnrollmentCourse.value) {
    const newEnrollment = {
      course: newEnrollmentCourse.value._id,
      name: newEnrollmentCourse.value.name, // Use the selected course name
      currentTrainingIndex: 0,
      testResults: [], // Initialize empty test results for new enrollments
    };
    const updatedEnrollments = [
      ...props.selectedUser.enrolledCourses,
      newEnrollment,
    ];
    const updatedUser = {
      ...props.selectedUser,
      enrolledCourses: updatedEnrollments,
    };
    emit("updateUser", updatedUser);

    // Reset selection
    newEnrollmentCourse.value = "";
  } else {
    alert("Please select a course to add.");
  }
}

// Remove an enrollment
function removeEnrollment(index) {
  const updatedEnrollments = [...props.selectedUser.enrolledCourses];
  updatedEnrollments.splice(index, 1);
  const updatedUser = {
    ...props.selectedUser,
    enrolledCourses: updatedEnrollments,
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

.enrollment-item {
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
  margin-bottom: 1rem;
}

.input-wrapper input[type="text"],
.input-wrapper input[type="number"],
.course-select {
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.course-select {
  color: #333;
}

.input-wrapper input[type="text"]:focus,
.input-wrapper input[type="number"]:focus,
.course-select:focus {
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

.test-results {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f1f1f1;
  border-radius: 8px;
}

.test-result-item {
  margin-bottom: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.test-result-item p {
  margin: 0.5rem 0;
}

.test-result-item strong {
  color: #333;
}
</style>
