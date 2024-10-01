<template>
  <div class="course-sidebar">
    <div class="progress-section">
      <h3>
        {{ completedTrainings }} of {{ totalTrainings }} Lessons Completed
      </h3>
      <div class="progress-bar">
        <div
          class="progress-bar__fill"
          :style="{ width: `${completionPercentage}%` }"
        ></div>
      </div>
    </div>

    <div class="instructor-section" v-if="instructor">
      <h3>Instructor</h3>
      <div class="instructor-info">
        <img :src="instructor.image" alt="Instructor Image" />
        <h4>{{ instructor.name }}</h4>
        <p>{{ instructor.bio }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  completedTrainings: {
    type: Number,
    required: true,
  },
  totalTrainings: {
    type: Number,
    required: true,
  },
  completionPercentage: {
    type: Number,
    required: true,
  },
  instructor: {
    type: Object,
    required: false,
  },
});
</script>
  
  <style scoped>
.course-sidebar {
  width: 30%;
}

.progress-section {
  margin-bottom: 2rem;
}

.progress-bar {
  background-color: #f0f0f0;
  border-radius: 5px;
  height: 10px;
  width: 100%;
  position: relative;
}

.progress-bar__fill {
  background-color: #007bff;
  height: 100%;
  border-radius: 5px;
}

.instructor-section {
  background-color: #fff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.instructor-info {
  text-align: center;
}

.instructor-info img {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}
</style>
  