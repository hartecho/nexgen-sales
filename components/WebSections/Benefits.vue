<template>
  <div class="about-us-section-wrapper">
    <div class="about-us">
      <div class="image-container">
        <img
          src="/Backgrounds/introBG2.webp"
          alt="Experience"
          class="experience-image"
        />
        <div class="experience-overlay">
          <span>6Y+</span>
          <p>Sales Experience</p>
        </div>
      </div>
      <div class="content">
        <h4>ABOUT US</h4>
        <h1>The Perfect Opportunity for Aspiring Sales Reps</h1>
        <p>
          Kickstart your career in door-to-door sales with a company that offers
          comprehensive support, training, and uncapped earning potential. We
          provide you with all the tools needed to succeed.
        </p>
        <blockquote>
          "Joining this company has transformed my financial future and given me
          the skills I need to succeed."
        </blockquote>
        <NuxtLink to="/Blog" class="read-more"
          ><img src="/Graphics/LinkIcon.svg" alt="" /> READ MORE</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

  
<script setup>
</script>
  
<style scoped>
.about-us-section-wrapper {
  background-color: #222;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 1rem;
}

.about-us {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  color: white;
  gap: 2rem;
  max-width: 1200px;
  background-color: #222;
  width: 100%;
}

.image-container {
  position: relative;
  width: 50%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
}

.experience-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-container:hover {
  transform: scale(1.01);
}

.experience-overlay {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background-color: #0197b2;
  padding: 1rem 2rem;
  text-align: center;
  color: black;
}

.experience-overlay span {
  font-size: 2.5rem;
  font-weight: bold;
}

.experience-overlay p {
  margin: 0;
  font-size: 1rem;
}

.content {
  width: 50%;
}

.content h4 {
  font-size: 18px;
  letter-spacing: 2px;
  margin-bottom: 10px;
  color: #0197b2;
}

.content h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.content p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

blockquote {
  font-size: 1rem;
  font-style: italic;
  color: #ccc;
  margin-bottom: 20px;
}

.read-more {
  background-color: #0197b2;
  color: black;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.read-more img {
  width: 1rem;
  height: 1rem;
}

a {
  transition: all 0.2s ease-in-out;
}

a:hover {
  background: white;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .about-us {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .image-container {
    width: 100%;
    height: auto;
  }

  .content {
    width: 100%;
  }

  .content h1 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .about-us-section-wrapper {
    padding: 3rem 1rem;
  }

  .content h4 {
    font-size: 16px;
  }

  .content h1 {
    font-size: 1.8rem;
  }

  .content p,
  blockquote {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .experience-overlay {
    padding: 0.5rem;
  }

  .experience-overlay span {
    font-size: 2rem;
  }

  .experience-overlay p {
    font-size: 0.85rem;
  }

  .read-more {
    font-size: 0.9rem;
    padding: 8px 16px;
  }

  .content h1 {
    font-size: 1.5rem;
  }

  .content p,
  blockquote {
    font-size: 0.9rem;
  }
}
</style>
