<template>
  <div>
    <!-- Conditionally render layout based on route -->
    <NuxtLayout v-if="!isPortalRoute">
      <!-- Page content with transition -->
      <transition name="fade" mode="out-in">
        <div class="page-wrapper">
          <NuxtPage @hide-loading="hideLoadingScreen" />
        </div>
      </transition>

      <!-- Loading popup controlled by isLoading -->
      <div v-if="isLoading" class="loading-popup">
        <div class="loading-spinner"></div>
        <p>Loading, please wait...</p>
      </div>
    </NuxtLayout>

    <!-- If route is /portal, render just the page content without the layout -->
    <div v-else>
      <transition name="fade" mode="out-in">
        <div class="page-wrapper">
          <NuxtPage @hide-loading="hideLoadingScreen" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import { useRouter, useRoute } from "vue-router";

const isLoading = ref(false);
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

onMounted(async () => {
  if (userStore.user) {
    try {
      const response = await $fetch(`/api/users/${userStore.user._id}`);
      userStore.setUser(response);
    } catch (e) {
      console.error("Failed to fetch user data on page load (app.vue): ", e);
    }
  }
});

// Function to show the loading screen
function showLoadingScreen() {
  isLoading.value = true;
}

// Function to hide the loading screen, can be triggered from any page
function hideLoadingScreen() {
  isLoading.value = false;
}

// Provide the showLoadingScreen function so that child components (pages) can use it
provide("showLoadingScreen", showLoadingScreen);

// Check if the current route is '/portal'
const isPortalRoute = computed(
  () => route.path !== "/" && route.path !== "/apply" && route.path !== "/Blog"
);

// Handle route changes to initially show the loading screen
router.beforeEach((to, from, next) => {
  showLoadingScreen();
  next();
});

// Set the lang attribute of the HTML tag to English
useHead({
  link: [{ rel: "icon", type: "image/x-icon", href: "/Logos/NexgenLogo.webp" }],
  htmlAttrs: {
    lang: "en", // Change 'en' to your desired language code
  },
});
</script>

<style scoped media="screen">
#app {
  scroll-behavior: smooth;
  background-color: #f0f2f5;
  font-family: Montserrat, sans-serif, "HelveticaNeue-Light",
    "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande",
    sans-serif;
  position: static;
}

/* Wrapper to ensure transition works correctly */
.page-wrapper {
  width: 100%;
  height: 100%;
}

/* Loading popup styling */
.loading-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 20;
  flex-direction: column;
  transition: opacity 0.5s ease;
  opacity: 1;
}

.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid white;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Fade transition styling */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Additional global styles */
.login-container {
  /* font-family: "Montserrat", sans-serif; */
  font-weight: bold;
  max-width: 300px;
  margin: 200px auto;
  padding: 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

form button {
  width: 100%;
  height: 2rem;
  /* font-family: "Montserrat", sans-serif; */
  font-weight: bold;
}
</style>
  
  <style>
@import "./css/ButtonStyles/ContactBannerButton.css";
@import "./css/Transitions/Fade.css";
@import "./css/Transitions/Slide.css";

*,
html {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Montserrat, sans-serif, "HelveticaNeue-Light",
    "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande",
    sans-serif;
}

body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

a:visited,
a:link,
a:focus,
a:active {
  outline: none;
  text-decoration: none;
  background: none;
  color: inherit;
  box-shadow: none;
  -webkit-tap-highlight-color: transparent; /* Removes tap highlight color in mobile browsers */
}

p {
  line-height: 1.5;
}
</style>
  