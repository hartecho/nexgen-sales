<template>
  <div
    class="sidebar"
    :class="{ large: isLarge, small: !isLarge }"
    v-if="hydrated"
  >
    <h2>Next Training</h2>
    <div v-if="nextTraining" class="sidebar-post">
      <NuxtLink :to="`/training/${nextTraining._id}`">
        <div class="img-wrapper">
          <NuxtImg
            :src="resolvedImgPath(nextTraining.image)"
            :alt="nextTraining.mainTitle + ' picture'"
            :placeholder="generatePlaceholderUrl(nextTraining.image)"
            loading="lazy"
            @load="onImageLoad(0)"
            :class="{ 'image-loaded': loadedImages[0] }"
          />
        </div>
        <h3>{{ nextTraining.mainTitle }}</h3>
        <p>{{ truncatePreview(nextTraining.preview) }}</p>
      </NuxtLink>
      <button
        :disabled="!isTrainingComplete"
        class="next-training-button"
        :class="{ active: isTrainingComplete }"
        @click="goToNextTraining"
      >
        Go to Next Training
      </button>
    </div>
    <p v-else>No more trainings available</p>
  </div>
</template>

<script setup>
const isLarge = ref(true);
const hydrated = ref(false);

const props = defineProps({
  courseId: {
    type: String,
    required: true,
  },
  trainingId: {
    type: String,
    required: true,
  },
  nextTraining: {
    type: Object,
    required: true,
  },
  isTrainingComplete: {
    type: Boolean,
    default: false,
  },
});

const loadedImages = ref({});

const truncatePreview = (text) => {
  if (!text) return "";
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  return sentences ? sentences[0] : text;
};

const generatePlaceholderUrl = (url) => {
  if (!url) return "";
  const lastDotIndex = url.lastIndexOf(".");
  if (lastDotIndex === -1) return url;

  const extension = url.slice(lastDotIndex);
  const baseUrl = url.slice(0, lastDotIndex);
  return resolvedImgPath(`${baseUrl}Blur${extension}`);
};

const resolvedImgPath = (path) => {
  if (path) {
    return `/TrainingPics/${path}`;
  }
  return "/Logos/HARTECHOLogo.webp";
};

const onImageLoad = (index) => {
  loadedImages.value = { ...loadedImages.value, [index]: true };
};

const goToNextTraining = () => {
  if (props.nextTraining) {
    useRouter().push(
      `/training/${props.nextTraining._id}?courseId=${props.courseId}`
    );
  }
};

onMounted(() => {
  hydrated.value = true;
});
</script>

<style scoped>
.sidebar {
  flex: 1;
  position: -webkit-sticky;
  position: sticky;
  height: fit-content;
  padding: 0 1rem;
  border-radius: 8px;
  transition: top 0.4s;
}

.sidebar.large {
  top: 2rem;
}

.sidebar.small {
  top: 2rem;
}

.sidebar h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.sidebar-post {
  margin-bottom: 1.5rem;
}

.img-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-bottom: 0.5rem;
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.2);
  transition: transform 0.5s ease-in-out;
}

.img-wrapper img.image-loaded {
  transform: scale(1);
}

.sidebar-post h3 {
  font-size: 1.2rem;
  font-family: "Merriweather", serif;
  color: #444;
  margin-bottom: 0.5rem;
}

.sidebar-post p {
  font-size: 1rem;
  font-family: "Merriweather", serif;
  color: #666;
}

.next-training-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #cccccc;
  border: none;
  border-radius: 0px;
  cursor: not-allowed;
  transition: background-color 0.3s ease-in-out;
}

.next-training-button.active {
  background-color: #4caf50;
  cursor: pointer;
}

.next-training-button:disabled {
  background-color: #cccccc;
}

@media (max-width: 768px) {
  .sidebar {
    margin-top: 2rem;
    padding: 0;
  }
}
</style>
