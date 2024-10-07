<template>
  <div class="about-us-section-wrapper">
    <div class="about-us">
      <div class="image-container">
        <img
          src="/Backgrounds/introBG.webp"
          alt="Experience"
          class="experience-image"
        />
        <div class="experience-overlay">
          <span>15+</span>
          <p>Experience</p>
        </div>
      </div>
      <div class="content">
        <h4>ABOUT US</h4>
        <h1>The Perfect Solution For Door-to-Door Sales</h1>
        <p>
          Learn everything you need to know about door-to-door sales. Our
          platform provides comprehensive training, from handling objections to
          closing deals, ensuring you master every aspect of sales.
        </p>
        <blockquote>
          "This program has transformed how I approach sales and has
          significantly boosted my results."
        </blockquote>
        <button class="read-more">READ MORE</button>
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
  height: 35rem;
}

.about-us {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  color: white;
  gap: 2rem;
  max-width: 1200px;
  height: 25rem;
  background-color: #222;
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
  min-height: 100%;
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
  /* max-height: 100%; */
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

button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  background: white;
  /* transform: scale(1.01); */
}
</style>
  