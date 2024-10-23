<template>
  <div class="wrapper">
    <h1>Add/Update User</h1>

    <div class="content">
      <!-- Select User -->
      <UserEditUserSelectUser :users="users" @userSelected="selectUser" />

      <!-- General Information -->
      <UserEditUserGeneralInfo
        :selectedUser="selectedUser"
        @updateUser="updateSelectedUser($event)"
      />

      <!-- Manage Shipping Addresses -->
      <UserEditUserShippingAddresses
        :selectedUser="selectedUser"
        @updateUser="updateSelectedUser($event)"
      />

      <!-- Manage Payment Methods -->
      <UserEditUserPaymentMethods
        :selectedUser="selectedUser"
        @updateUser="updateSelectedUser($event)"
      />

      <!-- Manage Cart -->
      <UserEditUserCart
        :selectedUser="selectedUser"
        @updateUser="updateSelectedUser($event)"
      />

      <!-- Manage Orders -->
      <UserEditUserOrders
        :selectedUser="selectedUser"
        @updateUser="updateSelectedUser($event)"
      />

      <!-- Manage Wishlist -->
      <UserEditUserWishlist
        :selectedUser="selectedUser"
        @updateUser="updateSelectedUser($event)"
      />

      <!-- Manage Recently Viewed Items -->
      <UserEditUserRecentlyViewed
        :selectedUser="selectedUser"
        @updateUser="updateSelectedUser($event)"
      />

      <!-- Manage Enrolled Courses -->
      <UserEditUserEnrolledCourses
        :selectedUser="selectedUser"
        @updateUser="updateSelectedUser($event)"
      />

      <!-- Manage Enrolled Courses -->
      <UserEditUserPreferences
        :selectedUser="selectedUser"
        @updateUser="updateSelectedUser($event)"
      />

      <!-- Action Buttons -->
      <UserEditUserActionButtons
        :user="selectedUser"
        @add-user="addUser"
        @update-user="updateUser"
        @delete-user="deleteUser"
      />
    </div>

    <!-- Notification Popup -->
    <SubcomponentsNotificationPopup
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// State management
const users = ref([]);
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

// Notification state
const notificationMessage = ref("");
const notificationType = ref("info");

// Fetch users on mount
onMounted(async () => {
  await getUsers();
});

// Load selected user
function selectUser(userId) {
  const foundUser = users.value.find((u) => u._id === userId);
  if (foundUser) {
    selectedUser.value = { ...foundUser };
  }
}

// Fetch users
async function getUsers() {
  try {
    const response = await $fetch("/api/users");
    users.value = response || [];
  } catch (error) {
    showNotification("Error fetching users: " + error.message, "error");
  }
}

// Add user
async function addUser() {
  try {
    await $fetch("/api/users", {
      method: "POST",
      body: selectedUser.value,
    });
    showNotification("User added successfully", "success");
    getUsers();
  } catch (error) {
    showNotification("Error adding user: " + error.message, "error");
  }
}

// Update user
async function updateUser() {
  try {
    if (selectedUser.value._id) {
      console.log("selected user role: " + selectedUser.value.role);
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

// Delete user
async function deleteUser() {
  if (!selectedUser.value) {
    showNotification("Please select a user to delete", "error");
    return;
  }

  try {
    await $fetch(`/api/users/${selectedUser.value._id}`, {
      method: "DELETE",
    });
    showNotification("User deleted successfully", "success");
    getUsers();
  } catch (error) {
    showNotification("Error deleting user: " + error.message, "error");
  }
}

// Show notification
function showNotification(message, type = "info") {
  notificationMessage.value = message;
  notificationType.value = type;
}

// Update selected user
function updateSelectedUser(updatedUser) {
  selectedUser.value = updatedUser;
}
</script>

<style scoped>
.wrapper {
  padding: 2rem;
  width: 100%;
  margin: 0;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
  background-color: #f5f5f5;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: 700;
}

h2 {
  margin-bottom: 1rem;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
}

.section {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.section h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.action-buttons {
  text-align: center;
}
</style>
