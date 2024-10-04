<template>
  <section class="course-list">
    <!-- Dynamic Header -->
    <h2 class="course-list__header">
      {{ selectedTag ? selectedTag : "All" }} Courses
    </h2>

    <div
      v-for="(course, index) in paginatedCourses"
      :key="course._id"
      class="course-entry"
    >
      <div class="course-entry__thumbnail" @click="goToCourse(course._id)">
        <NuxtImg
          :src="resolvedImgPath(course.image)"
          :alt="course.name ? course.name + ' picture' : 'Course post image'"
          :placeholder="generatePlaceholderUrl(course.image)"
          loading="lazy"
          :class="{ 'image-loaded': loadedImages[index] }"
          @load="onImageLoad(index)"
        />
      </div>
      <div class="course-entry__content">
        <h2 class="course-entry__title">
          {{ course.name || "Untitled Course" }}
        </h2>
        <p class="course-entry__excerpt">{{ course.description }}</p>

        <!-- Enrollment or Progress Bar -->
        <div class="enroll-container">
          <!-- Show Enroll Button if not enrolled -->
          <button
            v-if="!isEnrolled(course._id)"
            class="enroll-button"
            @click="enrollInCourse(course._id)"
          >
            Enroll
          </button>

          <!-- Show Progress Bar if enrolled -->
          <div v-else class="progress-container">
            <div class="progress-bar">
              <div
                class="progress-bar__fill"
                :style="{ width: `${calculateCompletion(course._id)}%` }"
              ></div>
            </div>
            <span class="progress-percentage">
              {{ calculateCompletion(course._id) }}% completed
            </span>
          </div>

          <!-- Show completion message if course is completed -->
          <span v-if="isCourseCompleted(course._id)" class="completed-status">
            Course Completed!
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  paginatedCourses: {
    type: Array,
    required: true,
  },
  loadedImages: {
    type: Object,
    required: true,
  },
  selectedTag: {
    type: String,
    required: false,
  },
});

const userStore = useUserStore();
const emit = defineEmits(["view-course", "update:loadedImages"]);

const goToCourse = (courseId) => {
  emit("view-course", courseId);
};

// Check if the user is already enrolled in a course
function isEnrolled(courseId) {
  // Ensure enrolledCourses exists and is an array before proceeding
  if (!userStore.user || !Array.isArray(userStore.user.enrolledCourses)) {
    return false;
  }

  return userStore.user.enrolledCourses.some(
    (enrolled) => enrolled.course && enrolled.course === courseId
  );
}

// Calculate course completion percentage
function calculateCompletion(courseId) {
  const enrolledCourse = userStore.user?.enrolledCourses?.find(
    (enrolled) => enrolled.course === courseId
  );

  const totalTrainings = props.paginatedCourses.find(
    (course) => course._id === courseId
  )?.trainings.length;

  if (!enrolledCourse || !totalTrainings) return 0;

  const currentTrainingIndex = enrolledCourse.currentTrainingIndex;
  const completion = (currentTrainingIndex / totalTrainings) * 100;

  return completion > 100 ? 100 : Math.round(completion); // Cap at 100%
}

// Check if the course is completed
function isCourseCompleted(courseId) {
  return calculateCompletion(courseId) === 100;
}

// Enroll in a course
async function enrollInCourse(courseId) {
  try {
    const enrolledCourses = userStore.user.enrolledCourses || [];

    // Create or update the enrolledCourses array, adding a new course with its correct ID
    const updatedEnrolledCourses = [
      ...enrolledCourses,
      { course: courseId, currentTrainingIndex: 0 }, // Pass the correct courseId
    ];

    // Update user with the new course
    const updatedUser = await $fetch(`/api/users/${userStore.user._id}`, {
      method: "PUT",
      body: {
        enrolledCourses: updatedEnrolledCourses,
      },
    });

    // Update the user store
    userStore.setUser(updatedUser);
    alert("Successfully enrolled in the course!");
  } catch (error) {
    console.error("Error enrolling in course:", error);
    alert("An error occurred while enrolling in the course.");
  }
}

function resolvedImgPath(path) {
  return path ? `/CoursePics/${path}` : "/HARTECHOLogo.webp";
}

const generatePlaceholderUrl = (url) => {
  if (!url || typeof url !== "string" || url.length === 0) {
    return "/defaultPlaceholderImageBlur.webp";
  }

  const lastDotIndex = url.lastIndexOf(".");
  if (lastDotIndex === -1 || lastDotIndex === 0) return url;

  const extension = url.slice(lastDotIndex);
  const baseUrl = url.slice(0, lastDotIndex);

  return resolvedImgPath(`${baseUrl}Blur${extension}`);
};

// Function to handle image load event
const onImageLoad = (index) => {
  emit("update:loadedImages", { index, status: true });
};
</script>

<style scoped>
.course-list__header {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.course-entry {
  display: flex;
  border-radius: 0px;
  margin-bottom: 20px;
  max-width: 100%;
  min-height: 15rem;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
}

.course-entry:nth-child(odd) {
  background-color: #f0f0f0;
}

.course-entry:nth-child(even) {
  background-color: #ffffff;
}

.course-entry:hover {
  transform: scale(1.005);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
}

.course-entry__thumbnail {
  height: 15rem;
  width: 20rem;
  overflow: hidden;
  cursor: pointer;
}

.course-entry__thumbnail img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transform: scale(1.2);
  transition: transform 0.5s ease-in-out;
}

.course-entry__thumbnail img.image-loaded {
  transform: scale(1);
}

.course-meta {
  font-size: 0.85rem;
  color: #777;
}

.course-entry__content {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.course-entry__title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.course-entry__excerpt {
  color: #666;
  font-weight: lighter;
}

.enroll-container {
  margin-top: 1rem;
}

.enroll-button {
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.enroll-button:hover {
  background-color: #0056b3;
}

.enrolled-status {
  color: green;
  font-weight: bold;
}

.progress-container {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* This ensures the percentage and completion text are on the same line */
  width: 100%;
}

.progress-bar {
  background-color: #f0f0f0;
  border-radius: 5px;
  width: 75%; /* Adjust width so that percentage text and 'Completed' are aligned */
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

.completed-status {
  color: green;
  font-weight: bold;
  margin-left: 10px;
}

@media (max-width: 1100px) {
  /* Pixels changed to be proportional with sidebar taking up some screen width */
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
}
</style>
