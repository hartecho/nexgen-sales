<template>
  <div class="testimonials-section">
    <div class="header-wrapper">
      <div class="header">
        <div class="text-content">
          <h4>TESTIMONIALS</h4>
          <h1>What Clients Say About Us</h1>
          <p>
            Empowering sales professionals with the skills and confidence to
            excel in every pitch, every knock, and every conversation. Hear what
            our students have to say about their journey to success!
          </p>
        </div>
      </div>
    </div>

    <div class="testimonials-grid">
      <SubcomponentsTestimonial
        name="Jaden Schank"
        designation="Sales Rep - Dominion Energy"
        text="This course transformed my approach to door-to-door sales. The practical tips made it easy to see results fast."
        imageSrc="/Portraits/Jaden.webp"
      />
      <SubcomponentsTestimonial
        name="Keegan Rembacz"
        designation="Sales Manager - Aptive"
        text="I used to struggle with handling objections, but this course gave me the confidence I needed."
        imageSrc="/Portraits/Keegan.webp"
      />
      <SubcomponentsTestimonial
        name="Bennett Crowley"
        designation="Sales Rep - Vivint Solar"
        text="The strategies taught in this course are game-changers. If you're in sales, you need this training!"
        imageSrc="/Portraits/Bennett.webp"
      />
    </div>
  </div>
</template>

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

.testimonials-grid {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  max-width: 1200px;
  margin-top: 2rem;
  width: 100%;
}

.subcomponent-testimonial {
  background: #333;
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 300px; /* Ensures all testimonials have a minimum height */
  flex: 1; /* Ensures all items grow equally */
}

.testimonial-text {
  margin: 1rem 0;
  flex-grow: 1; /* Ensures the text takes up the remaining space */
  display: flex;
  align-items: center; /* Center-aligns the text vertically */
  justify-content: center;
  max-height: 100px; /* Limits the height of the text */
  overflow: hidden; /* Ensures longer text doesn't stretch the card */
}

.testimonial-footer {
  margin-top: auto; /* Pushes the footer down to the bottom */
}

.testimonial-footer img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.testimonial-footer h4 {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #0197b2;
}

.testimonial-footer p {
  font-size: 0.9rem;
  color: #bbb;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .text-content {
    text-align: center;
    margin-bottom: 1rem;
  }

  .text-content h1 {
    font-size: 2.2rem;
  }

  .text-content p {
    font-size: 0.95rem;
  }

  .testimonials-grid {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .text-content h1 {
    font-size: 2rem;
  }

  .text-content p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .text-content h4 {
    font-size: 16px;
  }

  .text-content h1 {
    font-size: 1.5rem;
  }

  .text-content p {
    font-size: 0.85rem;
  }

  .testimonials-section {
    padding: 4rem 1rem 6rem 1rem;
  }
}
</style>
