<template>
  <div
    class="course-hero"
    :style="{ backgroundImage: `url(/CoursePics/${image})` }"
  >
    <div class="overlay">
      <h1>{{ course?.name || "Loading..." }}</h1>
      <button
        v-if="isEnrolled && !areTrainingsCompleted"
        @click="resumeCourse"
        class="resume-button"
      >
        Resume Course
      </button>
      <button
        v-if="isEnrolled && areTrainingsCompleted && !isCourseCompleted"
        @click="takeTest"
        class="resume-button"
      >
        Take Course Test
      </button>
      <button v-if="isEnrolled && isCourseCompleted" class="resume-button">
        Course Completed!
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
  isEnrolled: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
  },
  areTrainingsCompleted: {
    type: Boolean,
    required: true,
  },
  isCourseCompleted: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["resume-course", "take-test"]);

const resumeCourse = () => {
  emit("resume-course");
};

const takeTest = () => {
  emit("take-test");
};
</script>

<style scoped>
.course-hero {
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 2rem;
  text-align: center;
  color: white;
  height: 300px; /* Adjust height as needed */
}

.overlay {
  background-color: rgba(1, 151, 178, 0.7); /* Transparent overlay */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
}

h1 {
  margin-bottom: 2rem;
}

.resume-button {
  background-color: #ff8210;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
}
</style>
