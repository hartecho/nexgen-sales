<template>
  <div class="wrapper">
    <!-- Profile Image and Edit Section -->
    <ProfileDashboardBanner />
    <div class="welcome">
      <h1>Welcome Back, {{ userStore.user.name }}!</h1>
      <img src="/Graphics/HandWave.png" alt="Waving Hand" />
    </div>

    <!-- <ProfileDashboardSteps /> -->

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
  courseStore.setCache();
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

.wrapper {
  /* overflow: auto; */
}

.welcome {
  display: flex;
  margin-bottom: 3rem;
}

h1 {
  margin-left: 1rem;
}

img {
  height: 2rem;
  width: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

.course-list {
  margin-top: 5rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
}
</style>
  