<template>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else>
    <h2>Your Enrolled Courses</h2>
    <div v-if="enrolledCourses.length === 0">
      <p>You are not enrolled in any courses.</p>
    </div>
    <div v-else>
      <div
        v-for="(course, index) in enrolledCourses"
        :key="course._id"
        class="course-item"
      >
        <!-- Course Image -->
        <img
          v-if="course.image"
          :src="course.image"
          alt="Course Image"
          class="course-image"
        />

        <div class="course-details">
          <h3>{{ course.name }}</h3>
          <p>{{ course.description }}</p>

          <div v-if="course.trainings.length">
            <!-- Progress Bar -->
            <div class="progress-container">
              <div
                class="progress-bar"
                :style="{ width: `${completionPercentage(course)}%` }"
              ></div>
            </div>
            <p>{{ completionPercentage(course) }}% Complete</p>

            <p>
              Next Training:
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
            <p>No trainings available for this course.</p>
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

// Resume the next available training in the course
const resumeCourse = (course) => {
  const nextTraining = getNextTraining(course);
  if (nextTraining && nextTraining._id) {
    router.push(`/training/${nextTraining._id}`);
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

  const completed = currentTrainingIndex + 1; // Assuming 0-based index
  const total = course.trainings.length;
  return ((completed / total) * 100).toFixed(2);
};
</script>

<style scoped>
.course-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.course-image {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 15px;
  border-radius: 8px;
}

.course-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.training-thumbnail {
  width: 100px;
  height: auto;
  margin-bottom: 15px;
  border-radius: 5px;
}

.progress-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar {
  height: 10px;
  background-color: #007bff;
}

.resume-btn {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.resume-btn:hover {
  background-color: #0056b3;
}

h3 {
  margin: 0;
  font-size: 1.5rem;
}

p {
  margin: 5px 0;
}
</style>
