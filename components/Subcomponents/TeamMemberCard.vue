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
        <!-- Uncomment if needed for social icons
        <img
          src="/Graphics/TwitterLogo.webp"
          alt="Twitter"
          class="social-icon"
        />
        <img src="/Graphics/TikTokLogo.webp" alt="TikTok" class="social-icon" />
        <img
          src="/Graphics/InstagramLogo.webp"
          alt="Instagram"
          class="social-icon"
        /> -->
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
  gap: 1rem;
  align-items: center;
}

.image-container {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 1rem;
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
  justify-content: center;
}

.social-icon {
  width: 30px;
  height: 30px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .team-member-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0.5rem;
  }

  .image-container {
    width: 100%;
    max-width: 200px;
  }

  .profile-image {
    border-radius: 50%;
  }

  .info-container {
    margin-top: 1rem;
    align-items: center;
  }

  .info-container h3 {
    font-size: 1.3rem;
  }

  .info-container p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .info-container h3 {
    font-size: 1.1rem;
  }

  .info-container p {
    font-size: 0.85rem;
  }

  .social-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
