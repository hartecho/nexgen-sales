<template>
  <div class="wrapper">
    <div class="hero">
      <h2>Add/Update Course</h2>
    </div>

    <div class="course-management-wrapper">
      <!-- Sidebar for managing courses -->
      <div class="left">
        <CourseEditCourseSelectCourse
          :courses="courses"
          @courseSelected="selectCourse"
        />
        <!-- Action Buttons -->
        <CourseEditCourseActionButtons
          :course="selectedCourse"
          @add-course="addCourse"
          @update-course="updateCourse"
          @delete-course="showDeleteCourseModal"
        />
      </div>

      <!-- Main content for course details and actions -->
      <div class="course-details" v-if="selectedCourse">
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

        <!-- Add/Remove Test -->
        <CourseEditCourseTest
          :selectedCourse="selectedCourse"
          @updateCourse="updateSelectedCourse"
        />
      </div>

      <!-- Unsaved Changes Popup -->
      <div v-if="hasUnsavedChanges" class="unsaved-changes-popup">
        <img src="/Graphics/Alert.webp" alt="Alert Icon" class="popup-icon" />
        <div class="popup-content">
          <p class="popup-message">You have unsaved changes.</p>
          <button class="popup-save-button" @click="updateCourse">
            Save Changes
          </button>
        </div>
      </div>

      <CourseEditCourseAddCourseModal
        :visible="showAddModal"
        @close="closeAddModal"
        @add-course="addCourse"
      />

      <CourseEditCourseDeleteCourseModal
        :visible="showDeleteModal"
        @close="closeDeleteModal"
        @delete-course="deleteCourse"
      />

      <!-- Notification Popup -->
      <SubcomponentsNotificationPopup
        v-if="notificationMessage"
        :message="notificationMessage"
        :type="notificationType"
        @close-popup="notificationMessage = null"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const courses = ref([]);
const trainings = ref([]);
const selectedCourse = ref({
  name: "",
  description: "",
  trainings: [],
  test: [],
});
const hasUnsavedChanges = ref(false);
const notificationMessage = ref("");
const notificationType = ref("info");
const showAddModal = ref(false);
const showDeleteModal = ref(false);

onMounted(async () => {
  await getCourses();
  await getTrainings();
});

function selectCourse(courseId) {
  const foundCourse = courses.value.find((c) => c._id === courseId);
  if (foundCourse) {
    selectedCourse.value = { ...foundCourse };
    hasUnsavedChanges.value = false;
  }
}

async function getCourses() {
  try {
    const response = await $fetch("/api/courses");
    courses.value = response || [];
  } catch (error) {
    showNotification("Error fetching courses: " + error.message, "error");
  }
}

async function getTrainings() {
  try {
    const response = await $fetch("/api/trainings");
    trainings.value = response || [];
  } catch (error) {
    showNotification("Error fetching trainings: " + error.message, "error");
  }
}

async function addCourse(newCourseData) {
  try {
    await $fetch("/api/courses", {
      method: "POST",
      body: newCourseData || selectedCourse.value,
    });
    showNotification("Course added successfully", "success");
    getCourses();
  } catch (error) {
    showNotification("Error adding course: " + error.message, "error");
  }
}

async function updateCourse() {
  try {
    if (selectedCourse.value._id) {
      await $fetch(`/api/courses/${selectedCourse.value._id}`, {
        method: "PUT",
        body: selectedCourse.value,
      });
      showNotification("Course updated successfully", "success");
      getCourses();
      hasUnsavedChanges.value = false;
    }
  } catch (error) {
    showNotification("Error updating course: " + error.message, "error");
  }
}

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
    hasUnsavedChanges.value = false;
  } catch (error) {
    showNotification("Error deleting course: " + error.message, "error");
  }
}

function showNotification(message, type = "info") {
  notificationMessage.value = message;
  notificationType.value = type;
  setTimeout(() => {
    notificationMessage.value = null;
  }, 5000);
}

function updateSelectedCourse(updatedCourse) {
  selectedCourse.value = updatedCourse;
  hasUnsavedChanges.value = true;
}

function closeAddModal() {
  showAddModal.value = false;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
}
</script>

<style scoped>
.wrapper {
  max-width: 100vw;
}

.course-management-wrapper {
  display: flex;
  min-height: 100vh;
  max-width: 100%;
  font-family: "Roboto", sans-serif;
  background-color: #f5f5f5;
}

.left {
  max-width: 100%;
}

.hero {
  width: 100%;
  text-align: left;
  border-bottom: 1px solid #ddd;
  background-color: #f7f7f7;
  padding: 0.75rem 10px;
  color: white;
  background: black;
}

.hero h2 {
  margin: 0;
  color: white;
  font-size: 18px;
}

.unsaved-changes-popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
  gap: 1rem;
  z-index: 1000;
  max-width: 320px;
}

.popup-icon {
  width: 32px;
  height: 32px;
}

.popup-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.popup-message {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}

.popup-save-button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.popup-save-button:hover {
  background-color: #0056b3;
}

.course-details {
  width: 100%;
  padding: 2rem;
  max-width: 100%;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: 700;
}

@media (max-width: 1160px) {
  .course-management-wrapper {
    flex-direction: column;
  }

  .left {
    width: 100%;
  }

  .course-details {
    padding: 1rem;
    max-width: 100%;
  }

  .unsaved-changes-popup {
    bottom: 10px;
    right: 10px;
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  .course-management-wrapper {
    padding: 0.5rem;
  }

  .course-details {
    padding: 0.5rem;
    max-width: 100%;
    width: 100%;
  }

  .unsaved-changes-popup {
    flex-direction: column;
    align-items: center;
    bottom: 10px;
    right: 10px;
    max-width: 100%;
    padding: 1rem;
  }

  .popup-content {
    align-items: center;
    text-align: center;
  }

  .popup-icon {
    width: 24px;
    height: 24px;
  }

  .popup-message {
    font-size: 0.9rem;
  }

  .popup-save-button {
    width: 100%;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .course-details {
    padding: 0.5rem;
    width: 100%;
    max-width: 100%;
  }

  .popup-message {
    font-size: 0.8rem;
  }

  .popup-save-button {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }
}
</style>
