<template>
  <div class="course-page-wrapper">
    <CourseHero
      :course="course || {}"
      :isEnrolled="isEnrolled"
      :isCourseCompleted="isCourseCompleted"
      :image="course?.image"
      @resume-course="resumeCourse"
      :loading="loading"
    />
    <div class="course-page">
      <CourseSearchBreadcrumbs
        :currentCourseTitle="course?.name || 'Current Course'"
      />
      <div class="course-content">
        <div class="course-details">
          <h2 class="title">{{ course?.name || "Loading..." }}</h2>
          <CourseTrainings
            :trainings="trainings"
            :currentTrainingIndex="currentTrainingIndex"
            :loading="loading"
            :courseId="courseId || ''"
          />
        </div>

        <div class="sidebar">
          <CourseSidebar
            :completedTrainings="currentTrainingIndex"
            :totalTrainings="totalTrainings"
            :completionPercentage="completionPercentage"
            :instructor="course?.instructor"
            :image="getNextTrainingImage"
            :loading="loading"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const course = ref(null);
const courseId = ref(null);
const trainings = ref([]);
const courseStore = useCourseStore();
const userStore = useUserStore();
const router = useRouter();
const loading = ref(true);

onMounted(async () => {
  courseId.value = router.currentRoute.value.params.id;
  await fetchAndSetCourses();
  loading.value = false;
});

const fetchAndSetCourses = async () => {
  loading.value = true;

  if (
    !courseStore.lastFetchTime ||
    Date.now() - courseStore.lastFetchTime >= courseStore.CACHE_DURATION
  ) {
    try {
      const courses = await $fetch("/api/courses");
      courseStore.setCourses(courses);
      course.value = courseStore.getCourseById(courseId.value);
      await fetchAndSetTrainings();
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  } else {
    course.value = courseStore.getCourseById(courseId.value);
    await fetchAndSetTrainings();
  }

  loading.value = false;
};

const fetchAndSetTrainings = async () => {
  loading.value = true;

  if (
    !courseStore.lastFetchTime ||
    Date.now() - courseStore.lastFetchTime >= courseStore.CACHE_DURATION
  ) {
    try {
      const trainingsData = await $fetch("/api/trainings");
      courseStore.setTrainings(trainingsData);
    } catch (error) {
      console.error("Error fetching trainings:", error);
    }
  }

  if (course.value && course.value.trainings.length > 0) {
    trainings.value = course.value.trainings.map((id) =>
      courseStore.getTrainingById(id)
    );
  }

  loading.value = false;
  courseStore.setCache();
};

const getNextTraining = computed(() => {
  if (
    !course.value ||
    currentTrainingIndex.value === null ||
    !course.value.trainings.length
  ) {
    return null;
  }

  const nextTrainingId = course.value.trainings[currentTrainingIndex.value];
  if (!nextTrainingId) {
    return null;
  }

  const nextTraining = courseStore.getTrainingById(nextTrainingId);
  return nextTraining;
});

const resumeCourse = () => {
  if (getNextTraining.value && getNextTraining.value._id) {
    router.push(
      `/training/${getNextTraining.value._id}?courseId=${courseId.value}`
    );
  }
};

const isEnrolled = computed(() => {
  const user = userStore.user;
  if (!user || !user.enrolledCourses) return false;
  return user.enrolledCourses.some(
    (enrollment) => enrollment.course === courseId.value
  );
});

const completionPercentage = computed(() => {
  if (totalTrainings.value === 0) return 0;
  return (currentTrainingIndex.value / totalTrainings.value) * 100;
});

const isCourseCompleted = computed(() => {
  return currentTrainingIndex.value === totalTrainings.value;
});

const currentTrainingIndex = computed(() => {
  const user = userStore.user;

  if (!user || !user.enrolledCourses || !courseId.value) {
    return 0;
  }

  const enrollment = user.enrolledCourses.find(
    (enrollment) => enrollment.course === courseId.value
  );

  if (!enrollment) {
    return 0;
  }

  return enrollment.currentTrainingIndex || 0;
});

const totalTrainings = computed(() => trainings.value?.length || 0);

const getNextTrainingImage = computed(() => {
  const training = getNextTraining.value;
  return training?.thumbnail;
});

useSeoMeta({
  title: course?.name
    ? `${course.name} - Nexgen Door-to-Door Sales Training Course`
    : "Nexgen Door-to-Door Sales Training Courses",
  ogTitle: course?.name
    ? `${course.name} - Nexgen Door-to-Door Sales Training Course`
    : "Nexgen Door-to-Door Sales Training Courses",
  description: course?.description
    ? `${course.description.substring(0, 155)}...`
    : "Enroll in Nexgen's door-to-door sales training courses. Get expert guidance, in-depth trainings, and all the resources you need to succeed in door-to-door sales.",
  ogDescription: course?.description
    ? `${course.description.substring(0, 155)}...`
    : "Join Nexgen's door-to-door sales training courses to master essential sales skills. Get expert guidance, training modules, and practical resources to excel.",
  ogImage: course?.image
    ? `~/CoursePics/${course.image}`
    : "~/Logos/NexgenLogo.webp",
  twitterCard: course?.image
    ? `~/CoursePics/${course.image}`
    : "~/Logos/NexgenLogo.webp",
});

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
.course-page-wrapper {
  background: #ebebeb;
}

.course-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
}

.course-content {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.course-details {
  flex: 2;
}

.title {
  background: white;
  padding: 2rem;
}

.sidebar {
  flex: 1;
}

@media (max-width: 768px) {
  .course-page {
    padding: 1.5rem;
  }

  .course-content {
    flex-direction: column;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .course-page {
    padding: 1rem;
  }

  .course-content {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
