<template>
  <div>
    <NavFooterPreloadTopNav />
    <div>
      <slot />
    </div>
    <NavFooterPreloadNAHFooter />
  </div>
</template>
  
  <script setup>
const showMobileNav = ref(false);

const store = useUserStore();
const isLoggedIn = computed(() => !!store.token);

// Reactive variable to control which array is active
const usePaths1 = ref(true);

// Computed property to return the current array based on the reactive variable
const currentPaths = computed(() => {
  return p;
});
</script>
  
  <style scoped media="screen">
#app {
  scroll-behavior: smooth;
  background-color: #545454;
  font-family: "Montserrat", sans-serif, "HelveticaNeue-Light",
    "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande",
    sans-serif;
  position: static;
}

.content {
  width: 100%;
  height: auto;
  animation: item-load 0.8s;
}

footer {
  /* position: relative;
  
  border-top: 1px solid gray;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  min-height: 40rem;
  overflow: hidden; */
}

.image-overflow-hidden {
  overflow: hidden;
  width: 100%;
  height: 25vh;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.image-overflow-hidden img {
  width: 100%;
}

.divider {
  margin-bottom: -4px;
}

.divider-grow {
  transform: scale(100%);
  transition: 3s ease-out;
  max-width: 100%;
}

.divider-grow.active {
  transform: scale(140%);
}

@keyframes item-load {
  0% {
    transform: translateY(8%);
    opacity: 0%;
  }

  50% {
    transform: translateY(8%);
    opacity: 0%;
  }

  100% {
    transform: translateY(0%);
    opacity: 100%;
  }
}

@keyframes page-load {
  0% {
    transform: translateY(-20%);
    opacity: 0%;
  }

  100% {
    transform: translateY(0%);
    opacity: 100%;
  }
}

@media (max-width: 768px) {
  /* Mobile View */
  body.overflow-hidden {
    overflow: hidden;
  }

  .image-overflow-hidden {
    height: 32vh;
  }

  .nav-slide-out {
    transform: translateY(10%);
    opacity: 0;
    z-index: -1;
  }

  .divider-grow {
    transform: scale(100%);
    transition: 3s all ease-out;
    max-width: 100%;
  }

  .divider-grow.active {
    transform: scale(140%);
  }
}

@media (max-width: 480px) {
  .image-overflow-hidden {
    height: 25vh;
  }
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

  