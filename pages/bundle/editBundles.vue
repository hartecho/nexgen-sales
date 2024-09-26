<template>
  <div class="wrapper">
    <h1>Add/Update Bundle</h1>

    <div class="content">
      <!-- Select Bundle -->
      <EcommerceEditBundlesSelectBundle
        :bundles="bundles"
        @bundleSelected="selectBundle"
      />

      <!-- General Information -->
      <EcommerceEditBundlesGeneralInfo
        :selectedBundle="selectedBundle"
        @updateBundle="updateSelectedBundle($event)"
      />

      <!-- Bundled Products -->
      <EcommerceEditBundlesBundledProducts
        :selectedBundle="selectedBundle"
        :items="items"
        @updateBundle="updateSelectedBundle($event)"
      />

      <!-- Action Buttons -->
      <EcommerceEditBundlesActionButtons
        :bundle="selectedBundle"
        @add-bundle="addBundle"
        @update-bundle="updateBundle"
        @delete-bundle="deleteBundle"
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
const bundles = ref([]);
const items = ref([]);
const selectedBundle = ref({
  name: "",
  items: [],
  price: 0,
  discountPercentage: 0,
  stock: 0,
  description: "",
});

// Notification state
const notificationMessage = ref("");
const notificationType = ref("info");

// Fetch bundles and items on mount
onMounted(async () => {
  await getBundles();
  await getItems();
});

// Load selected bundle
function selectBundle(bundleId) {
  const foundBundle = bundles.value.find((b) => b._id === bundleId);
  if (foundBundle) {
    selectedBundle.value = { ...foundBundle };
  }
}

// Fetch bundles
async function getBundles() {
  try {
    const response = await $fetch("/api/bundles");
    // console.log("response: " + JSON.stringify(response));
    bundles.value = response || [];
  } catch (error) {
    showNotification("Error fetching bundles: " + error.message, "error");
  }
}

// Fetch items
async function getItems() {
  try {
    const response = await $fetch("/api/items");
    items.value = response || [];
  } catch (error) {
    showNotification("Error fetching items: " + error.message, "error");
  }
}

// Add bundle
async function addBundle() {
  // console.log("Bundle trying to add: " + JSON.stringify(selectedBundle.value));
  try {
    await $fetch("/api/bundles", {
      method: "POST",
      body: selectedBundle.value,
    });
    showNotification("Bundle added successfully", "success");
    getBundles();
  } catch (error) {
    showNotification("Error adding bundle: " + error.message, "error");
  }
}

// Update bundle
async function updateBundle() {
  try {
    if (selectedBundle.value._id) {
      await $fetch(`/api/bundles/${selectedBundle.value._id}`, {
        method: "PUT",
        body: selectedBundle.value,
      });
      showNotification("Bundle updated successfully", "success");
      getBundles();
    }
  } catch (error) {
    showNotification("Error updating bundle: " + error.message, "error");
  }
}

// Delete bundle
async function deleteBundle() {
  if (!selectedBundle.value) {
    showNotification("Please select a bundle to delete", "error");
    return;
  }

  try {
    await $fetch(`/api/bundles/${selectedBundle.value._id}`, {
      method: "DELETE",
    });
    showNotification("Bundle deleted successfully", "success");
    getBundles();
  } catch (error) {
    showNotification("Error deleting bundle: " + error.message, "error");
  }
}

// Show notification
function showNotification(message, type = "info") {
  notificationMessage.value = message;
  notificationType.value = type;
}

// Update selected bundle
function updateSelectedBundle(updatedBundle) {
  selectedBundle.value = updatedBundle;
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
