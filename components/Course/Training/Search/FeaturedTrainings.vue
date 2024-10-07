<template>
  <section class="featured-section">
    <h2>Featured Posts</h2>
    <div class="featured-trainings">
      <div
        v-for="(training, index) in featuredTrainings"
        :key="training._id"
        class="featured-training"
        @click="goToTraining(training._id)"
      >
        <div class="featured-thumbnail">
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
        <div class="featured-content">
          <!-- Tags listed here -->
          <div
            class="training-tags"
            v-if="training.tags && training.tags.length"
          >
            <span
              v-for="(tag, index) in training.tags"
              :key="index"
              class="training-tag"
              >{{ tag }}</span
            >
          </div>
          <h3>{{ training.mainTitle || "Untitled Training" }}</h3>

          <!-- Date and reading time -->
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
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  featuredTrainings: {
    type: Array,
    required: true,
  },
  loadedImages: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["view-training", "update:loadedImages"]);

const goToTraining = (trainingId) => {
  emit("view-training", trainingId);
};

function resolvedImgPath(path) {
  return path ? `/Graphics/TrainingPics/${path}` : "/Logos/HARTECHOLogo.webp";
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
.featured-section {
  margin-bottom: 3rem;
}

.featured-trainings {
  display: flex;
  gap: 1rem;
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.featured-training {
  width: 30%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 0.5rem;
}

.featured-training:hover {
  transform: scale(1.03);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
}

.featured-thumbnail {
  height: 150px;
  overflow: hidden;
}

.featured-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-content h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.training-tags {
  margin: 0.5rem 0;
  display: flex;
  flex-wrap: wrap;
}

.training-tag {
  background-color: #444;
  padding: 0.3rem 0.6rem;
  margin-right: 0.3rem;
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
  color: #333;
  border-radius: 10px;
  color: white;
  font-weight: bold;
}

.training-meta {
  font-size: 0.85rem;
  color: #777;
  margin-bottom: 1rem;
}

.featured-content a {
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
}

.featured-content a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .featured-trainings {
    flex-direction: column; /* Stack featured trainings vertically */
  }

  .featured-training {
    width: 100%; /* Make each training take full width */
  }

  .featured-thumbnail {
    height: auto; /* Let the image adjust based on its aspect ratio */
  }
}
</style>
