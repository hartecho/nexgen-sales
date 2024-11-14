<template>
  <div class="section">
    <div class="section-header" @click="toggleCollapse" @mousedown.prevent>
      <h2>Enrolled Courses</h2>
      <span :class="['collapse-icon', isCollapsed ? 'collapsed' : 'expanded']">
        ▼
      </span>
    </div>

    <div
      ref="content"
      :style="{ maxHeight: isCollapsed ? '0px' : contentHeight }"
      class="content"
    >
      <div
        v-if="selectedUser.enrolledCourses.length > 0"
        class="enrollment-items"
      >
        <div
          v-for="(enrollment, index) in selectedUser.enrolledCourses"
          :key="index"
          class="enrollment-item"
        >
          <div class="course-info">
            <!-- Course ID Input -->
            <div class="input-group">
              <label>Course Name</label>
              <input
                type="text"
                :value="enrollment.name"
                @input="
                  onEnrollmentChange(index, 'course', $event.target.value)
                "
                placeholder="Course Name"
                readonly
              />
            </div>

            <!-- Current Training Index Input -->

            <div class="input-group quantity-group">
              <label>Current Training Index</label>
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
                placeholder="Index"
                min="0"
              />
            </div>

            <!-- Delete Button -->
            <button @click="removeEnrollment(index)" class="delete-button">
              <img src="/Graphics/TrashBlue.svg" alt="Delete" />
            </button>
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
        </div>
      </div>

      <!-- Dropdown for Adding New Enrollment -->
      <div class="input-group">
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
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from "vue";
import { useCourseStore } from "@/stores/courseStore";

const courseStore = useCourseStore();
const allCourses = computed(() => courseStore.allCourses);

const props = defineProps({
  selectedUser: Object,
});

const emit = defineEmits(["updateUser"]);

const newEnrollmentCourse = ref("");
const isCollapsed = ref(true);
const contentHeight = ref("0px");
const content = ref(null);

const filteredCourses = computed(() => {
  const enrolledCourseNames = props.selectedUser.enrolledCourses.map(
    (enrollment) => enrollment.name
  );
  return allCourses.value.filter(
    (course) => !enrolledCourseNames.includes(course.name)
  );
});

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
  adjustContentHeight();
}

function adjustContentHeight() {
  nextTick(() => {
    contentHeight.value = isCollapsed.value
      ? "0px"
      : `${content.value.scrollHeight}px`;
  });
}

onMounted(() => {
  adjustContentHeight();
});

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
  adjustContentHeight(); // Adjust height after updating an item
}

function addNewEnrollment() {
  if (newEnrollmentCourse.value) {
    const newEnrollment = {
      course: newEnrollmentCourse.value._id,
      name: newEnrollmentCourse.value.name,
      currentTrainingIndex: 0,
      testResults: [],
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
    newEnrollmentCourse.value = "";
    adjustContentHeight(); // Adjust height after adding a new item
  } else {
    alert("Please select a course to add.");
  }
}

function removeEnrollment(index) {
  const updatedEnrollments = [...props.selectedUser.enrolledCourses];
  updatedEnrollments.splice(index, 1);
  const updatedUser = {
    ...props.selectedUser,
    enrolledCourses: updatedEnrollments,
  };
  emit("updateUser", updatedUser);
  adjustContentHeight(); // Adjust height after removing an item
}
</script>

<style scoped>
.section {
  background: white;
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  user-select: none;
  outline: none;
}

.section-header h2,
.section-header .collapse-icon {
  user-select: none;
  outline: none;
}

.collapse-icon {
  font-size: 1.2rem;
  transition: transform 0.3s;
}

.collapsed {
  transform: rotate(-90deg);
}

h2 {
  font-size: 1.4rem;
  color: #333;
  font-weight: 500;
  margin: 0;
}

h3 {
  width: 100%;
}

.content {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s ease;
}

.enrollment-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.enrollment-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  padding: 0.8rem;
  /* background: rgba(173, 216, 230, 0.1); */
  /* border: 1px solid #ddd; */
  border-radius: 6px;
  align-items: flex-start;
}

.course-info {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 0.8rem;
  color: #333;
  margin-bottom: 0.3rem;
}

.input-group input[type="text"],
.input-group input[type="number"],
.course-select {
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  color: #333;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
  transition: all 0.3s ease;
}

.input-group input:focus,
.course-select:focus {
  border-color: #4a90e2;
  outline: none;
  box-shadow: 0 0 8px rgba(74, 144, 226, 0.3);
}

.add-button {
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  border: none;
  background-color: #4a90e2;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
  margin: 1rem;
  border-radius: 6px;
}

.add-button:hover {
  background-color: #357abd;
}

.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem;
  transition: transform 0.2s ease;
}

.delete-button img {
  width: 1.2rem;
  height: 1.2rem;
}

.delete-button:hover {
  transform: scale(1.1);
}

.test-results {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
  gap: 0.5rem;
}

.test-result-item {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 1 300px; /* Allows items to wrap, with a minimum width */
  max-width: 400px; /* Restricts the maximum width */
  font-size: 0.9rem;
  color: #333;
  padding: 0.75rem;
  border-radius: 4px;
}

/* Alternate background colors for test-result items */
.test-result-item:nth-child(odd) {
  background-color: rgba(240, 240, 240, 1); /* Light gray */
}

.test-result-item:nth-child(even) {
  background-color: rgba(200, 200, 255, 0); /* Light blue tint */
}

.test-result-item p {
  margin: 0.5rem 0;
  width: 100%; /* Ensures text takes full width of the item */
}

select {
  margin: 1rem;
}

/* Responsive adjustments for screens 830px or smaller */
@media (max-width: 830px) {
  .section-header h2 {
    font-size: 1.2rem;
  }

  .enrollment-item {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0;
  }

  .course-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .input-group input[type="text"],
  .input-group input[type="number"],
  .course-select {
    font-size: 0.85rem;
    padding: 0.4rem 0.6rem;
  }

  .add-button {
    width: 100%;
    max-width: 200px;
  }

  .test-results {
    flex-direction: column;
    padding: 0.5rem;
  }

  .test-result-item {
    flex: 1 1 100%; /* Makes items take full width */
    max-width: 100%;
  }

  .delete-button {
    align-self: flex-end;
    margin-top: 0.5rem;
  }
}
</style>


