<template>
  <div class="user-card" @click="selectUser">
    <img
      :src="user.profilePicture || '/Logos/NexgenLogo.webp'"
      alt="Profile Picture"
      class="profile-picture"
    />
    <div class="user-details">{{ user.name }}</div>
    <div class="user-details">{{ calculateAge(user.dateOfBirth) }}</div>
    <div class="user-details grade">
      <span :class="getGradeClass(user.grade)" class="grade-dot"></span>
      {{ user.grade }}
    </div>
    <div class="user-details">
      <p v-if="hasTestResults(user.enrolledCourses)">Yes</p>
      <p v-else>No</p>
    </div>
  </div>
</template>
  
  <script setup>
import { defineProps } from "vue";
const props = defineProps({
  user: Object,
  selectUser: Function,
  calculateAge: Function,
  getGradeClass: Function,
  hasTestResults: Function,
});

function selectUser() {
  // Emit the selected user to the parent
}
</script>
  
  <style scoped>
.user-card {
  display: grid;
  grid-template-columns: 80px 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  background-color: #f9f9f9;
  transition: background-color 0.3s;
  cursor: pointer; /* Add cursor pointer */
}

.user-card:hover {
  background-color: #e0e0e0;
}

.profile-picture {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  display: flex;
  align-items: center;
}

/* Grade Dot */
.grade {
  display: flex;
  align-items: center;
}

.grade-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

/* Grade colors */
.grade-highly-promising {
  background-color: #28a745;
}

.grade-promising {
  background-color: #85e085;
}

.grade-average {
  background-color: #ffc107;
}

.grade-needs-improvement {
  background-color: #fd7e14;
}

.grade-not-suitable {
  background-color: #dc3545;
}

.grade-ungraded {
  background-color: #6c757d;
}
</style>
  