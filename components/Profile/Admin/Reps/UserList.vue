<template>
  <div class="wrapper">
    <transition name="fade" mode="out-in">
      <div v-if="list" class="user-list">
        <h2>User List</h2>

        <ProfileAdminRepsUserFilters
          :sortBy="sortBy"
          :filterGrade="filterGrade"
          :grades="grades"
          @updateSort="updateSort"
          @updateFilter="updateFilter"
        />

        <ProfileAdminRepsUserListLabels />

        <!-- User List Section -->
        <div class="user-list-container">
          <div v-if="sortedAndFilteredUsers.length" class="scrollable-list">
            <UserCard
              v-for="user in sortedAndFilteredUsers"
              :key="user._id"
              :user="user"
              @selectUser="selectUser(user._id)"
            />
          </div>
          <div v-else>
            <p>No users found.</p>
          </div>
        </div>
      </div>
      <div v-else>
        <ProfileAdminRepsUserPage
          :user="selectedUser"
          @back-to-list="list = true"
          @updateUser="updateSelectedUser($event)"
          @dbUpdate="updateUser()"
        />
      </div>
    </transition>
    <SubcomponentsNotificationPopup
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
    />
  </div>
</template>
  
  <script setup>
import { ref, onMounted, computed } from "vue";

const users = ref([]);
const sortBy = ref("");
const filterGrade = ref("");
const list = ref(true);
const notificationMessage = ref("");
const notificationType = ref("");
const selectedUser = ref({});
const grades = [
  "Highly Promising",
  "Promising",
  "Average",
  "Needs Improvement",
  "Not Suitable",
  "Ungraded",
];

onMounted(async () => {
  await getUsers();
});

async function getUsers() {
  try {
    const response = await $fetch("/api/users");
    users.value = response || [];
  } catch (error) {
    showNotification("Error fetching users: " + error.message, "error");
  }
}

const sortedAndFilteredUsers = computed(() => {
  let filteredUsers = users.value.filter((user) => user.role !== "admin"); // Exclude admins
  if (filterGrade.value) {
    filteredUsers = filteredUsers.filter(
      (user) => user.grade === filterGrade.value
    );
  }
  // Sort users
  // Implement sorting logic based on sortBy
  return filteredUsers;
});

// Additional functions (selectUser, showNotification, etc.)

function updateSort(newSort) {
  sortBy.value = newSort;
}

function updateFilter(newFilter) {
  filterGrade.value = newFilter;
}
</script>
  
  <style scoped>
/* Add your styles here */
</style>
  