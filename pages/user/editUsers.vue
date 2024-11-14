<template>
  <div class="wrapper">
    <h1>Add/Update User</h1>
    <div class="content">
      <!-- Sidebar for Selecting Users -->
      <UserEditUserSidebar :users="users" @userSelected="selectUser" />

      <!-- Main Content for User Details and Actions -->
      <div class="user-details">
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

        <!-- Action Buttons -->
        <UserEditUserActionButtons
          :user="selectedUser"
          @add-user="addUser"
          @update-user="updateUser"
          @delete-user="deleteUser"
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

const users = ref([]);
const selectedUser = ref({
  name: "",
  preferredName: "",
  dateOfBirth: null,
  email: "",
  password: "lakshop8208ydgfu839yWOUGDFasd08y23089yqwe",
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
    { street: "", city: "", state: "", zip: "", country: "", isPrimary: false },
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
      billingAddress: { street: "", city: "", state: "", zip: "", country: "" },
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
  enrolledCourses: [
    {
      course: null,
      currentTrainingIndex: 0,
      testResults: [{ question: "", answer: "" }],
    },
  ],
  grade: "Ungraded",
  adminDescription: "",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

const notificationMessage = ref("");
const notificationType = ref("info");

onMounted(async () => {
  await getUsers();
});

function selectUser(userId) {
  const foundUser = users.value.find((u) => u._id === userId);
  if (foundUser) {
    selectedUser.value = { ...foundUser };
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

async function addUser() {
  /*...*/
}
async function updateUser() {
  /*...*/
}
async function deleteUser() {
  /*...*/
}

function showNotification(message, type = "info") {
  notificationMessage.value = message;
  notificationType.value = type;
  setTimeout(() => {
    notificationMessage.value = null;
  }, 5000);
}

function updateSelectedUser(updatedUser) {
  selectedUser.value = updatedUser;
}
</script>

<style scoped>
.wrapper {
  display: flex;
  font-family: "Roboto", sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 2rem;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  font-weight: 700;
  margin-bottom: 1rem;
}

.content {
  display: flex;
  gap: 2rem;
  width: 100%;
}

.user-details {
  flex: 1;
  width: 100%;
}

.section {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
