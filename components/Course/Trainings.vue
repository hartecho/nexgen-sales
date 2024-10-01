<template>
  <div class="trainings-list" v-if="trainings && trainings.length">
    <h3>Course Contents</h3>
    <div
      v-for="(training, index) in trainings"
      :key="training._id"
      class="training-entry"
    >
      <div class="training-thumbnail">
        <NuxtImg
          :src="resolvedImgPath(training.thumbnail)"
          :alt="training.mainTitle"
          loading="lazy"
        />
      </div>
      <div class="training-content">
        <h4>{{ training.mainTitle }}</h4>
        <p>{{ training.intro }}</p>
        <span v-if="isTrainingCompleted(index)" class="completed-checkmark">
          ✔
        </span>
      </div>
    </div>
  </div>

  <p v-else>Course trainings are not available yet.</p>
</template>
  
  <script setup>
const props = defineProps({
  trainings: {
    type: Array,
    required: true,
  },
  resolvedImgPath: {
    type: Function,
    required: true,
  },
  isTrainingCompleted: {
    type: Function,
    required: true,
  },
});
</script>
  
  <style scoped>
.trainings-list {
  margin-top: 1rem;
}

.training-entry {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.training-thumbnail {
  min-width: 80px;
  max-width: 80px;
  margin-right: 1rem;
}

.training-thumbnail img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.training-content {
  display: flex;
  flex-direction: column;
}

.completed-checkmark {
  color: green;
  font-size: 1.5rem;
  margin-left: 1rem;
}
</style>
  