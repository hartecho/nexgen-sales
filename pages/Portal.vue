<template>
  <div class="wrapper" v-if="hydrated">
    <transition name="fade" mode="out-in">
      <div v-if="!isLoggedIn" class="login-form">
        <div class="left">
          <div class="image-wrapper">
            <img src="/Backgrounds/introBG2.webp" alt="" />
          </div>
        </div>
        <NavFooterPreloadLoginModal />
      </div>
      <div v-else>
        <ProfileSidebar
          :isSidebarVisible="isSidebarVisible"
          :currentSection="currentSection"
          @toggle-sidebar="isSidebarVisible = !isSidebarVisible"
          @change-section="changeSection"
        />
        <WebSectionsProfile
          :isSidebarVisible="isSidebarVisible"
          :currentSection="currentSection"
          @toggle-sidebar="isSidebarVisible = !isSidebarVisible"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
const userStore = useUserStore(); // Assuming you have a user store to check if the user is logged in
const isLoggedIn = computed(() => !!userStore.token);
const hydrated = ref(false);

const currentSection = ref("dashboard");
const isSidebarVisible = ref("true");

const changeSection = (newSection) => {
  currentSection.value = newSection;
};

onMounted(() => {
  hydrated.value = true;
});

useSeoMeta({
  title: "Nexgen Sales Portal - Access Your Door-to-Door Sales Training",
  ogTitle: "Nexgen Sales Portal - Access Your Door-to-Door Sales Training",
  description:
    "Log in to the Nexgen Sales Portal to access your door-to-door sales courses, track your progress, and enhance your skills with our interactive training modules.",
  ogDescription:
    "Access the Nexgen Sales Portal for exclusive door-to-door sales courses, progress tracking, and more. Start learning and advancing your sales career today.",
  ogImage: "/Logos/NexgenLogo.webp",
  twitterCard: "/Logos/NexgenLogo.webp",
});

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  background: black;
  overflow-y: scroll;
  overflow-x: hidden;
}

.login-form {
  display: flex;
  align-items: stretch; /* Ensures both sides maintain their height */
  justify-content: space-between;
}

.left {
  width: 100%; /* Adjust as needed to control the width of the image section */
  display: flex;
}

.image-wrapper {
  width: 100%;
  height: 100vh; /* Ensures the image fills the entire height of the viewport */
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
