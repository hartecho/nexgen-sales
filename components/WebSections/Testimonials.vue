<template>
  <div class="testimonials-section">
    <div class="header-wrapper">
      <div class="header">
        <div class="text-content">
          <h4>TESTIMONIALS</h4>
          <h1>What Client Says About Us</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            sagittis mauris ac enim sagittis dignissim.
          </p>
        </div>
        <div class="see-more">
          <button>SEE MORE</button>
        </div>
      </div>
    </div>

    <div class="testimonials-grid">
      <SubcomponentsTestimonial
        name="Testimonial #1"
        designation="Designation"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique, leo sit amet aliquet sollicitudin."
        imageSrc="/HARTECHOLogo.webp"
      />
      <SubcomponentsTestimonial
        name="Testimonial #2"
        designation="Designation"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique, leo sit amet aliquet sollicitudin."
        imageSrc="/HARTECHOLogo.webp"
      />
      <SubcomponentsTestimonial
        name="Testimonial #3"
        designation="Designation"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique, leo sit amet aliquet sollicitudin."
        imageSrc="/HARTECHOLogo.webp"
      />
    </div>
  </div>
</template>
  
  <script setup>
</script>
  
  <style scoped>
.testimonials-section {
  width: 100%;
  background-color: #000;
  color: white;
  padding: 6rem 2rem 8rem 2rem;
  text-align: center;
}

.header-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 1200px;
  width: 100%;
}

.text-content {
  text-align: left;
}

.text-content h4 {
  color: #0197b2;
  font-size: 18px;
  letter-spacing: 2px;
}

.text-content h1 {
  font-size: 2.5rem;
  margin: 0.5rem 0 1rem;
}

.text-content p {
  font-size: 1rem;
  max-width: 1000px;
  color: #aaa;
}

.see-more button {
  background-color: #0197b2;
  color: black;
  padding: 0.75rem 2rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  background: white;
  transform: scale(1.01);
}

.testimonials-grid {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  max-width: 1200px;
  margin-top: 2rem;
  width: 100%;
}
</style>
  