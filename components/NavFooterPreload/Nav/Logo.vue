<template>
  <div class="brand">
    <NuxtLink to="/" class="nav-logo-box">
      <img src="/Logos/Nexgen.webp" alt="Company Logo" class="nav-logo" />
    </NuxtLink>
  </div>
</template>
  
  <style scoped>
.brand {
  display: flex;
  align-items: center;
  gap: 20px;
  max-height: 4rem;
  overflow: hidden;
}
.nav-logo-box {
  width: 250px;
  height: auto;
  margin-left: -2.5rem;
}
.nav-logo {
  max-width: 100%;
  height: auto;
}
</style>
  