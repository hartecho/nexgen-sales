<template>
  <div class="wrapper">
    <transition name="fade" mode="out-in">
      <div v-if="list" class="user-list">
        <h2>User List</h2>

        <!-- Filter Section -->
        <ProfileAdminRepsUserFilters
          :sortBy="sortBy"
          :filterGrade="filterGrade"
          :grades="grades"
          @updateSort="updateSort"
          @updateFilter="updateFilter"
        />

        <ProfileAdminRepsUserListLabels />
        <div v-if="sortedAndFilteredUsers.length" class="user-list-container">
          <div
            v-for="user in sortedAndFilteredUsers"
            :key="user._id"
            class="user-card"
            @click="selectUser(user._id)"
          >
            <ProfileAdminRepsUserCard
              :user="user"
              :selectUser="selectUser"
              :calculateAge="calculateAge"
              :getGradeClass="getGradeClass"
              :hasTestResults="hasTestResults"
            />
          </div>
        </div>
        <div v-else-if="loading" class="spinner"></div>
        <div v-else>
          <p>No Reps found...</p>
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
const users = ref([]);
const sortBy = ref("");
const filterGrade = ref("");
const list = ref(true);

const notificationMessage = ref("");
const notificationType = ref("");

const loading = ref(false);

const selectedUser = ref({
  name: "",
  preferredName: "",
  dateOfBirth: null,
  email: "",
  password: "default_password",
  profilePicture: "",
  bio: "",
  contact: {
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  },
  shippingAddresses: [
    {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      isPrimary: false,
    },
  ],
  orders: [],
  cart: [
    {
      product: null,
      quantity: 1,
    },
  ],
  wishlist: [],
  recentlyViewedItems: [],
  paymentMethods: [
    {
      cardType: "",
      last4Digits: "",
      expirationDate: "",
      cardholderName: "",
      billingAddress: {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      },
    },
  ],
  accountSettings: {
    emailPreferences: {
      marketingEmails: true,
      offerEmails: true,
      transactionalEmails: true,
      newsletterEmails: true,
    },
    browserNotifications: {
      promotional: true,
      orderUpdates: true,
      newFeatures: true,
      personalizedRecommendations: true,
    },
    appPreferences: {
      theme: "light",
      language: "en",
      timeZone: "UTC",
    },
    dataPrivacy: {
      allowPersonalization: true,
      shareDataWithPartners: false,
    },
    notifications: {
      enableAllNotifications: true,
    },
  },
  role: "customer",
  enrolledCourses: [
    {
      course: null,
      currentTrainingIndex: 0,
      testResults: [
        {
          question: "",
          answer: "",
        },
      ],
      completionData: null,
    },
  ],
  grade: "Ungraded",
  onboardingStatus: "incomplete",
  adminDescription: "",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

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
  loading.value = true;
  try {
    const response = await $fetch("/api/users");
    users.value = response || [];
  } catch (error) {
    showNotification("Error fetching users: " + error.message, "error");
  } finally {
    loading.value = false;
  }
}

// In UserList.vue

const updateSort = (newSort) => {
  sortBy.value = newSort;
};

const updateFilter = (newFilter) => {
  filterGrade.value = newFilter;
};

const calculateAge = (dob) => {
  const diff = Date.now() - new Date(dob).getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age;
};

const getGradeClass = (grade) => {
  switch (grade) {
    case "Highly Promising":
      return "grade-highly-promising";
    case "Promising":
      return "grade-promising";
    case "Average":
      return "grade-average";
    case "Needs Improvement":
      return "grade-needs-improvement";
    case "Not Suitable":
      return "grade-not-suitable";
    case "Ungraded":
    default:
      return "grade-ungraded";
  }
};

const hasTestResults = (enrolledCourses) => {
  return enrolledCourses.some(
    (course) => course.testResults && course.testResults.length > 0
  );
};

const selectUser = (userId) => {
  selectedUser.value = users.value.find((user) => user._id == userId);
  list.value = false;
};

const sortedAndFilteredUsers = computed(() => {
  let filteredUsers = users.value.filter((user) => user.role !== "admin"); // Exclude admins

  if (filterGrade.value) {
    filteredUsers = filteredUsers.filter(
      (user) => user.grade === filterGrade.value
    );
  }

  if (sortBy.value === "age") {
    filteredUsers.sort(
      (a, b) => calculateAge(a.dateOfBirth) - calculateAge(b.dateOfBirth)
    );
  } else if (sortBy.value === "grade") {
    filteredUsers.sort(
      (a, b) => grades.indexOf(a.grade) - grades.indexOf(b.grade)
    );
  } else if (sortBy.value === "hasTestResults") {
    filteredUsers.sort(
      (a, b) =>
        hasTestResults(b.enrolledCourses) - hasTestResults(a.enrolledCourses)
    );
  }

  return filteredUsers;
});

async function updateUser() {
  console.log("selectedUser: " + JSON.stringify(selectedUser.value));
  try {
    if (selectedUser.value._id) {
      await $fetch(`/api/users/${selectedUser.value._id}`, {
        method: "PUT",
        body: selectedUser.value,
      });
      showNotification("User updated successfully", "success");
      getUsers();
    }
  } catch (error) {
    showNotification("Error updating user: " + error.message, "error");
  }
}

function showNotification(message, type = "info") {
  notificationMessage.value = message;
  notificationType.value = type;
}

function updateSelectedUser(updatedUser) {
  selectedUser.value = updatedUser;
}
</script>
  
    
    <style scoped>
h2 {
  margin-bottom: 2rem;
}

.user-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow-x: auto;
}

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

.user-list-labels {
  display: grid;
  grid-template-columns: 80px 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 2px solid #ccc;
  font-weight: bold;
}

.user-list-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.spinner {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: black;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
    