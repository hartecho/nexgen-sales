<template>
  <div class="filters">
    <div class="filter-group">
      <label for="sortBy">Sort By:</label>
      <select id="sortBy" v-model="localSortBy" @change="updateSort">
        <option value="">None</option>
        <option value="age">Age</option>
        <option value="grade">Grade</option>
        <option value="status">Status</option>
        <option value="hasTestResults">Has Test Results</option>
      </select>
    </div>

    <div class="filter-group">
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
    </div>

    <div class="filter-group">
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

const localSortBy = ref(props.sortBy);
const localFilterGrade = ref(props.filterGrade);
const localFilterStatus = ref(props.filterStatus);

const updateSort = () => {
  emit("updateSort", localSortBy.value);
};

const updateGradeFilter = () => {
  emit("updateGradeFilter", localFilterGrade.value);
};

const updateStatusFilter = () => {
  emit("updateStatusFilter", localFilterStatus.value);
};

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

.filter-group {
  display: flex;
  flex-direction: column;
}

.filters select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  max-width: 15rem;
  width: 100%;
  margin-top: 0.5rem;
  min-width: 15rem;
}

@media (max-width: 1224px) {
  .filters {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-group {
    width: 100%;
    align-items: flex-start;
  }

  label {
    width: 100%;
    text-align: left;
  }

  select {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
