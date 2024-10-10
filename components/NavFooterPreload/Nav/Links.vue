<template>
  <div class="nav-links">
    <div class="nav-link">
      <!-- <NuxtLink to="/blog" class="nav-link-content" @click="toggleMobileNav">
        <span>Blog</span>
      </NuxtLink> -->
    </div>
    <div class="nav-link">
      <NuxtLink to="/portal" class="nav-link-content" @click="toggleMobileNav">
        <span>Client Login</span>
      </NuxtLink>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, computed } from "vue";
const hydrated = ref(false); // Assume hydrated flag is passed as prop
const userStore = useUserStore();
const isLoggedIn = computed(() => !!userStore.token);

const emit = defineEmits(["clicked"]);

function toggleMobileNav() {
  emit("clicked");
}

// Login modal states
const showLoginModal = ref(false);

onMounted(() => {
  hydrated.value = true;
});

// Open login modal
function openLoginModal() {
  emit("clicked");
  showLoginModal.value = true;
  document.body.classList.add("no-scroll");
}

// Close login modal
function closeLoginModal() {
  showLoginModal.value = false;
  document.body.classList.remove("no-scroll");
}
</script>
  
  <style scoped>
.nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
}
.nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
  text-align: center;
  color: white;
  font-size: 0.9rem;
}
.nav-link-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: white;
  font-size: 0.9rem;
}
.nav-link img {
  height: 30px;
  width: auto;
  margin-bottom: 5px;
}

/* Modal styles */
.modal-wrapper {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8); /* Background for the login modal */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}

.modal-wrapper.is-visible {
  visibility: visible;
  opacity: 1;
}

span {
  font-weight: bold;
  font-size: 1rem;
}

.router-link-active {
  color: #0197b2; /* Example style */
}
</style>
  