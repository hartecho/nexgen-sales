<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        @focus="showList = true"
        @blur="hideList"
        @input="filterList"
        placeholder="What can we help you find today?"
      />
      <button>
        <img src="/search.webp" alt="Search" />
      </button>
    </div>

    <transition name="dropdown">
      <ul
        v-if="
          !loading && searchQuery.length > 0 && filteredItems.length && showList
        "
        class="dropdown-list"
      >
        <li
          v-for="item in filteredItems"
          :key="item._id"
          class="dropdown-item"
          @mousedown.prevent="goToItemPage(item._id)"
        >
          <img
            :src="getItemImagePath(item.image)"
            alt="Item Image"
            class="item-image"
          />
          <div class="item-info">
            <h3>
              <span
                v-for="(part, index) in splitText(item.name)"
                :key="index"
                :class="{ highlight: part.match }"
              >
                {{ part.text }}
              </span>
            </h3>
            <p class="item-price">${{ item.price.toFixed(2) }}</p>
          </div>
        </li>
      </ul>
      <div v-else-if="loading" class="loading-spinner">
        <div class="spinner"></div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useItemStore } from "~/stores/itemStore"; // Assuming you have an item store

const searchQuery = ref("");
const showList = ref(false);
const loading = ref(true); // Loading state
const router = useRouter();

const store = useItemStore();

// Function to fetch and set data in the store
async function fetchDataAndCache() {
  if (
    !store.lastFetchTime ||
    Date.now() - store.lastFetchTime >= store.CACHE_DURATION
  ) {
    try {
      const items = await $fetch("/api/items");
      store.setItems(items);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
  loading.value = false; // Set loading to false once data is fetched
}

onMounted(async () => {
  await fetchDataAndCache();
  // console.log("All items: " + allItems);
});

// Combine all items into a single list
const allItems = computed(() => store.allItems);

// Filter items based on the search query by item.name only
const filteredItems = computed(() => {
  if (!searchQuery.value) return [];
  const query = searchQuery.value.toLowerCase();

  return allItems.value.filter((item) =>
    item.name?.toLowerCase().includes(query)
  );
});

// Utility functions for the UI
function filterList() {
  showList.value = true;
}

function hideList() {
  setTimeout(() => {
    showList.value = false;
  }, 200); // Slight delay to prevent dropdown from disappearing too quickly
}

function goToItemPage(itemId) {
  router.push(`/item/${itemId}`);
}

function splitText(text) {
  const query = searchQuery.value.toLowerCase();
  if (!text || typeof text !== "string") return [{ text: "", match: false }];

  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part) => ({
    text: part,
    match: part.toLowerCase() === query,
  }));
}

function getItemImagePath(fileName) {
  return "/ItemPics/" + fileName;
}
</script>

<style scoped>
/* Keep the original search bar styling */
.search-bar-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  overflow: hidden;
  height: 35px;
  flex-grow: 1;
  margin: 0 20px;
}

.search-bar input {
  border: none;
  padding: 0 10px;
  height: 100%;
  font-size: 16px;
  outline: none;
  width: 100%;
}

.search-bar button {
  background-color: #ff8000;
  border: none;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-bar button img {
  height: 20px;
  width: auto;
}

/* Dropdown styling */
.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(30, 30, 30, 0.9);
  border: 1px solid #ccc;
  /* border-radius: 10px; */
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  font-size: 14px;
  color: white;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 5px;
}

.item-info {
  flex: 1;
  text-align: left;
}

.item-info h3 {
  margin: 0;
  font-size: 16px;
  color: #fff;
}

.item-price {
  font-size: 14px;
  color: #ddd;
}

.highlight {
  background-color: darkcyan;
  color: white;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: white;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 480px) {
  .search-bar input {
    font-size: 12px;
  }

  .dropdown-item {
    align-items: flex-start;
  }

  .item-image {
    margin-top: 5px;
  }
}
</style>
