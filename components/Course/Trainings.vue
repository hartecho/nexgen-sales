<template>
  <div class="trainings-list">
    <h3>Course Contents</h3>
    <div v-if="!loading">
      <div
        v-for="(training, index) in trainings"
        :key="training._id"
        class="training-entry"
      >
        <NuxtLink
          :to="`/training/${training._id}?courseId=${courseId}`"
          class="training-link"
        >
          <div class="training-thumbnail">
            <NuxtImg
              :src="resolvedImgPath(training.thumbnail)"
              :alt="training.mainTitle"
              loading="lazy"
            />
          </div>
          <div class="training-content">
            <h4>{{ training.mainTitle }}</h4>
            <!-- Truncated intro with ellipsis -->
            <p>{{ truncateIntro(training.intro) }}</p>
            <span v-if="isTrainingCompleted(index)" class="completed-checkmark">
              ✔
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div v-else class="spinner"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  trainings: {
    type: Array,
    required: true,
  },
  currentTrainingIndex: {
    type: Number,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});

// Function to check if the training is completed
const isTrainingCompleted = (index) => {
  return props.currentTrainingIndex > index;
};

// Function to resolve the image path
function resolvedImgPath(path) {
  return path ? `/Graphics/TrainingPics/${path}` : "/defaultImage.webp";
}

// Function to truncate the intro text with ellipsis
const truncateIntro = (text, maxLength = 80) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
</script>

<style scoped>
.trainings-list {
  margin-top: 1.5rem;
  background: white;
  padding: 2rem;
  min-height: 25rem;
}

h3 {
  margin-bottom: 1rem;
}

.training-entry {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  background-color: #fff;
  padding: 1rem;
  /* border-radius: 8px; */
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.training-link {
  display: flex;
  text-decoration: none;
  color: inherit;
  width: 100%;
}

.training-entry:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.training-thumbnail {
  min-width: 120px;
  max-width: 120px;
  margin-right: 1rem;
}

.training-thumbnail img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.training-content {
  display: flex;
  flex-direction: column;
}

.completed-checkmark {
  color: green;
  font-size: 1.5rem;
  margin-left: 1rem;
}

.training-link:hover .training-content h4 {
  text-decoration: underline;
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
</style>
