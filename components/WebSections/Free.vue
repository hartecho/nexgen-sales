<template>
  <div class="trial-section-wrapper">
    <div class="trial-section">
      <div class="trial-section-content">
        <h2>Still Confused About Our Features? Get A Free Trial 7 Days</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          volutpat, leo sit amet.
        </p>
        <a href="#" class="cta-button">Get Free Trial</a>
      </div>
      <div class="trial-section-image"></div>
    </div>
  </div>
</template>
  
  <style scoped>
.trial-section-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: url("/BlogPics/BlogPic5.webp");
  background-size: cover;
  background-position: center;
  height: 400px;
  color: white;
  width: 100%;
}

.trial-section {
  display: flex;
  max-width: 1300px;
}

.trial-section-content {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  width: 40%;
  height: 100%;
  margin-left: 2rem;
}

.trial-section-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.trial-section-content p {
  margin-bottom: 1.5rem;
  color: #ccc;
}

.cta-button {
  display: inline-block;
  background-color: #01d1b2;
  color: white;
  padding: 0.75rem 2rem;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #0197b2;
}

.trial-section-image {
  flex-grow: 1;
}
</style>
  