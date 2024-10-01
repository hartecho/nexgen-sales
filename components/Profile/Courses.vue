<template>
  <div class="courses-wrapper">
    <div class="content-container">
      <!-- Right Column: Course List -->
      <div class="right-column">
        <!-- <h1 class="filter-title">All Courses</h1> -->
        <CourseSearchCourseList
          :paginatedCourses="paginatedCourses"
          :loadedImages="loadedImages"
          :selectedTag="selectedTag"
          @view-course="goToCourse"
          @update:loadedImages="updateLoadedImages"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// Fetch courses data
const { data: courses, pending, error } = await useFetch("/api/courses");

// State management
const selectedTag = ref(""); // Keeping selectedTag even if filters are removed
const loadedImages = ref({}); // Image loading status
const currentPage = ref(1); // Current page, in case we add pagination in the future
const itemsPerPage = ref(5); // Items per page

// Function to filter and sort courses
const filteredCourses = computed(() => {
  let filtered = courses.value || [];

  // Sort the courses alphabetically for now
  return filtered.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
});

// Simulating pagination without filtering or sorting features for now
const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCourses.value.slice(start, end);
});

// Handle course navigation
const goToCourse = (courseId) => {
  useRouter().push(`/course/${courseId}`);
};

// Handle image loading status
const updateLoadedImages = ({ index, status }) => {
  loadedImages.value = { ...loadedImages.value, [index]: status };
};

// Emit to hide the loading screen
const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
.courses-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0;
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

.filter-title {
  font-size: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 1025px) {
  .right-column {
    margin-top: 2rem;
  }
}
</style>
