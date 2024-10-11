<template>
  <div>
    <!-- Profile Image and Edit Section -->
    <ProfileDashboardBanner @trigger-file-input="triggerFileInput" />
    <!-- Enrolled Courses Section -->
    <ProfileDashboardEnrolledCourses
      :enrolledCourses="enrolledCourses"
      @view-course="goToCourse"
    />
  </div>
</template>
  
  <script setup>
const courseStore = useCourseStore();
const userStore = useUserStore();
const router = useRouter();
const enrolledCourses = ref([]);

onMounted(async () => {
  await fetchEnrolledCoursesAndTrainings();
});

const fetchEnrolledCoursesAndTrainings = async () => {
  await fetchAndSetCourses();
  await fetchAndSetTrainings();
  const user = userStore.user;
  if (user && user.enrolledCourses) {
    enrolledCourses.value = user.enrolledCourses.map((enrollment) =>
      courseStore.getCourseById(enrollment.course)
    );
  }
};

const fetchAndSetCourses = async () => {
  if (
    !courseStore.lastFetchTime ||
    Date.now() - courseStore.lastFetchTime >= courseStore.CACHE_DURATION
  ) {
    const courses = await $fetch("/api/courses");
    courseStore.setCourses(courses);
  }
};

const fetchAndSetTrainings = async () => {
  if (
    !courseStore.lastFetchTime ||
    Date.now() - courseStore.lastFetchTime >= courseStore.CACHE_DURATION
  ) {
    const trainings = await $fetch("/api/trainings");
    courseStore.setTrainings(trainings);
  }
};

const goToCourse = (courseId) => {
  router.push(`/course/${courseId}`);
};
</script>
  
  <style scoped>
.body {
  width: 100%;
  min-height: 70rem;
  height: auto;
}

.course-list {
  margin-top: 5rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
}
</style>
  