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
});

function selectUser() {
  // Emit the selected user to the parent
}
</script>
  
  <style scoped>
/* Add your styles here */
</style>
  