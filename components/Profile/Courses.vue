<template>
  <div class="courses-wrapper">
    <div class="content-container">
      <!-- Right Column: Course List -->
      <div class="right-column">
        <CourseSearchCourseList
          :paginatedCourses="paginatedCourses"
          :loadedImages="loadedImages"
          :selectedTag="selectedTag"
          @view-course="goToCourse"
          @take-course-test="goToCourseTest"
          @update:loadedImages="updateLoadedImages"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

// Local state for managing courses, loaded images, and pagination
const courses = ref([]);
const selectedTag = ref("");
const loadedImages = ref({});
const currentPage = ref(1);
const itemsPerPage = ref(5);
const courseStore = useCourseStore();

// Router
const router = useRouter();
const loading = ref(false);

// Fetch the courses from the API
const fetchAndSetCourses = async () => {
  loading.value = true; // Start loading

  // Check if courses need to be fetched based on cache duration
  if (
    !courseStore.lastFetchTime ||
    Date.now() - courseStore.lastFetchTime >= courseStore.CACHE_DURATION
  ) {
    console.log("Fetching courses from API");
    try {
      // Fetch all courses from the API if cache is expired
      courses.value = await $fetch("/api/courses");
      courseStore.setCourses(courses); // Set courses and update lastFetchTime in the store
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  } else {
    // Use cached courses from the store if cache is still valid
    courses.value = courseStore.allCourses;
  }

  loading.value = false; // End loading
};

// Filter and paginate the courses
const filteredCourses = computed(() => {
  let filtered = courses.value || [];
  return filtered.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
});

const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCourses.value.slice(start, end);
});

// Handle course navigation
const goToCourse = (courseId) => {
  router.push(`/course/${courseId}`);
};

const goToCourseTest = (courseId) => {
  router.push({
    path: `/course/${courseId}`,
    query: { test: true },
  });
};

// Handle image loading status
const updateLoadedImages = ({ index, status }) => {
  loadedImages.value = { ...loadedImages.value, [index]: status };
};

// Fetch courses when the component is mounted
onMounted(async () => {
  await fetchAndSetCourses();
});
</script>

<style scoped>
.courses-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0;
  /* overflow: auto; */
}

.content-container {
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
}

.right-column {
  width: 100%;
  margin-top: 5rem;
}

@media (max-width: 1025px) {
  .right-column {
    margin-top: 2rem;
  }
}
</style>
