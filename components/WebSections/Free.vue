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
  width: 1200px;
  height: 100%;
}

.trial-section-content {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 3rem;
  width: 40%;
  height: 100%;
  /* margin-left: 2rem; */
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
  display: inline-block;
  background-color: #0197b2;
  color: black;
  font-weight: bold;
  padding: 1rem;
  border: none;
  /* border-radius: 4px; */
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: white;
  /* transform: scale(1.01); */
}

.trial-section-image {
  flex-grow: 1;
}

.cta-button img {
  height: 1rem;
  width: 1rem;
}
</style>
  