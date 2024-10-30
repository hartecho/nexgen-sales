<template>
  <div class="filters">
    <label for="sortBy">Sort By:</label>
    <select id="sortBy" v-model="localSortBy" @change="updateSort">
      <option value="">None</option>
      <option value="age">Age</option>
      <option value="grade">Grade</option>
      <option value="status">Status</option>
      <option value="hasTestResults">Has Test Results</option>
    </select>

    <label for="filterByGrade">Filter by Grade:</label>
    <select
      id="filterByGrade"
      v-model="localFilterGrade"
      @change="updateGradeFilter"
    >
      <option value="">All Grades</option>
      <option v-for="grade in grades" :key="grade" :value="grade">
        {{ grade }}
      </option>
    </select>

    <label for="filterByStatus">Filter by Status:</label>
    <select
      id="filterByStatus"
      v-model="localFilterStatus"
      @change="updateStatusFilter"
    >
      <option value="">All Statuses</option>
      <option v-for="status in statuses" :key="status" :value="status">
        {{ status }}
      </option>
    </select>
  </div>
</template>
  
  <script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  sortBy: String,
  filterGrade: String,
  filterStatus: String,
  grades: Array,
  statuses: Array,
});

const emit = defineEmits([
  "updateSort",
  "updateGradeFilter",
  "updateStatusFilter",
]);

// Local reactive variables for sorting and filtering
const localSortBy = ref(props.sortBy);
const localFilterGrade = ref(props.filterGrade);
const localFilterStatus = ref(props.filterStatus);

// Emit events when sort or filter changes
const updateSort = () => {
  emit("updateSort", localSortBy.value);
};

const updateGradeFilter = () => {
  emit("updateGradeFilter", localFilterGrade.value);
};

const updateStatusFilter = () => {
  emit("updateStatusFilter", localFilterStatus.value);
};

// Watch for changes to props and update local state
watch(
  () => props.sortBy,
  (newSortBy) => {
    localSortBy.value = newSortBy;
  }
);

watch(
  () => props.filterGrade,
  (newFilterGrade) => {
    localFilterGrade.value = newFilterGrade;
  }
);

watch(
  () => props.filterStatus,
  (newFilterStatus) => {
    localFilterStatus.value = newFilterStatus;
  }
);
</script>
  
  <style scoped>
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}

.filters select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1rem;
}
</style>
  