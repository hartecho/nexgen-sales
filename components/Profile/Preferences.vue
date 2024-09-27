<template>
  <div class="wrapper">
    <!-- Notification Popup -->
    <SubcomponentsNotificationPopup
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
    />

    <!-- Profile Image and Edit Section -->
    <div class="top-image-banner">
      <div class="profile-image-wrapper" @click="triggerFileInput">
        <img
          class="profile-image"
          :src="
            userStore.user.profilePicture || 'https://via.placeholder.com/150'
          "
          alt="Profile Image"
        />
        <div class="edit-icon">
          <img src="/Support.webp" alt="Edit Icon" />
        </div>
        <!-- Hidden file input for selecting images -->
        <input
          type="file"
          ref="fileInput"
          class="file-input"
          @change="uploadImage"
          accept="image/*"
        />
      </div>
    </div>

    <!-- Manage Your Account Banner -->
    <div class="manage-account-banner">
      <p>Manage Your Account</p>
    </div>

    <!-- Manage Your Account Fields (Two Columns) -->
    <div class="account-section">
      <div class="input-grid two-columns">
        <!-- Email Field (grayed out) -->
        <div class="input-field">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            :value="userStore.user.email"
            disabled
            class="disabled-field"
          />
        </div>

        <!-- Password Update Fields -->
        <div class="input-field">
          <label for="new-password">New Password</label>
          <input type="password" id="new-password" v-model="password" />
        </div>
        <div class="input-field">
          <label for="confirm-password">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
          />
        </div>
      </div>
      <button class="confirm-button" @click="saveAccountChanges">
        Confirm Changes
      </button>
    </div>

    <!-- Personal Section Banner -->
    <div class="section-banner">
      <p>Personal</p>
    </div>

    <!-- Personal Fields (Three Columns) -->
    <div class="personal-section">
      <div class="input-grid three-columns">
        <div class="input-field">
          <label for="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            v-model="userStore.user.firstName"
          />
        </div>
        <div class="input-field">
          <label for="middle-name">Middle Name</label>
          <input
            type="text"
            id="middle-name"
            v-model="userStore.user.middleName"
          />
        </div>
        <div class="input-field">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" v-model="userStore.user.lastName" />
        </div>
        <div class="input-field">
          <label for="preferred-name">Preferred Name</label>
          <input
            type="text"
            id="preferred-name"
            v-model="userStore.user.preferredName"
          />
        </div>
        <div class="input-field">
          <label for="dob">Date of Birth</label>
          <input type="date" id="dob" v-model="userStore.user.dateOfBirth" />
        </div>
      </div>
      <button class="confirm-button" @click="savePersonalChanges">
        Confirm Changes
      </button>
    </div>

    <!-- Contact Section Banner -->
    <div class="section-banner">
      <p>Contact</p>
    </div>

    <!-- Contact Fields (Three Columns) -->
    <div class="contact-section">
      <div class="input-grid three-columns">
        <div class="input-field">
          <label for="phone-number">Phone Number</label>
          <input
            type="tel"
            id="phone-number"
            v-model="userStore.user.phoneNumber"
          />
        </div>
        <div class="input-field">
          <label for="address">Address</label>
          <input type="text" id="address" v-model="userStore.user.address" />
        </div>
        <div class="input-field">
          <label for="city">City</label>
          <input type="text" id="city" v-model="userStore.user.city" />
        </div>
        <div class="input-field">
          <label for="state">State</label>
          <input type="text" id="state" v-model="userStore.user.state" />
        </div>
        <div class="input-field">
          <label for="zip-code">Zip Code</label>
          <input type="text" id="zip-code" v-model="userStore.user.zipCode" />
        </div>
      </div>
      <button class="confirm-button" @click="saveContactChanges">
        Confirm Changes
      </button>
    </div>
  </div>
</template>
    
    <script setup>
const userStore = useUserStore();
const fileInput = ref(null);
const password = ref("");
const confirmPassword = ref("");
const notificationMessage = ref("");
const notificationType = ref("info");

// Trigger the hidden file input
const triggerFileInput = () => {
  fileInput.value.click();
};

// Upload the image to S3 via the API route
// Upload the image to S3 via the API route and delete the old image if successful
const uploadImage = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Get the current profile picture to delete it later if upload is successful
  const oldProfilePicture = userStore.user.profilePicture;

  try {
    const formData = new FormData();
    formData.append("file", file);

    // Upload the new image to S3
    const response = await $fetch("/api/aws/upload", {
      method: "POST",
      body: formData,
    });

    if (response?.url) {
      const newImageUrl = response.url;

      // Update the user profile with the new image
      try {
        const userResponse = await $fetch(`/api/users/${userStore.user._id}`, {
          method: "PUT",
          body: { profilePicture: newImageUrl },
        });

        // Set the updated user information in the store
        userStore.setUser(userResponse);

        // If the user had an old profile picture, delete it
        if (oldProfilePicture) {
          try {
            const oldKey = oldProfilePicture.split("/").pop(); // Extract the key from the URL
            await $fetch("/api/aws/upload", {
              method: "DELETE",
              body: { key: oldKey }, // Send the key of the old image
            });
            console.log(
              `Old profile picture (${oldKey}) deleted successfully.`
            );
          } catch (deleteError) {
            console.error(
              `Failed to delete old profile picture: ${deleteError.message}`
            );
            showNotification(
              "New profile image uploaded, but failed to delete the old one.",
              "warning"
            );
          }
        }

        showNotification("Profile image updated successfully!", "success");
      } catch (updateError) {
        console.error(
          "Error updating user profile image: " + updateError.message
        );
        showNotification("Error updating user profile image.", "error");
      }
    }
  } catch (uploadError) {
    console.error("Failed to upload image: " + uploadError.message);
    showNotification("Failed to upload image.", "error");
  }
};

// Save Account Changes
const saveAccountChanges = async () => {
  // Save account (password) changes here
  if (password.value == confirmPassword.value) {
    try {
      const userResponse = await $fetch(`/api/users/${userStore.user._id}`, {
        method: "PUT",
        body: { password: password.value },
      });
      userStore.setUser(userResponse);
      showNotification("Account changes saved successfully!", "success");
    } catch (error) {
      showNotification("Error updating account changes.", "error");
    }
  } else {
    showNotification("Passwords don't match", "success");
  }
};

// Save Personal Changes
const savePersonalChanges = async () => {
  // Save personal details here
  showNotification("Personal details updated successfully!", "success");
};

// Save Contact Changes
const saveContactChanges = async () => {
  // Save contact details here
  showNotification("Contact details updated successfully!", "success");
};

// Show Notification
const showNotification = (message, type) => {
  notificationMessage.value = message;
  notificationType.value = type;
};
</script>
    
    <style scoped>
.wrapper {
  position: relative;
}

/* Profile Image Section */
.top-image-banner {
  width: 100%;
  height: 20rem;
  background: rgba(1, 151, 178, 1);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image-wrapper {
  position: relative;
  cursor: pointer;
  width: 12rem !important; /* Ensure it's a square */
  height: 12rem !important; /* Ensure it's a square */
  transition: transform 0.3s ease-in-out;
  overflow: hidden; /* To ensure no overflow distorts the layout */
  aspect-ratio: 1 / 1; /* Enforce a 1:1 aspect ratio */
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image-wrapper:hover {
  transform: scale(1.05);
}

.profile-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
  transition: border-color 0.3s ease-in-out;
}

.profile-image-wrapper:hover .profile-image {
  border-color: rgba(255, 255, 255, 0.8);
}

.edit-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: white;
  border-radius: 50%;
  padding: 0.4rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-in-out;
}

.edit-icon img {
  width: 1rem;
  height: 1rem;
}

.file-input {
  display: none;
}

/* Banner Styles */
.manage-account-banner,
.section-banner {
  background-color: black;
  color: white;
  text-align: left;
  padding: 0.5rem 1rem;
  font-weight: bold;
  /* margin-top: 1rem; */
}

/* Input Section Styles */
.account-section,
.personal-section,
.contact-section {
  padding: 1rem;
}

/* Two Column Grid for Manage Account Section */
.input-grid.two-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

/* Three Column Grid for Personal and Contact Sections */
.input-grid.three-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.input-field {
  margin-bottom: 1rem;
}

.input-field label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.input-field input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.disabled-field {
  background-color: #f0f0f0;
  color: #aaa;
  pointer-events: none;
}

/* Confirm Button Styles */
.confirm-button {
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.confirm-button:hover {
  background-color: #45a049;
}
</style>
    