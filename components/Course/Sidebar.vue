<template>
  <div class="course-sidebar">
    <!-- Display the image at the top if provided -->
    <div v-if="!loading">
      <div class="sidebar-image">
        <img
          v-if="image"
          :src="`/TrainingPics/${image}`"
          alt="Training Image"
        />
        <img v-else :src="`/Backgrounds/introBG2.webp`" alt="Training Image" />
      </div>

      <div class="progress-section">
        <h3>
          {{ completedTrainings }} of {{ totalTrainings }} Lessons Completed
        </h3>
        <div class="progress-bar">
          <div
            class="progress-bar__fill"
            :style="{ width: `${completionPercentage}%` }"
          ></div>
        </div>
      </div>

      <div class="instructor-section" v-if="instructor">
        <h3>Instructor</h3>
        <div class="instructor-info">
          <img :src="instructor.image" alt="Instructor Image" />
          <h4>{{ instructor.name }}</h4>
          <p>{{ instructor.bio }}</p>
        </div>
      </div>
    </div>
    <div v-else class="sidebar-spinner">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  completedTrainings: {
    type: Number,
    required: true,
  },
  totalTrainings: {
    type: Number,
    required: true,
  },
  completionPercentage: {
    type: Number,
    required: true,
  },
  instructor: {
    type: Object,
    required: false,
  },
  image: {
    type: String,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.course-sidebar {
  width: 100%;
  background: white;
}

.sidebar-image {
  min-height: 7.5rem;
  width: 100%;
}

.sidebar-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.progress-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
}

h3 {
  margin-bottom: 1rem;
}

.progress-bar {
  background-color: #f0f0f0;
  border-radius: 5px;
  height: 10px;
  width: 100%;
  position: relative;
}

.progress-bar__fill {
  background-color: #007bff;
  height: 100%;
  border-radius: 5px;
}

.instructor-section {
  background-color: #fff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.instructor-info {
  text-align: center;
}

.instructor-info img {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
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
  width: 24px;
  height: 24px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: black;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Adjust the image height for smaller screens */
@media (max-width: 480px) {
  .progress-section {
    padding: 1rem;
  }
}
</style>
