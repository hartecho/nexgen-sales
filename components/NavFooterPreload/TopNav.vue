<template>
  <div>
    <!-- Import the Banner Component -->
    <!-- <NavFooterPreloadTopBanner /> -->

    <!-- Top Navigation Section -->
    <div class="top-nav">
      <div class="top-nav-content">
        <!-- Brand logo -->
        <NavFooterPreloadNavLogo />

        <!-- Desktop Navigation Links (Hidden on Mobile) -->
        <div class="desktop-nav">
          <NavFooterPreloadNavLinks />
        </div>

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-button" @click="toggleMobileNav">
          <img src="/Graphics/NavBars.svg" alt="Menu" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Overlay -->
    <div
      :class="['mobile-nav-overlay', { 'is-visible': showMobileNav }]"
      @click.self="toggleMobileNav"
    >
      <div class="mobile-nav-content">
        <button class="close-button" @click="toggleMobileNav">×</button>
        <NavFooterPreloadNavLinks @clicked="toggleMobileNav" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const itemStore = useItemStore();
const showClickAnimation = ref(false);
const isDropDownVisible = ref(false);
const showMobileNav = ref(false);

// Watch for the cart item count and trigger the click animation when it changes from 0 to 1
watch(
  () => itemStore.getCartItemCount(),
  (newVal, oldVal) => {
    if (oldVal === 0 && newVal === 1 && !isDropDownVisible.value) {
      triggerClickAnimation();
    }
  }
);

// Trigger pointer animation and overlay
function triggerClickAnimation() {
  showClickAnimation.value = true;
  setTimeout(() => {
    showClickAnimation.value = false;
  }, 3500);
}

// Toggle mobile nav menu
function toggleMobileNav() {
  showMobileNav.value = !showMobileNav.value;
  document.body.classList.toggle("no-scroll", showMobileNav.value);
}
</script>

<style scoped>
/* Dark Overlay */
.dark-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 50;
}

/* Top Navigation Styles */
.top-nav {
  position: relative;
  width: 100%;
  height: 80px;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.top-nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
}
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 30px;
}

/* Click Animation */
.click-animation {
  position: absolute;
  top: 6rem; /* Adjust to position under the cart icon */
  right: 5rem;
  width: 5rem;
  height: 5rem;
  animation: clickAnimation 1s ease infinite;
  z-index: 101;
}

.click-text {
  position: absolute;
  top: 12rem; /* Adjust to position the text under the pointer */
  right: 5rem;
  color: white;
  font-size: 1rem;
  z-index: 101;
  width: 5rem;
  text-align: center;
}

@keyframes clickAnimation {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* Move up and down */
  }
}

/* Mobile Menu Button */
.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}
.mobile-menu-button img {
  width: 30px;
  height: 30px;
}

/* Mobile Navigation Overlay */
.mobile-nav-overlay {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}
.mobile-nav-overlay.is-visible {
  visibility: visible;
  opacity: 1;
}

.mobile-nav-content {
  width: 80%;
  max-width: 400px;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 2rem;
}

.close-button {
  font-size: 2rem;
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: white;
}

/* Responsive Media Queries */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  .mobile-menu-button {
    display: block;
  }
}
</style>

<style>
/* Prevent body scroll when mobile nav is open */
.no-scroll {
  overflow: hidden;
}
</style>
