<template>
  <div v-if="loading" class="dashboard-loading">
    <p>Loading...</p>
  </div>
  <div v-else class="dashboard-container">
    <h2 class="dashboard-title">Your Enrolled Courses</h2>
    <div v-if="enrolledCourses.length === 0" class="no-courses">
      <p>You are not enrolled in any courses.</p>
    </div>
    <div v-else class="course-list">
      <div
        v-for="(course, index) in enrolledCourses"
        :key="course._id"
        class="course-card"
      >
        <div class="course-header">
          <!-- Course Image -->
          <img
            v-if="course.image"
            :src="`/CoursePics/${course.image}`"
            alt="Course Image"
            class="course-image"
          />
          <div class="course-summary">
            <h3>{{ course.name }}</h3>
            <p>{{ course.description }}</p>
          </div>
        </div>

        <div class="course-body">
          <div v-if="course.trainings.length" class="progress-section">
            <!-- Progress Bar -->
            <div class="progress-container">
              <div
                class="progress-bar"
                :style="{ width: `${completionPercentage(course)}%` }"
              ></div>
            </div>
            <p class="progress-text">
              {{ completionPercentage(course) }}% Complete
            </p>

            <!-- Next Training Info -->
            <div class="next-training-section">
              <p>
                Next Training:
                {{
                  getNextTraining(course)?.mainTitle ||
                  "All Trainings Completed"
                }}
              </p>
              <img
                v-if="getNextTrainingImage(course)"
                :src="getNextTrainingImage(course)"
                alt="Next training thumbnail"
                class="training-thumbnail"
              />
            </div>

            <!-- Resume Course Button -->
            <button
              v-if="getNextTraining(course)"
              class="resume-btn"
              @click="resumeCourse(course)"
            >
              Resume Course
            </button>
          </div>
          <div v-else>
            <p class="no-trainings">No trainings available for this course.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useCourseStore } from "@/stores/courseStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const courseStore = useCourseStore();
const userStore = useUserStore();
const router = useRouter();
const loading = ref(true);
const enrolledCourses = ref([]);

onMounted(async () => {
  await fetchEnrolledCoursesAndTrainings();
  loading.value = false;
});

const fetchEnrolledCoursesAndTrainings = async () => {
  loading.value = true;
  await fetchAndSetCourses();
  await fetchAndSetTrainings();

  const user = userStore.user;
  if (user && user.enrolledCourses) {
    const courses = user.enrolledCourses.map((enrollment) =>
      courseStore.getCourseById(enrollment.course)
    );
    enrolledCourses.value = courses;
  }

  loading.value = false;
};

const fetchAndSetCourses = async () => {
  if (
    !courseStore.lastFetchTime ||
    Date.now() - courseStore.lastFetchTime >= courseStore.CACHE_DURATION
  ) {
    try {
      const courses = await $fetch("/api/courses");
      courseStore.setCourses(courses); // Save all courses to the store
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }
};

const fetchAndSetTrainings = async () => {
  if (
    !courseStore.lastFetchTime ||
    Date.now() - courseStore.lastFetchTime >= courseStore.CACHE_DURATION
  ) {
    try {
      const trainings = await $fetch("/api/trainings");
      courseStore.setTrainings(trainings); // Save all trainings to the store
    } catch (error) {
      console.error("Error fetching trainings:", error);
    }
  }
};

// Get the next training based on the user's current progress in the course
const getNextTraining = (course) => {
  const currentTrainingIndex = getCurrentTrainingIndex(course);
  if (currentTrainingIndex === null || !course.trainings.length) return null;

  const nextTrainingId = course.trainings[currentTrainingIndex];
  return courseStore.getTrainingById(nextTrainingId);
};

// Get the thumbnail image of the next training
const getNextTrainingImage = (course) => {
  const nextTraining = getNextTraining(course);
  return `/TrainingPics/${nextTraining?.thumbnail}` || null;
};

const resumeCourse = (course) => {
  const nextTraining = getNextTraining(course);
  if (nextTraining && nextTraining._id) {
    // Pass both the training ID and the course ID as query parameters
    router.push(`/training/${nextTraining._id}?courseId=${course._id}`);
  }
};

// Get the current training index for the course
const getCurrentTrainingIndex = (course) => {
  const user = userStore.user;
  const enrollment = user?.enrolledCourses?.find(
    (enrollment) => enrollment.course === course._id
  );
  if (!enrollment || !course.trainings.length) return null;

  return enrollment.currentTrainingIndex;
};

// Calculate completion percentage based on number of trainings completed
const completionPercentage = (course) => {
  const currentTrainingIndex = getCurrentTrainingIndex(course);
  if (currentTrainingIndex === null || !course.trainings.length) return 0;

  const completed = currentTrainingIndex; // Assuming 0-based index
  const total = course.trainings.length;
  return ((completed / total) * 100).toFixed(0);
};
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #f5f5f5; */
  /* border-radius: 10px; */
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
}

.dashboard-title {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.course-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.course-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.course-card:hover {
  transform: scale(1.02);
}

.course-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #007bff;
  color: white;
}

.course-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 15px;
}

.course-summary h3 {
  margin: 0;
  font-size: 1.25rem;
}

.course-summary p {
  margin: 5px 0;
  font-size: 0.9rem;
  color: #ddd;
}

.course-body {
  padding: 20px;
}

.progress-section {
  margin-bottom: 15px;
}

.progress-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar {
  height: 8px;
  background-color: #28a745;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.85rem;
  margin-bottom: 10px;
  color: #333;
}

.next-training-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.training-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  margin-left: 10px;
}

.resume-btn {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 15px;
}

.resume-btn:hover {
  background-color: #0056b3;
}

.no-courses,
.no-trainings {
  text-align: center;
  font-size: 1.1rem;
  color: #888;
}
</style>
