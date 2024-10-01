<template>
  <div class="course-page-wrapper">
    <div class="course-page" v-if="course">
      <!-- Course Hero Section -->
      <CourseHero
        :course="course"
        :isEnrolled="isEnrolled"
        :isCourseCompleted="isCourseCompleted"
        @resume-course="resumeCourse"
      />

      <div class="course-content">
        <!-- Course Contents and Trainings -->
        <div class="course-details">
          <h2>{{ course.name }}</h2>
          <CourseTrainings
            :trainings="trainings"
            :resolvedImgPath="resolvedImgPath"
            :isTrainingCompleted="isTrainingCompleted"
          />
        </div>

        <!-- Course Progress and Instructor Info -->
        <CourseSidebar
          :completedTrainings="completedTrainings"
          :totalTrainings="totalTrainings"
          :completionPercentage="completionPercentage"
          :instructor="course.instructor"
        />
      </div>
    </div>
  </div>
</template>
  
  <script setup>
const course = ref(null);
const courseId = ref(null);
const completedTrainings = ref(0);
const trainings = ref([]);
const courseStore = useCourseStore();
const userStore = useUserStore();
const router = useRouter();

// Get the specific course from the store
const loading = ref(true); // Add a loading state

// Fetch and set courses if needed based on cache duration
const fetchAndSetCourses = async () => {
  loading.value = true; // Start loading

  // Check if courses need to be fetched based on cache duration
  if (
    !courseStore.lastFetchTime ||
    Date.now() - courseStore.lastFetchTime >= courseStore.CACHE_DURATION
  ) {
    try {
      // Fetch all courses from the API if cache is expired
      const courses = await $fetch("/api/courses");
      courseStore.setCourses(courses); // Set courses and update lastFetchTime in the store
      course.value = courseStore.getCourseById(courseId.value); // Get the specific course from the store
      await fetchAndSetTrainings(); // Fetch trainings after courses are fetched
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  } else {
    // Use cached courses from the store if cache is still valid
    course.value = courseStore.getCourseById(courseId.value);
    await fetchAndSetTrainings(); // Fetch trainings even if courses are cached
  }

  loading.value = false; // End loading
};

// Fetch and set trainings if needed based on cache duration
const fetchAndSetTrainings = async () => {
  loading.value = true; // Start loading

  // Check if trainings need to be fetched based on cache duration
  if (
    !courseStore.lastFetchTime ||
    Date.now() - courseStore.lastFetchTime >= courseStore.CACHE_DURATION
  ) {
    try {
      // Fetch all trainings from the API if cache is expired
      const trainingsData = await $fetch("/api/trainings");
      courseStore.setTrainings(trainingsData); // Set trainings and update lastFetchTime in the store
    } catch (error) {
      console.error("Error fetching trainings:", error);
    }
  }

  // Always set specific trainings from the store based on the course's training IDs
  if (course.value && course.value.trainings.length > 0) {
    trainings.value = course.value.trainings.map((id) =>
      courseStore.getTrainingById(id)
    );
  }

  loading.value = false; // End loading
};

// Initialize the component and fetch data if necessary
onMounted(async () => {
  courseId.value = router.currentRoute.value.params.id;

  // Fetch and set courses and trainings, depending on cache
  await fetchAndSetCourses();
});

// Is the user enrolled in the course?
const isEnrolled = computed(() => {
  const user = userStore.user;
  if (!user || !user.enrolledCourses) return false;
  return user.enrolledCourses.some(
    (enrollment) => enrollment.course === courseId.value
  );
});

// Compute the total number of trainings
const totalTrainings = computed(() => trainings.value?.length || 0);

// Calculate the completion percentage
const completionPercentage = computed(() => {
  if (totalTrainings.value === 0) return 0;
  return (completedTrainings.value / totalTrainings.value) * 100;
});

// Determine if a training is completed
const isTrainingCompleted = (index) => {
  return completedTrainings.value > index;
};

// Resume or restart course
const resumeCourse = () => {
  const nextLesson = completedTrainings.value;
  router.push(`/course/${courseId.value}/lesson/${nextLesson}`);
};

// Check if the course is completed
const isCourseCompleted = computed(() => {
  return completedTrainings.value === totalTrainings.value;
});

// Utility function for resolving image paths
function resolvedImgPath(path) {
  return path ? `/images/${path}` : "/defaultImage.webp";
}

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>
  
  <style scoped>
.course-page-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
  