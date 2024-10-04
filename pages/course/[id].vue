<template>
  <div class="course-page-wrapper">
    <CourseHero
      :course="course"
      :isEnrolled="isEnrolled"
      :isCourseCompleted="isCourseCompleted"
      :image="course?.image"
      @resume-course="resumeCourse"
      :loading="loading"
    />
    <div class="course-page">
      <div class="course-content">
        <div class="course-details">
          <h2 class="title">{{ course?.name || "Loading..." }}</h2>
          <CourseTrainings
            :trainings="trainings"
            :currentTrainingIndex="currentTrainingIndex"
            :loading="loading"
          />
        </div>

        <div class="sidebar">
          <CourseSidebar
            :completedTrainings="completedTrainings"
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
const completedTrainings = ref(0);
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
      console.error("Error fetching courses:", error);
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
};

// Updated getNextTraining computed property
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
    router.push(`/training/${getNextTraining.value._id}`);
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
  return (completedTrainings.value / totalTrainings.value) * 100;
});

const isCourseCompleted = computed(() => {
  return completedTrainings.value === totalTrainings.value;
});

const currentTrainingIndex = computed(() => {
  const user = userStore.user;

  const enrollment = user?.enrolledCourses?.find(
    (enrollment) => enrollment.course === courseId.value
  );

  if (!enrollment || !course.value || !course.value.trainings.length) {
    return null;
  }

  return enrollment.currentTrainingIndex;
});

const totalTrainings = computed(() => trainings.value?.length || 0);

const getNextTrainingImage = computed(() => {
  const training = getNextTraining.value;
  return training?.thumbnail || null;
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
</style>
