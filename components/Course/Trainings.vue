<template>
  <div class="trainings-list">
    <h3>Course Contents</h3>
    <div v-if="!loading">
      <div
        v-for="(training, index) in trainings"
        :key="training._id"
        :class="[
          'training-entry',
          { 'disabled-training': index > currentTrainingIndex },
        ]"
      >
        <NuxtLink
          v-if="index <= currentTrainingIndex"
          :to="`/training/${training._id}?courseId=${courseId}`"
          class="training-link"
        >
          <div class="training-thumbnail">
            <NuxtImg
              :src="resolvedImgPath(training.thumbnail)"
              :placeholder="generatePlaceholderUrl(training.thumbnail)"
              @load="onImageLoad(index)"
              :class="{ 'image-loaded': loadedImages[index] }"
              :alt="training.mainTitle"
              loading="lazy"
            />
          </div>
          <div class="training-content">
            <h4>{{ training.mainTitle }}</h4>
            <p>{{ truncateIntro(training.intro) }}</p>
          </div>
          <span v-if="isTrainingCompleted(index)" class="completed-checkmark">
            ✔
          </span>
          <div v-else class="arrow-indicator">➡️</div>
        </NuxtLink>
        <div v-else class="training-link">
          <div class="training-thumbnail">
            <NuxtImg
              :src="resolvedImgPath(training.thumbnail)"
              :placeholder="generatePlaceholderUrl(training.thumbnail)"
              @load="onImageLoad(index)"
              :class="{ 'image-loaded': loadedImages[index] }"
              :alt="training.mainTitle"
              loading="lazy"
            />
          </div>
          <div class="training-content">
            <h4>{{ training.mainTitle }}</h4>
            <p>{{ truncateIntro(training.intro) }}</p>
          </div>
          <span v-if="isTrainingCompleted(index)" class="completed-checkmark">
            ✔
          </span>
        </div>
      </div>
    </div>
    <div v-else class="spinner-wrapper">
      <div class="spinner"></div>
    </div>
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

const loadedImages = ref({});

const updateLoadedImages = ({ index, status }) => {
  loadedImages.value = { ...loadedImages.value, [index]: status };
};

// Function to check if the training is completed
const isTrainingCompleted = (index) => {
  return props.currentTrainingIndex > index;
};

const onImageLoad = (index) => {
  updateLoadedImages({ index, status: true });
};

// Function to resolve the image path
function resolvedImgPath(path) {
  return path ? `/TrainingPics/${path}` : "/defaultImage.webp";
}

const generatePlaceholderUrl = (url) => {
  if (!url || typeof url !== "string" || url.length === 0) {
    return "/defaultPlaceholderImageBlur.webp";
  }

  const lastDotIndex = url.lastIndexOf(".");
  if (lastDotIndex === -1 || lastDotIndex === 0) return url;

  const extension = url.slice(lastDotIndex);
  const baseUrl = url.slice(0, lastDotIndex);

  return resolvedImgPath(`${baseUrl}Blur${extension}`);
};

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
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
}

.disabled-training {
  color: #999; /* Lighter gray text */
  pointer-events: none; /* Disable pointer events to prevent clicks */
}

.disabled-training h4,
.disabled-training p {
  color: #bbb; /* Even lighter gray for titles and descriptions */
}

.training-link {
  display: flex;
  text-decoration: none;
  color: inherit;
  width: 100%;
  align-items: center;
}

.training-entry:hover:not(.disabled-training),
.training-entry:focus-within:not(.disabled-training) {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.training-thumbnail {
  min-width: 120px;
  max-width: 120px;
  margin-right: 1rem;
}

.training-thumbnail img {
  width: 100%;
  height: auto;
  transform: scale(1.2);
}

.training-thumbnail img.image-loaded {
  transform: scale(1);
}

.training-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.completed-checkmark {
  color: green;
  font-size: 1.5rem;
  margin-left: auto;
}

/* Spinner styling */
.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10rem;
}

.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .trainings-list {
    margin-top: 1rem;
    padding: 1rem;
  }

  .training-entry {
    flex-direction: column;
    align-items: stretch;
    padding: 0 0 1rem 0;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .training-thumbnail {
    margin-bottom: 1rem;
  }

  .training-link {
    flex-direction: column;
    align-items: flex-start;
  }

  .completed-checkmark {
    margin-left: 0;
    margin-top: 0.5rem;
    align-self: flex-start;
  }

  .training-entry:hover:not(.disabled-training) {
    transform: none;
    box-shadow: none;
  }

  h4 {
    margin-bottom: 1rem;
  }
}
</style>
