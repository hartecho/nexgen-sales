<template>
  <div class="wrapper">
    <div class="hero">
      <h2>Add/Update User</h2>
    </div>

    <div class="user-management-wrapper">
      <!-- Hero Section -->

      <!-- Sidebar for managing users -->
      <div class="left">
        <UserEditUserSelectUser :users="users" @userSelected="selectUser" />
        <!-- Action Buttons -->
        <UserEditUserActionButtons
          :user="selectedUser"
          @add-user="showAddUserModal"
          @update-user="updateUser"
          @delete-user="deleteUser"
        />
      </div>

      <!-- Main content for user details and actions -->
      <div class="user-details" v-if="selectedUser">
        <!-- General Information -->
        <UserEditUserGeneralInfo
          :selectedUser="selectedUser"
          @updateUser="handleUnsavedChanges($event)"
        />

        <!-- Manage Shipping Addresses -->
        <UserEditUserShippingAddresses
          :selectedUser="selectedUser"
          @updateUser="handleUnsavedChanges($event)"
        />

        <!-- Manage Payment Methods -->
        <UserEditUserPaymentMethods
          :selectedUser="selectedUser"
          @updateUser="handleUnsavedChanges($event)"
        />

        <!-- Manage Cart -->
        <UserEditUserCart
          :selectedUser="selectedUser"
          @updateUser="handleUnsavedChanges($event)"
        />

        <!-- Manage Orders -->
        <UserEditUserOrders
          :selectedUser="selectedUser"
          @updateUser="handleUnsavedChanges($event)"
        />

        <!-- Manage Wishlist -->
        <UserEditUserWishlist
          :selectedUser="selectedUser"
          @updateUser="handleUnsavedChanges($event)"
        />

        <!-- Manage Recently Viewed Items -->
        <UserEditUserRecentlyViewed
          :selectedUser="selectedUser"
          @updateUser="handleUnsavedChanges($event)"
        />

        <!-- Manage Enrolled Courses -->
        <UserEditUserEnrolledCourses
          :selectedUser="selectedUser"
          @updateUser="handleUnsavedChanges($event)"
        />
      </div>

      <!-- Unsaved Changes Popup -->
      <div v-if="hasUnsavedChanges" class="unsaved-changes-popup">
        <img src="/Graphics/Alert.webp" alt="Alert Icon" class="popup-icon" />
        <div class="popup-content">
          <p class="popup-message">You have unsaved changes.</p>
          <button class="popup-save-button" @click="updateUser">
            Save Changes
          </button>
        </div>
      </div>

      <UserEditUserAddUserModal
        :visible="showModal"
        @close="closeModal"
        @add-user="addUser"
      />

      <!-- Notification Popup -->
      <SubcomponentsNotificationPopup
        v-if="notificationMessage"
        :message="notificationMessage"
        :type="notificationType"
        @close-popup="notificationMessage = null"
      />
    </div>
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
const hasUnsavedChanges = ref(false);
const notificationMessage = ref("");
const notificationType = ref("info");
const showModal = ref(false);

onMounted(async () => {
  await getUsers();
});

function selectUser(userId) {
  const foundUser = users.value.find((u) => u._id === userId);
  if (foundUser) {
    selectedUser.value = { ...foundUser };
    hasUnsavedChanges.value = false; // Reset unsaved changes flag when a user is selected
  }
}

async function getUsers() {
  try {
    const response = await $fetch("/api/users");
    users.value = response || [];
  } catch (error) {
    showNotification("Error fetching users: " + error.message, "error");
  }
}

async function addUser(newUserData) {
  try {
    await $fetch("/api/users", {
      method: "POST",
      body: {
        ...newUserData,
        ...getDefaultUserFields(),
      },
    });
    showNotification("User added successfully", "success");
    getUsers();
  } catch (error) {
    showNotification("Error adding user: " + error.message, "error");
  }
}

function getDefaultUserFields() {
  return {
    preferredName: "",
    dateOfBirth: null,
    profilePicture: "",
    bio: "",
    contact: { phone: "", street: "", city: "", state: "", zip: "" },
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
    cart: [{ product: null, quantity: 1 }],
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
      appPreferences: { theme: "light", language: "en", timeZone: "UTC" },
      dataPrivacy: { allowPersonalization: true, shareDataWithPartners: false },
      notifications: { enableAllNotifications: true },
    },
    role: "customer",
    enrolledCourses: [],
    grade: "Ungraded",
    adminDescription: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// Show modal
function showAddUserModal() {
  showModal.value = true;
}

// Close modal
function closeModal() {
  showModal.value = false;
}

async function updateUser() {
  try {
    if (selectedUser.value._id) {
      await $fetch(`/api/users/${selectedUser.value._id}`, {
        method: "PUT",
        body: selectedUser.value,
      });
      showNotification("User updated successfully", "success");
      getUsers();
      hasUnsavedChanges.value = false; // Reset unsaved changes flag after successful save
    }
  } catch (error) {
    showNotification("Error updating user: " + error.message, "error");
  }
}

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
    hasUnsavedChanges.value = false;
  } catch (error) {
    showNotification("Error deleting user: " + error.message, "error");
  }
}

function showNotification(message, type = "info") {
  notificationMessage.value = message;
  notificationType.value = type;
  setTimeout(() => {
    notificationMessage.value = null;
  }, 5000);
}

// Track unsaved changes
function handleUnsavedChanges(updatedUser) {
  selectedUser.value = updatedUser;
  hasUnsavedChanges.value = true;
}
</script>

<style scoped>
.wrapper {
  max-width: 100vw;
}

.user-management-wrapper {
  display: flex;
  min-height: 100vh;
  max-width: 100%;
  font-family: "Roboto", sans-serif;
  background-color: #f5f5f5;
}

.left {
  max-width: 100%;
}

.hero {
  width: 100%;
  text-align: left;
  border-bottom: 1px solid #ddd;
  background-color: #f7f7f7;
  padding: 0.75rem 10px;
  color: white;
  background: black;
}

.hero h2 {
  margin: 0;
  color: white;
  font-size: 18px;
}

.unsaved-changes-popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
  gap: 1rem;
  z-index: 1000;
  max-width: 320px;
}

.popup-icon {
  width: 32px;
  height: 32px;
}

.popup-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.popup-message {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}

.popup-save-button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.popup-save-button:hover {
  background-color: #0056b3;
}

.user-details {
  width: 100%;
  padding: 2rem;
  max-width: 100%; /* Allows .user-details to fully utilize the available space */
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: 700;
}

/* Media query for tablets and smaller screens */
@media (max-width: 1160px) {
  .user-management-wrapper {
    flex-direction: column;
    /* padding: 1rem; */
  }

  .user-details {
    padding: 1rem; /* Reduce padding for medium screens */
    max-width: 100%;
  }

  .unsaved-changes-popup {
    bottom: 10px;
    right: 10px;
    max-width: 90%;
  }
}

/* Media query for mobile devices */
@media (max-width: 768px) {
  .user-management-wrapper {
    padding: 0.5rem;
  }

  .user-details {
    padding: 0.5rem; /* Reduce padding further for smaller screens */
    max-width: 100%; /* Ensure it takes full width of the container */
    width: 100%; /* Overrides any inherited max-width */
  }

  .unsaved-changes-popup {
    flex-direction: column;
    align-items: center;
    bottom: 10px;
    right: 10px;
    max-width: 100%;
    padding: 1rem;
  }

  .popup-content {
    align-items: center;
    text-align: center;
  }

  .popup-icon {
    width: 24px;
    height: 24px;
  }

  .popup-message {
    font-size: 0.9rem;
  }

  .popup-save-button {
    width: 100%;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}

/* Media query for small mobile screens */
@media (max-width: 480px) {
  .content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .popup-message {
    font-size: 0.8rem;
  }

  .user-details {
    padding: 0.5rem;
    width: 100%;
    max-width: 100%;
  }

  .popup-save-button {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }
}
</style>