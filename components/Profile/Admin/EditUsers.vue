<template>
  <div class="user-management-wrapper">
    <!-- Sidebar for managing users -->
    <div>
      <UserEditUserSelectUser :users="users" @userSelected="selectUser" />
      <!-- Action Buttons -->
      <UserEditUserActionButtons
        :user="selectedUser"
        @add-user="addUser"
        @update-user="updateUser"
        @delete-user="deleteUser"
      />
    </div>

    <!-- Main content for user details and actions -->
    <div class="user-details" v-if="selectedUser">
      <h1>Add/Update User</h1>
      <div class="content">
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
      </div>
    </div>

    <!-- Notification Popup -->
    <SubcomponentsNotificationPopup
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
      @close-popup="notificationMessage = null"
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
  setTimeout(() => {
    notificationMessage.value = null;
  }, 5000);
}

// Update selected user
function updateSelectedUser(updatedUser) {
  selectedUser.value = updatedUser;
}
</script>
  
<style scoped>
.user-management-wrapper {
  display: flex;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
  background-color: #f5f5f5;
}

.sidebar h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #333;
}

.user-details {
  flex: 1;
  /* margin-left: 300px; */
  padding: 2rem;
  width: 100%;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: 700;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.section {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

  