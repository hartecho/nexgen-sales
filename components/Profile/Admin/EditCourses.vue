<template>
  <div class="wrapper">
    <h1>Add/Update Course</h1>

    <div class="content">
      <!-- Select Course -->
      <CourseEditCourseSelectCourse
        :courses="courses"
        @courseSelected="selectCourse"
      />

      <!-- General Information -->
      <CourseEditCourseGeneralInfo
        :selectedCourse="selectedCourse"
        @updateCourse="updateSelectedCourse($event)"
      />

      <!-- Add/Remove Trainings -->
      <CourseEditCourseTrainings
        :selectedCourse="selectedCourse"
        :trainings="trainings"
        @updateCourse="updateSelectedCourse($event)"
      />

      <!-- Action Buttons -->
      <CourseEditCourseActionButtons
        :course="selectedCourse"
        @add-course="addCourse"
        @update-course="updateCourse"
        @delete-course="deleteCourse"
      />
    </div>
    <!-- Add/Remove Test -->
    <CourseEditCourseTest
      :selectedCourse="selectedCourse"
      @updateCourse="updateSelectedCourse"
    />

    <!-- Notification Popup -->
    <SubcomponentsNotificationPopup
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
      @close-popup="notificationMessage = null"
    />
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";

// State management
const courses = ref([]);
const trainings = ref([]);
const selectedCourse = ref({
  name: "",
  description: "",
  trainings: [], // Array of training module IDs
  test: [], // Array of quiz objects
});

// Notification state
const notificationMessage = ref("");
const notificationType = ref("info");

// Fetch courses and trainings on mount
onMounted(async () => {
  await getCourses();
  await getTrainings();
});

// Load selected course
function selectCourse(courseId) {
  const foundCourse = courses.value.find((c) => c._id === courseId);
  if (foundCourse) {
    selectedCourse.value = { ...foundCourse };
  }
}

// Fetch courses
async function getCourses() {
  try {
    const response = await $fetch("/api/courses");
    courses.value = response || [];
  } catch (error) {
    showNotification("Error fetching courses: " + error.message, "error");
  }
}

// Fetch trainings
async function getTrainings() {
  try {
    const response = await $fetch("/api/trainings");
    trainings.value = response || [];
  } catch (error) {
    showNotification("Error fetching trainings: " + error.message, "error");
  }
}

// Add course
async function addCourse() {
  try {
    await $fetch("/api/courses", {
      method: "POST",
      body: selectedCourse.value,
    });
    showNotification("Course added successfully", "success");
    getCourses();
  } catch (error) {
    showNotification("Error adding course: " + error.message, "error");
  }
}

// Update course
async function updateCourse() {
  try {
    if (selectedCourse.value._id) {
      await $fetch(`/api/courses/${selectedCourse.value._id}`, {
        method: "PUT",
        body: selectedCourse.value,
      });
      showNotification("Course updated successfully", "success");
      getCourses();
    }
  } catch (error) {
    showNotification("Error updating course: " + error.message, "error");
  }
}

// Delete course
async function deleteCourse() {
  if (!selectedCourse.value) {
    showNotification("Please select a course to delete", "error");
    return;
  }

  try {
    await $fetch(`/api/courses/${selectedCourse.value._id}`, {
      method: "DELETE",
    });
    showNotification("Course deleted successfully", "success");
    getCourses();
  } catch (error) {
    showNotification("Error deleting course: " + error.message, "error");
  }
}

// Show notification
function showNotification(message, type = "info") {
  notificationMessage.value = message;
  notificationType.value = type;
  setTimeout(() => {
    notificationMessage.value = null;
  }, 5000);
}

// Update selected course
function updateSelectedCourse(updatedCourse) {
  selectedCourse.value = updatedCourse;
}
</script>
  
  <style scoped>
.wrapper {
  padding: 2rem;
  width: 100%;
  margin: 0;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
  background-color: #f5f5f5;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: 700;
}

h2 {
  margin-bottom: 1rem;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
}

.section {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.section h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.action-buttons {
  text-align: center;
}
</style>
  