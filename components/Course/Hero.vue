<template>
  <div class="course-hero">
    <h1>{{ course.name }}</h1>
    <button v-if="isEnrolled" @click="resumeCourse" class="resume-button">
      {{ isCourseCompleted ? "Restart Course" : "Resume Course" }}
    </button>
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
  isCourseCompleted: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["resume-course"]);

const resumeCourse = () => {
  emit("resume-course");
};
</script>
  
  <style scoped>
.course-hero {
  background-color: #007bff;
  color: white;
  padding: 2rem;
  text-align: center;
}

.resume-button {
  background-color: #ff8210;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
  