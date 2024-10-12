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
        <WebSectionsProfile />
      </div>
    </transition>
  </div>
</template>

<script setup>
const userStore = useUserStore(); // Assuming you have a user store to check if the user is logged in
const isLoggedIn = computed(() => !!userStore.token);
const hydrated = ref(false);

onMounted(() => {
  hydrated.value = true;
});

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  background: black;
  overflow: hidden;
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
