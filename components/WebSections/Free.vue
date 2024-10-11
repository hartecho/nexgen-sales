<template>
  <div class="trial-section-wrapper">
    <div class="trial-section">
      <div class="trial-section-content">
        <h2>
          Still Confused About Our Features? Sign Up To Access Free Course
          Material!
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          volutpat, leo sit amet.
        </p>
        <button type="submit" class="cta-button">
          <img src="/Graphics/LinkIcon.svg" alt="" />
          SIGN UP
        </button>
      </div>
      <div class="trial-section-image"></div>
    </div>
  </div>
</template>

<style scoped>
.trial-section-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("/BlogPics/BlogPic7.webp");
  background-size: cover;
  background-position: center;
  height: 400px;
  color: white;
  width: 100%;
}

.trial-section {
  display: flex;
  justify-content: space-between;
  max-width: 1400px;
  width: 100%;
  height: 100%;
  padding: 0 2rem;
}

.trial-section-content {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 3rem;
  width: 40%;
  height: 100%;
}

.trial-section-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.trial-section-content p {
  margin-bottom: 1rem;
  color: #ccc;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #0197b2;
  color: black;
  font-weight: bold;
  padding: 1rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button img {
  width: 1rem;
  height: 1rem;
}

.cta-button:hover {
  background-color: white;
}

.trial-section-image {
  flex-grow: 1;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .trial-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
  }

  .trial-section-content {
    width: 80%;
    margin-bottom: 1rem;
    padding: 2rem;
  }

  .trial-section-image {
    display: none;
  }

  .trial-section-content h2 {
    font-size: 1.8rem;
  }

  .trial-section-content p {
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .trial-section-content {
    width: 90%;
  }

  .trial-section-content h2 {
    font-size: 1.5rem;
  }

  .cta-button {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .trial-section-wrapper {
    height: auto;
    padding: 1rem 0;
  }

  .trial-section-content {
    padding: 1.5rem;
  }

  .trial-section-content h2 {
    font-size: 1.3rem;
  }

  .cta-button {
    padding: 0.75rem;
    font-size: 0.85rem;
  }
}
</style>
