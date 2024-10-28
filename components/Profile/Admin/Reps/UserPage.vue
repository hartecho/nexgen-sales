<template>
  <div v-if="user" class="user-evaluation">
    <!-- Header Section -->
    <div class="header">
      <h2>User Evaluation</h2>
      <button @click="backToList()" class="back-btn">Back To List</button>
    </div>

    <!-- Profile Section -->
    <div class="profile-section">
      <div class="profile-image-container">
        <img
          :src="user.profilePicture || '/default-profile.png'"
          alt="Profile Picture"
          class="profile-picture"
        />
      </div>
      <div class="user-info">
        <h3>User Information</h3>
        <div class="info-grid">
          <div class="info-item">
            <strong>Name:</strong> <span>{{ user.name }}</span>
          </div>
          <div class="info-item">
            <strong>Email:</strong> <span>{{ user.email }}</span>
          </div>
          <div class="info-item">
            <strong>Preferred Name:</strong>
            <span>{{ user.preferredName || "N/A" }}</span>
          </div>
          <div class="info-item">
            <strong>Date of Birth:</strong>
            <span v-if="user.dateOfBirth"
              >{{ formatDate(user.dateOfBirth) }} (Age:
              {{ calculateAge(user.dateOfBirth) }})</span
            >
            <span v-else>N/A</span>
          </div>
          <div class="info-item">
            <strong>Date of Recruiting Call:</strong>
            <span>{{ formatDate(user.created_at) || "N/A" }}</span>
          </div>
        </div>
        <div class="info-section">
          <h4>Contact Details</h4>
          <div class="info-grid contact-details">
            <div class="info-item">
              <strong>Phone:</strong>
              <span>{{ user.contact?.phone || "N/A" }}</span>
            </div>
            <div class="info-item">
              <strong>Address:</strong>
              <span>{{ user.contact?.street || "N/A" }}</span>
            </div>
            <div class="info-item">
              <strong>City:</strong>
              <span>{{ user.contact?.city || "N/A" }}</span>
            </div>
            <div class="info-item">
              <strong>State:</strong>
              <span>{{ user.contact?.state || "N/A" }}</span>
            </div>
            <div class="info-item">
              <strong>ZIP:</strong>
              <span>{{ user.contact?.zip || "N/A" }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Test Results Section -->
    <div class="section test-results-section">
      <h3>Test Results</h3>
      <div v-if="user.enrolledCourses && user.enrolledCourses.length">
        <div
          v-for="(course, index) in user.enrolledCourses"
          :key="index"
          class="course-section"
        >
          <h4>Course: {{ course.name }}</h4>
          <h4 v-if="course.completionDate">
            Completion Time:
            {{
              calculateCompletionDays(user.created_at, course.completionDate)
            }}
            days
          </h4>

          <div v-if="course.testResults.length">
            <div
              v-for="(result, i) in course.testResults"
              :key="i"
              class="test-result-item"
            >
              <div class="question-answer-pair">
                <div class="question-number">{{ i + 1 }}.</div>
                <div class="test-question-answer">
                  <p><strong>Question:</strong> {{ result.question }}</p>
                  <p>{{ result.answer }}</p>
                </div>
              </div>
            </div>
          </div>
          <p v-else>No test results available for this course.</p>
        </div>
      </div>
      <p v-else>No courses enrolled.</p>
    </div>

    <!-- Admin Evaluation Section -->
    <div class="section admin-evaluation">
      <h3>Admin Evaluation</h3>
      <div class="evaluation-form">
        <label for="grade">Grade</label>
        <select
          id="grade"
          :value="user.grade"
          @change="onInputChange('grade', $event.target.value)"
          class="input-select"
        >
          <option v-for="grade in grades" :key="grade" :value="grade">
            {{ grade }}
          </option>
        </select>

        <label for="adminDescription">Admin Notes</label>
        <textarea
          id="adminDescription"
          :value="user.adminDescription"
          @input="onInputChange('adminDescription', $event.target.value)"
          placeholder="Enter description"
          class="input-textarea"
        ></textarea>

        <button @click="saveEvaluation" class="save-btn">
          Save Evaluation
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["back-to-list", "updateUser", "dbUpdate"]);

// Admin evaluation fields
const grades = [
  "Highly Promising",
  "Promising",
  "Average",
  "Needs Improvement",
  "Not Suitable",
  "Ungraded",
];

function calculateCompletionDays(createdAt, completionDate) {
  const startDate = new Date(createdAt);
  const endDate = new Date(completionDate);
  const differenceInTime = endDate - startDate;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
  return differenceInDays;
}

// Helper function to format date
const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Helper function to calculate age
const calculateAge = (dob) => {
  const diff = Date.now() - new Date(dob).getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age;
};

const backToList = () => {
  emit("back-to-list");
};

const saveEvaluation = () => {
  emit("dbUpdate");
};

function onInputChange(field, value) {
  const updatedUser = { ...props.user, [field]: value };
  emit("updateUser", updatedUser);
}
</script>

<style scoped>
.user-evaluation {
  width: 100%;
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #e9e9e9;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.back-btn {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #0056b3;
}

.profile-section {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid #e0e0e0;
}

.profile-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 150px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ddd;
}

.user-info {
  flex: 1;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-section {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-item {
  margin-bottom: 1rem;
}

.info-item strong {
  margin-right: 0.5rem; /* Add spacing after colon */
}

.contact-details .info-item {
  margin-bottom: 0.5rem;
}

.section {
  margin-top: 2rem;
}

.test-results-section {
}

.course-section {
  margin-bottom: 2rem;
}

.test-result-item {
  margin-bottom: 1.5rem;
}

.question-answer-pair {
  display: flex;
  align-items: flex-start;
}

.question-number {
  font-weight: bold;
  margin-right: 1rem;
  font-size: 1.1rem;
  color: #007bff;
}

.test-question-answer {
  flex: 1;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  border-left: 3px solid black;
}

.admin-evaluation .evaluation-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-select,
.input-textarea {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
}

.input-textarea {
  height: 120px;
}

.save-btn {
  align-self: flex-start;
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #218838;
}

h2,
h3,
h4 {
  margin-bottom: 1rem;
}

p,
li {
  margin: 0.5rem 0;
}

p strong {
  font-weight: bold;
}
</style>
