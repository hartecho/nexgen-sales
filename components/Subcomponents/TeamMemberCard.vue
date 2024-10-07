<template>
  <div class="team-member-card">
    <div class="image-container">
      <img :src="imageSrc" alt="Team Member" class="profile-image" />
    </div>
    <div class="info-container">
      <h3>{{ name }}</h3>
      <p>{{ title }}</p>
      <p>{{ description }}</p>
      <div class="social-icons">
        <img src="/Graphics/Support.webp" alt="Twitter" class="social-icon" />
        <img src="/Graphics/Support.webp" alt="Facebook" class="social-icon" />
        <img src="/Graphics/Support.webp" alt="Instagram" class="social-icon" />
      </div>
    </div>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
});
</script>
  
  <style scoped>
.team-member-card {
  display: flex;
  background-color: #000;
  color: white;
  /* border-radius: 8px; */
  gap: 1rem;
}

.image-container {
  flex: 1;
}

.profile-image {
  width: 100%;
  /* border-radius: 8px; */
}

.info-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-container h3 {
  color: #0197b2;
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
}

.info-container p {
  margin: 0.5rem 0;
}

.social-icons {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.social-icon {
  width: 20px;
  height: 20px;
}
</style>
  