<template>
  <div class="wrapper" v-if="hydrated">
    <transition name="fade" mode="out-in">
      <div v-if="!isLoggedIn" class="login-form">
        <div class="left">
          <div class="image-wrapper">
            <img src="/Backgrounds/IntroBG.webp" alt="" />
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
  /* background: url("/Backgrounds/IntroBG.webp") no-repeat; */
  background: black;
  /* background: black; */
  /* background-position: center center; */
}

.login-form {
  display: flex;
  justify-content: space-between;
  /* min-width: 100vw; */
  /* align-items: center; */
  /* max-width: 1400px; */
  /* background: blue; */
}

.left {
  /* min-height: 100vh; */
}

.image-wrapper {
  height: 100%;
  width: auto;
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.right {
  min-height: 100vh;
}
</style>