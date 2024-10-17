<template>
  <div class="course-sidebar">
    <!-- Display the graphic at the top -->
    <div v-if="!loading">
      <div class="sidebar-graphic">
        <!-- Placeholder graphic for the test instead of an image -->
        <img src="/graphics/Test.webp" alt="" />
        <div class="test-graphic">
          <span v-if="!completed" class="incomplete-message">
            Complete all trainings to take the test.
          </span>
          <span v-else-if="testResults !== null" class="test-score">
            Your test has been submitted!
          </span>
          <span v-else class="no-test-message">
            You haven't taken the test yet
          </span>
        </div>
      </div>

      <!-- Button to take the course test -->
      <div class="test-section">
        <button
          class="take-test-button"
          :disabled="!completed"
          @click="takeTest"
        >
          Take the Course Test
        </button>
      </div>
    </div>

    <!-- Spinner if loading -->
    <div v-else class="sidebar-spinner">
      <div class="spinner"></div>
    </div>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  completed: {
    type: Boolean,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  testResults: {
    type: Object, // Accept testScore as a number prop
    default: null, // Default to null if no score is available
  },
});

const emit = defineEmits(["takeTest"]);

// Method to handle taking the test
function takeTest() {
  emit("takeTest");
}
</script>
  
  <style scoped>
.course-sidebar {
  width: 100%;
  background-color: #ffffff;
  padding: 1.5rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

img {
  height: 5em;
  width: 5rem;
  margin-bottom: 1.5rem;
}

.sidebar-graphic {
  min-height: 7.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.test-graphic {
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #4f4f4f;
  /* background-color: #f9f9f9; */
  /* padding: 1.5rem; */
  /* border: 1px solid #e0e0e0; */
}

.incomplete-message {
  font-size: 1.1rem;
  color: #e74c3c;
  font-weight: 500;
}

.test-score {
  font-size: 1.5rem;
  color: #2ecc71;
  font-weight: 700;
}

.no-test-message {
  font-size: 1.1rem;
  color: #999;
}

.test-section {
  margin-top: 2rem;
  text-align: center;
}

.take-test-button {
  background-color: #007bff;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
}

.take-test-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  box-shadow: none;
}

.take-test-button:hover:not(:disabled) {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.sidebar-spinner {
  min-height: 15rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Spinner styling */
.spinner {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #007bff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Media query for smaller screens */
@media (max-width: 480px) {
  .test-graphic {
    padding: 1rem;
    font-size: 1rem;
  }

  .take-test-button {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>
  