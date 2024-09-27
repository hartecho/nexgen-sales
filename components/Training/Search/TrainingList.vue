<template>
  <section class="training-list">
    <!-- Dynamic Header -->
    <h2 class="training-list__header">
      {{ selectedTag ? selectedTag : "All" }} Posts
    </h2>

    <div
      v-for="(training, index) in paginatedTrainings"
      :key="training._id"
      class="training-entry"
    >
      <div
        class="training-entry__thumbnail"
        @click="goToTraining(training._id)"
      >
        <NuxtImg
          :src="resolvedImgPath(training.thumbnail)"
          :alt="
            training.mainTitle
              ? training.mainTitle + ' picture'
              : 'Training post image'
          "
          :placeholder="generatePlaceholderUrl(training.thumbnail)"
          loading="lazy"
          :class="{ 'image-loaded': loadedImages[index] }"
          @load="onImageLoad(index)"
        />
      </div>
      <div class="training-entry__content">
        <h2 class="training-entry__title">
          {{ training.mainTitle || "Untitled Training" }}
        </h2>
        <!-- Tags listed here -->
        <div class="training-tags" v-if="training.tags && training.tags.length">
          <span
            v-for="(tag, index) in training.tags"
            :key="index"
            class="training-tag"
            >{{ tag }}</span
          >
        </div>
        <p class="training-entry__excerpt">{{ training.preview }}</p>
        <div class="training-meta">
          <span>{{ formatDate(training.date) }}</span>
          <span
            v-if="
              training.structuredData && training.structuredData.readingTime
            "
          >
            · {{ training.structuredData.readingTime }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  paginatedTrainings: {
    type: Array,
    required: true,
  },
  loadedImages: {
    type: Object,
    required: true,
  },
  selectedTag: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["view-training", "update:loadedImages"]);

const goToTraining = (trainingId) => {
  emit("view-training", trainingId);
};

function resolvedImgPath(path) {
  return path ? `/TrainingPics/${path}` : "/HARTECHOLogo.webp";
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

// Function to handle image load event
const onImageLoad = (index) => {
  emit("update:loadedImages", { index, status: true });
};

// Function to format date
const formatDate = (dateString) => {
  if (!dateString) return "No date available";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.training-list__header {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.training-entry {
  display: flex;
  border-radius: 0px;
  margin-bottom: 20px;
  max-width: 100%;
  min-height: 15rem;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
}

.training-entry:nth-child(odd) {
  background-color: #f0f0f0; /* light grey background for odd elements */
}

.training-entry:nth-child(even) {
  background-color: #ffffff; /* white background for even elements */
}

.training-entry:hover {
  transform: scale(1.005);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
}

.training-entry__thumbnail {
  height: 15rem;
  min-width: 20rem;
  overflow: hidden;
  cursor: pointer;
}

.training-entry__thumbnail img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transform: scale(1.2);
  transition: transform 0.5s ease-in-out;
}

.training-entry__thumbnail img.image-loaded {
  transform: scale(1);
}

.training-meta {
  font-size: 0.85rem;
  color: #777;
}

.training-entry__content {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.training-entry__title {
  font-size: 1.5rem;
  color: #333;
}

.training-tags {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.training-tag {
  background-color: #444;
  padding: 0.3rem 0.6rem;
  margin-right: 0.3rem;
  margin-bottom: 0.1rem;
  font-size: 0.8rem;
  color: #333;
  border-radius: 10px;
  color: white;
  font-weight: bold;
}

.training-entry__excerpt {
  color: #666;
}

.training-entry__link {
  color: #005ba0;
  text-decoration: none;
  font-weight: bold;
}

.training-entry__link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .training-entry {
    flex-direction: column; /* Stack image on top */
    align-items: center; /* Center the content */
  }

  .training-entry__thumbnail {
    width: 100%; /* Make the image take full width */
    height: 15rem; /* Adjust height for smaller screens */
  }

  .training-entry__content {
    width: 100%; /* Ensure content takes full width */
    padding: 10px;
    text-align: left; /* Center text content */
    gap: 0.8rem;
  }

  .training-entry__title {
    font-size: 1.2rem;
  }
}
</style>
