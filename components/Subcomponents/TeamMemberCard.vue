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
        <a v-if="xLink" :href="xLink" target="_blank">
          <img src="/Logos/X.svg" alt="Twitter" class="social-icon" />
        </a>
        <a v-if="tiktokLink" :href="tiktokLink" target="_blank">
          <img src="/Logos/TikTok.webp" alt="TikTok" class="social-icon" />
        </a>
        <a v-if="instagramLink" :href="instagramLink" target="_blank">
          <img
            src="/Logos/Instagram.webp"
            alt="Instagram"
            class="social-icon"
          />
        </a>
        <a v-if="linkedinLink" :href="linkedinLink" target="_blank">
          <img src="/Logos/LinkedIn.webp" alt="LinkedIn" class="social-icon" />
        </a>
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
  instagramLink: {
    type: String,
    required: false,
  },
  tiktokLink: {
    type: String,
    required: false,
  },
  xLink: {
    type: String,
    required: false,
  },
  linkedinLink: {
    type: String,
    required: false,
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
  gap: 1rem;
  justify-content: center;
}

.social-icon {
  width: 30px;
  height: 30px;
}

img {
  height: 2rem;
  width: 2rem;
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
