<template>
  <section class="course-list">
    <h2 class="course-list__header">Your Enrolled Courses</h2>

    <div v-if="loading" class="spinner-wrapper">
      <div class="spinner"></div>
    </div>
    <div
      v-else-if="!loading && enrolledCourses.length === 0"
      class="no-courses"
    >
      <p>You are not enrolled in any courses.</p>
    </div>
    <div v-else>
      <div
        v-for="course in enrolledCourses"
        :key="course._id"
        class="course-entry"
      >
        <div
          class="course-entry__thumbnail"
          @click="$emit('view-course', course._id)"
        >
          <img
            :src="`/CoursePics/${course.image}`"
            alt="Course Image"
            class="course-image"
          />
        </div>

        <div class="course-entry__content">
          <h2 class="course-entry__title">
            {{ course.name || "Untitled Course" }}
          </h2>
          <p class="course-entry__excerpt">{{ course.description }}</p>

          <div class="progress-container">
            <div class="progress-bar">
              <div
                class="progress-bar__fill"
                :style="{ width: `${calculateCompletion(course)}%` }"
              ></div>
            </div>
            <span class="progress-percentage">
              {{ calculateCompletion(course) }}% completed
            </span>
          </div>

          <div v-if="course.trainings.length" class="next-training-section">
            <p>
              <b>Next Training: </b>
              {{
                getNextTraining(course)?.mainTitle || "All Trainings Completed"
              }}
            </p>
            <img
              v-if="getNextTrainingImage(course)"
              :src="getNextTrainingImage(course)"
              alt="Next training thumbnail"
              class="training-thumbnail"
            />
          </div>

          <button
            v-if="!areTrainingsCompleted(course)"
            class="view-course-button"
            @click="goToCourse(course)"
          >
            Resume Course
          </button>

          <button
            v-else-if="
              areTrainingsCompleted(course) && !isCourseCompleted(course)
            "
            class="view-course-button"
            @click="goToCourseTest(course._id)"
          >
            Take Course Test
          </button>

          <button
            v-else-if="isCourseCompleted(course)"
            class="view-course-button"
            @click="goToCourse(course._id)"
          >
            View Course
          </button>

          <!-- Show completion message if course is completed -->
          <span v-if="isCourseCompleted(course)" class="completed-status">
            Course Completed!
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
  
  <script setup>
const props = defineProps({
  enrolledCourses: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});

const courseStore = useCourseStore();
const userStore = useUserStore();
const router = useRouter();

const getNextTraining = (course) => {
  const currentTrainingIndex = getCurrentTrainingIndex(course);
  if (currentTrainingIndex === null || !course.trainings.length) return null;
  const nextTrainingId = course.trainings[currentTrainingIndex];
  return courseStore.getTrainingById(nextTrainingId);
};

const getNextTrainingImage = (course) => {
  const nextTraining = getNextTraining(course);
  return nextTraining ? `/TrainingPics/${nextTraining.thumbnail}` : null;
};

const getCurrentTrainingIndex = (course) => {
  const user = userStore.user;
  const enrollment = user?.enrolledCourses?.find(
    (enrollment) => enrollment.course === course._id
  );
  if (!enrollment || !course.trainings.length) return null;
  return enrollment.currentTrainingIndex;
};

const calculateCompletion = (course) => {
  const currentTrainingIndex = getCurrentTrainingIndex(course);
  if (currentTrainingIndex === null || !course.trainings.length) return 0;
  return ((currentTrainingIndex / course.trainings.length) * 100).toFixed(0);
};

function areTrainingsCompleted(course) {
  const enrolledCourse = userStore.user?.enrolledCourses?.find(
    (enrolled) => enrolled.course === course._id
  );

  const totalTrainings = props.enrolledCourses?.find(
    (enrolled) => enrolled._id === course._id
  ).trainings?.length;

  if (!enrolledCourse || !totalTrainings) return 0;

  const currentTrainingIndex = enrolledCourse.currentTrainingIndex;
  return currentTrainingIndex == totalTrainings;
}

function isCourseCompleted(course) {
  const enrolledCourse = userStore.user?.enrolledCourses?.find(
    (enrolled) => enrolled.course === course._id
  );

  const totalTrainings = props.enrolledCourses?.find(
    (enrolled) => enrolled._id === course._id
  ).trainings?.length;

  if (!enrolledCourse || !totalTrainings) return 0;

  const currentTrainingIndex = enrolledCourse.currentTrainingIndex;
  const trainingsCompleted = currentTrainingIndex == totalTrainings;

  const testTaken =
    enrolledCourse.testResults != null && enrolledCourse.testResults.length > 0;

  return trainingsCompleted && testTaken;
}

const goToCourse = (courseId) => {
  router.push(`/course/${courseId}`);
};

const goToCourseTest = (courseId) => {
  router.push({
    path: `/course/${courseId}`,
    query: { test: true },
  });
};
</script>
  
  <style scoped>
.course-list__header {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.spinner-wrapper {
  min-height: 15rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #007bff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.course-entry {
  display: flex;
  margin-bottom: 20px;
  background-color: white;
  max-width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.course-entry:hover {
  transform: scale(1.02);
}

.course-entry__thumbnail {
  width: 20rem;
  height: 15rem;
  overflow: hidden;
  cursor: pointer;
}

.course-entry__thumbnail img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 0.5s ease-in-out;
}

.course-entry__content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.course-entry__title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.course-entry__excerpt {
  color: #666;
  font-weight: lighter;
  /* margin-bottom: 0.5rem; */
}

.progress-section {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.progress-container {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}

.progress-bar {
  background-color: #f0f0f0;
  border-radius: 5px;
  width: 75%;
  height: 10px;
  margin-right: 10px;
}

.progress-bar__fill {
  background-color: #007bff;
  height: 100%;
  border-radius: 5px;
}

.progress-percentage {
  font-size: 0.9rem;
  color: #333;
  white-space: nowrap;
}

.next-training-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.next-training-section p {
  font-weight: lighter;
}

.training-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  margin-left: 10px;
}

.view-course-button {
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  width: 11rem;
}

.view-course-button:hover {
  background-color: #0056b3;
}

.no-courses {
  text-align: center;
  font-size: 1.1rem;
  color: #888;
}

.completed-status {
  color: green;
  font-weight: bold;
  margin-top: 1rem;
}

@media (max-width: 1100px) {
  .course-entry {
    flex-direction: column;
    align-items: center;
  }

  .course-entry__thumbnail {
    width: 100%;
    height: 15rem;
  }

  .course-entry__content {
    width: 100%;
    padding: 10px;
    text-align: left;
    gap: 0.8rem;
  }

  .course-entry__title {
    font-size: 1.2rem;
  }

  .view-course-button {
    width: 100%;
  }

  .completed-status {
    margin-top: 0;
  }
}
</style>
  