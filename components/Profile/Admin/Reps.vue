<template>
  <div class="wrapper">
    <transition name="fade" mode="out-in">
      <div v-if="list" class="user-list">
        <h2>User List</h2>

        <!-- Filter Section -->
        <div class="filters">
          <label for="sortBy">Sort By:</label>
          <select id="sortBy" v-model="sortBy">
            <option value="">None</option>
            <option value="age">Age</option>
            <option value="grade">Grade</option>
            <option value="hasTestResults">Has Test Results</option>
          </select>

          <label for="filterByGrade">Filter by Grade:</label>
          <select id="filterByGrade" v-model="filterGrade">
            <option value="">All Grades</option>
            <option v-for="grade in grades" :key="grade" :value="grade">
              {{ grade }}
            </option>
          </select>
        </div>

        <!-- User List Labels -->
        <div class="user-list-labels">
          <span class="label">Profile Picture</span>
          <span class="label">Name</span>
          <span class="label">Age</span>
          <span class="label">Grade</span>
          <span class="label">Test Results</span>
        </div>

        <!-- User List Section -->
        <div v-if="sortedAndFilteredUsers.length" class="user-list-container">
          <div
            v-for="user in sortedAndFilteredUsers"
            :key="user._id"
            class="user-card"
            @click="selectUser(user._id)"
          >
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
        </div>
        <div v-else>
          <p>No users found.</p>
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
import { useRouter } from "vue-router"; // Import the router

const users = ref([]);
const sortBy = ref("");
const filterGrade = ref("");
const list = ref(true);

const notificationMessage = ref("");
const notificationType = ref("info");

const selectedUser = ref({
  name: "",
  preferredName: "",
  dateOfBirth: null, // Ensure this is null initially
  email: "",
  password: "lakshop8208ydgfu839yWOUGDFasd08y23089yqwe", // Default password
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
      product: null, // This will store the ObjectId reference to the 'Item' model
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
      theme: "light", // Default to "light" theme
      language: "en", // Default to "en" (English)
      timeZone: "UTC", // Default timezone
    },
    dataPrivacy: {
      allowPersonalization: true,
      shareDataWithPartners: false,
    },
    notifications: {
      enableAllNotifications: true,
    },
  },
  role: "customer", // Default role is customer
  enrolledCourses: [
    {
      course: null, // This will store the ObjectId reference to the 'Course' model
      currentTrainingIndex: 0,
      testResults: [
        {
          question: "",
          answer: "",
        },
      ],
    },
  ],
  grade: "Ungraded", // Default value for new users
  adminDescription: "", // Admin feedback about the user's potential
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

// Fetch users on mount
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

// Calculate age based on date of birth
const calculateAge = (dob) => {
  const diff = Date.now() - new Date(dob).getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age;
};

// Get grade class to apply color
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
  const courseWithTestResults = enrolledCourses.find(
    (course) => course.testResults && course.testResults.length > 0
  );
  return courseWithTestResults ? true : false;
};

// Function to navigate to the user's page
const selectUser = (userId) => {
  selectedUser.value = users.value.find((user) => user._id == userId);
  list.value = false;
};

// Computed property to filter and sort users
const sortedAndFilteredUsers = computed(() => {
  let filteredUsers = users.value;

  // Filter by grade
  if (filterGrade.value) {
    filteredUsers = filteredUsers.filter(
      (user) => user.grade === filterGrade.value
    );
  }

  // Sort users based on selected option
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

// Update user
async function updateUser() {
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
  console.log("selected user grade: " + selectedUser.value.grade);
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
  